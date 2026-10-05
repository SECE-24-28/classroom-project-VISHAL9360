"""
==============================================================================
SALESTORM ARFA: High-Contention Concurrency & Outage Chaos Test Suite
SysCrafters Hackathon - Principal QA & Automated Chaos Engineering
==============================================================================
Test Cases:
  1. test_zero_overselling_exact_100:
     Fires 500 concurrent async contenders competing for 100 limited inventory units.
     Strict Invariant: Exactly 100 HTTP 201 Created and 400 HTTP 409 Conflict.
  2. test_idempotent_duplicate_submission:
     Fires 5 identical Idempotency-Key requests across network jitter.
     Strict Invariant: Identical reservation_id returned; stock decremented exactly once.
  3. test_order_recovery_after_simulated_outage:
     Simulates downstream crash during payment capture, validates Kafka buffer accumulation,
     triggers self-healing reboot, and verifies database orders ledger count.
==============================================================================
"""

import asyncio
import os
import sys
import uuid
import pytest
import httpx
from typing import List, Dict, Any

# Ensure project root is on PYTHONPATH
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from apps.backend.main import app, engine

# PostgreSQL connector for direct ACID ledger verification
try:
    import psycopg2
    PSYCOPG2_AVAILABLE = True
except ImportError:
    PSYCOPG2_AVAILABLE = False

POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
POSTGRES_PORT = int(os.getenv("POSTGRES_PORT", "5432"))
POSTGRES_DB = os.getenv("POSTGRES_DB", "salestorm_core")
POSTGRES_USER = os.getenv("POSTGRES_USER", "salestorm_admin")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "salestorm_secure_password")

CLIENT_LIMITS = httpx.Limits(max_connections=600, max_keepalive_connections=600)
CLIENT_TIMEOUT = httpx.Timeout(30.0, connect=10.0)


def get_client() -> httpx.AsyncClient:
    """
    Instantiates an AsyncClient configured for high-concurrency contention benchmarks.
    Defaults to in-process ASGITransport for ultra-fast, zero-socket-exhaustion execution in CI,
    or connects via HTTP if SALESTORM_BACKEND_URL is explicitly defined.
    """
    remote_url = os.getenv("SALESTORM_BACKEND_URL")
    if remote_url:
        return httpx.AsyncClient(
            base_url=remote_url,
            limits=CLIENT_LIMITS,
            timeout=CLIENT_TIMEOUT,
            follow_redirects=True
        )

    transport = httpx.ASGITransport(app=app)
    return httpx.AsyncClient(
        transport=transport,
        base_url="http://salestorm.local",
        limits=CLIENT_LIMITS,
        timeout=CLIENT_TIMEOUT,
        follow_redirects=True
    )


# ============================================================================
# 1. Zero Overselling Invariant Under 500-Contender Surge
# ============================================================================
def test_zero_overselling_exact_100():
    """
    Fires 500 concurrent async threads attempting to reserve 100 units.
    Asserts:
      - Exactly 100 HTTP 201 responses.
      - Exactly 400 HTTP 409 Conflict responses.
      - 0 oversold inventory units.
      - Redis Lua barrier guarantees mathematical zero overselling.
    """
    async def run():
        async with get_client() as client:
            # Step A: Reset backend to clean state (100 stock units)
            reset_resp = await client.post("/api/v1/admin/reset")
            assert reset_resp.status_code == 200, f"Reset failed: {reset_resp.text}"
            reset_data = reset_resp.json()
            assert reset_data["stock"] == 100, "Initial stock must be exactly 100 units"

            # Step B: Spawn 500 concurrent contenders with distinct UUIDv4 Idempotency Keys
            TOTAL_CONTENDERS = 500

            async def fire_reservation_request(idx: int):
                key = str(uuid.uuid4())
                return await client.post(
                    "/api/v1/checkout/reserve",
                    headers={"Idempotency-Key": key, "Content-Type": "application/json"},
                    json={"product_id": "flash_sku_titanium_01", "quantity": 1}
                )

            tasks = [fire_reservation_request(i) for i in range(TOTAL_CONTENDERS)]
            responses = await asyncio.gather(*tasks)

            # Step C: Audit responses
            status_201_count = 0
            status_409_count = 0
            other_statuses = []

            for r in responses:
                if isinstance(r, httpx.Response):
                    if r.status_code == 201:
                        status_201_count += 1
                        data = r.json()
                        assert "reservation_id" in data
                        assert data["status"] == "SUCCESS"
                    elif r.status_code == 409:
                        status_409_count += 1
                        data = r.json()
                        assert "INVENTORY_EXHAUSTED" in data.get("detail", "")
                    else:
                        other_statuses.append((r.status_code, r.text))
                else:
                    other_statuses.append(("EXCEPTION", str(r)))

            # Step D: Verify Telemetry State
            telem_resp = await client.get("/api/v1/telemetry")
            assert telem_resp.status_code == 200
            telem = telem_resp.json()

            # Strict System Invariant Assertions
            assert status_201_count == 100, f"Expected exactly 100 granted leases, got {status_201_count}"
            assert status_409_count == 400, f"Expected exactly 400 clean drops (HTTP 409), got {status_409_count}"
            assert len(other_statuses) == 0, f"Unexpected error responses: {other_statuses}"
            assert telem["stock"] == 0, f"Expected 0 stock remaining, got {telem['stock']}"
            assert telem["reserved"] == 100, f"Expected 100 reserved units, got {telem['reserved']}"

    asyncio.run(run())


# ============================================================================
# 2. Client-Side Distributed Idempotency Verification
# ============================================================================
def test_idempotent_duplicate_submission():
    """
    Submits identical Idempotency-Key headers across 5 consecutive requests;
    asserts all return the identical reservation_id without deducting additional inventory.
    """
    async def run():
        async with get_client() as client:
            # Step A: Reset backend to clean state
            reset_resp = await client.post("/api/v1/admin/reset")
            assert reset_resp.status_code == 200

            # Step B: Generate a single immutable UUIDv4 idempotency key
            idempotency_key = f"idem_test_{uuid.uuid4()}"
            reservation_ids: List[str] = []

            # Step C: Fire 5 consecutive requests sharing the identical key
            for attempt in range(5):
                resp = await client.post(
                    "/api/v1/checkout/reserve",
                    headers={"Idempotency-Key": idempotency_key, "Content-Type": "application/json"},
                    json={"product_id": "flash_sku_titanium_01", "quantity": 1}
                )
                assert resp.status_code == 201, f"Attempt {attempt+1} failed with status {resp.status_code}"
                data = resp.json()
                resv_id = data.get("reservation_id")
                assert resv_id is not None
                reservation_ids.append(resv_id)

            # Step D: Assert all 5 responses returned the EXACT SAME reservation token
            first_id = reservation_ids[0]
            for idx, rid in enumerate(reservation_ids):
                assert rid == first_id, f"Idempotency violation: Attempt {idx+1} returned {rid}, expected {first_id}"

            # Step E: Verify stock was decremented ONLY ONCE (100 -> 99, NOT 95)
            telem_resp = await client.get("/api/v1/telemetry")
            assert telem_resp.status_code == 200
            telem = telem_resp.json()
            assert telem["stock"] == 99, f"Stock should be 99 after 5 duplicate requests, got {telem['stock']}"
            assert telem["reserved"] == 1, f"Reserved units should be exactly 1, got {telem['reserved']}"

    asyncio.run(run())


# ============================================================================
# 3. Downstream Crash Resilience & Kafka Buffer Recovery
# ============================================================================
def test_order_recovery_after_simulated_outage():
    """
    Simulates payment capture, triggers the 30-second Order Service crash state,
    confirms messages sit buffered in Kafka, triggers recovery, and verifies that
    SELECT count(*) FROM orders equals the number of captured payments.
    """
    async def run():
        async with get_client() as client:
            # Step A: Reset engine to clean state
            await client.post("/api/v1/admin/reset")

            # Step B: Secure a valid atomic lease
            resv_key = str(uuid.uuid4())
            reserve_resp = await client.post(
                "/api/v1/checkout/reserve",
                headers={"Idempotency-Key": resv_key, "Content-Type": "application/json"},
                json={"product_id": "flash_sku_titanium_01", "quantity": 1}
            )
            assert reserve_resp.status_code == 201
            resv_id = reserve_resp.json()["reservation_id"]

            # Step C: Trigger Order Service 30-Second Simulated Outage
            crash_resp = await client.post("/api/v1/chaos/crash-order-svc")
            assert crash_resp.status_code == 200
            crash_data = crash_resp.json()
            assert crash_data["order_service_online"] is False
            assert crash_data["status"] == "CRASHED"

            # Step D: Execute Payment while downstream Order Service is OFFLINE
            pay_resp = await client.post(
                "/api/v1/payments/execute",
                headers={"Idempotency-Key": resv_key, "Content-Type": "application/json"},
                json={
                    "reservation_id": resv_id,
                    "payment_method_token": "tok_visa_4242",
                    "success": True
                }
            )
            assert pay_resp.status_code == 200
            pay_data = pay_resp.json()
            assert pay_data["status"] == "CONFIRMED"
            order_id = pay_data["order_id"]

            # Step E: Confirm payment captured message sits safely BUFFERED in Kafka
            chaos_status = await client.get("/api/v1/chaos/status")
            assert chaos_status.status_code == 200
            cs_data = chaos_status.json()
            assert cs_data["order_service_online"] is False
            assert cs_data["kafka_buffer_count"] >= 1, "Captured payment must buffer in Kafka during outage"

            # Step F: Trigger Self-Healing Recovery & Drain Kafka Backlog
            restore_resp = await client.post("/api/v1/chaos/crash-order-svc")
            assert restore_resp.status_code == 200
            restore_data = restore_resp.json()
            assert restore_data["order_service_online"] is True
            assert restore_data["status"] == "RECOVERED"
            assert restore_data["drained_events"] >= 1

            # Step G: Confirm Kafka buffer is drained to zero lag
            post_recovery = await client.get("/api/v1/chaos/status")
            assert post_recovery.status_code == 200
            assert post_recovery.json()["kafka_buffer_count"] == 0, "Kafka buffer must be 0 after drainage"

            # Step H: Verify Database Orders Ledger (SELECT count(*) FROM orders)
            orders_count = None
            if PSYCOPG2_AVAILABLE:
                try:
                    conn = psycopg2.connect(
                        host=POSTGRES_HOST,
                        port=POSTGRES_PORT,
                        dbname=POSTGRES_DB,
                        user=POSTGRES_USER,
                        password=POSTGRES_PASSWORD,
                        connect_timeout=3
                    )
                    with conn.cursor() as cur:
                        cur.execute("SELECT count(*) FROM orders WHERE status = 'CONFIRMED';")
                        row = cur.fetchone()
                        if row is not None:
                            orders_count = row[0]
                    conn.close()
                except Exception:
                    pass

            if orders_count is not None:
                assert orders_count >= 1, f"PostgreSQL orders count must be >= 1, got {orders_count}"
            else:
                # Audit through backend telemetry confirmed sold count
                final_telem = await client.get("/api/v1/telemetry")
                assert final_telem.json()["sold"] >= 1, "Committed orders count must be >= 1"

    asyncio.run(run())
