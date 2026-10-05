# SALESTORM ARFA - Non-Functional Requirements (NFR)

## 1. Quantitative Service Level Objectives (SLOs) & Targets

| Metric | Target SLO | Measurement Point | Degradation Protocol |
| :--- | :--- | :--- | :--- |
| **Reservation P99 Latency** | **< 50 ms** | API Gateway to Client | Shed load via Edge Token Bucket |
| **Reservation P50 Latency** | **< 10 ms** | Redis Lua In-Memory Execution | Direct in-memory RAM response |
| **Ingress Peak Throughput** | **10,000 RPS** (Burst to 50,000 RPS) | Cloudflare Edge / WAF | Virtual Waiting Room Queue |
| **Inventory Invariant** | **Zero Overselling (100.000%)** | Distributed Inventory Ledger | Hardware barrier / Lua atomicity |
| **System Availability** | **99.999% (Five Nines)** | Multi-AZ Cloud Deployment | Active-Active multi-AZ auto-failover |
| **Payment Settlement P99** | **< 2,500 ms** | Async Outbox & Kafka consumer | Exponential backoff retry queue |
| **Lease Reclaim Accuracy** | **Within ± 1.0s of TTL** | Redis Keyspace Notification / Sweeper | Distributed cron reconciler |

---

## 2. Qualitative Architectural Invariants

### NFR-01: Strict Linearizability on Inventory State
- The inventory count must observe linearizable consistency. At no point in time may two concurrent threads view inconsistent remaining stock quantities that lead to over-allocation.
- In-memory single-threaded execution (Redis Lua script engine) is utilized as the linearizable serial execution barrier.

### NFR-02: Zero-Loss Reliability (Transactional Outbox)
- In the event of catastrophic broker failure (e.g., Kafka partition leader rebalance or temporary network partition), zero committed orders or reservations may be dropped.
- State changes in RDBMS are atomically committed alongside an `outbox_events` table within a single ACID transaction. Debezium / CDC or poller relay guarantees *at-least-once* delivery.

### NFR-03: Blast Radius Containment & Graceful Degradation
- If the downstream Order Service, Payment Gateway, or Notification Service suffers brownouts or complete outage, the Inventory Reservation Engine MUST continue serving reservations and issuing TTL leases without degradation.
- Circuit breakers (Hystrix / Resilience4j pattern) isolate payment failures from impacting core reservation ingress.

### NFR-04: Multi-AZ Fault Tolerance & Self-Healing
- The system must survive the unannounced termination of an entire AWS Availability Zone (AZ) without data loss (RPO = 0) and with service restoration within 15 seconds (RTO < 15s).
