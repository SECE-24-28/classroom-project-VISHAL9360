# ==============================================================================
# SALESTORM ARFA: Security & Observability Architecture
# Deliverable 17 | Section 17 of Master Architecture Specification
# ==============================================================================

## 1. Security Architecture & Trust Boundaries

```
[ Public Internet ]
        │
        ▼ (HTTPS / TLS 1.3)
┌──────────────────────────────────────────────┐
│  Cloudflare Anycast CDN & WAF Edge           │
│  • DDoS / SYN Flood Scrubbing                │
│  • Turnstile Bot & Proof-of-Work Challenge   │
└───────────────────────┬──────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────┐
│  Network Load Balancer & Envoy Gateway       │
│  • OAuth 2.0 / JWT Bearer Validation         │
│  • Client-side Idempotency Header Extraction │
│  • Sliding-Window Rate Limiting              │
└───────────────────────┬──────────────────────┘
                        │ mTLS 1.3 (SPIFFE/SPIRE SVIDs)
                        ▼
┌──────────────────────────────────────────────┐
│  Authenticated Internal Microservices (VPC)  │
│  • FastAPI Backend Engine (:8080)            │
│  • Order Settlement Consumer Worker (:8085)  │
│  • No implicit internal trust                │
└───────────────────────┬──────────────────────┘
                        │ Dedicated Encrypted Network
                        ▼
┌──────────────────────────────────────────────┐
│  Private Data & Event Streaming Tier         │
│  • Redis 7.2 Core (Encrypted RESP3)          │
│  • PostgreSQL 16 (AES-256 pgcrypto at rest)  │
│  • Kafka KRaft (TLS Client Authentication)   │
└──────────────────────────────────────────────┘
```

---

## 2. Core Security Controls

| Security Control | Technical Implementation | Threat Mitigated |
| :--- | :--- | :--- |
| **Authentication** | Bearer JWT / OAuth 2.0 with cryptographic signature verification. | Credential theft, unauthorized API access. |
| **Authorization & RBAC**| Role-Based Access Control and strict object-level tenant ownership checks. | Insecure Direct Object References (IDOR). |
| **Service Mesh Identity** | **SPIFFE/SPIRE X.509 SVIDs** with automated 1-hour certificate rotation. | Internal spoofing, lateral movement inside VPC. |
| **Transport Encryption**| Mutual TLS 1.3 (mTLS) across all inter-service and database RPC calls. | Packet sniffing, man-in-the-middle interception. |
| **Secrets Management** | HashiCorp Vault / Kubernetes Secrets injected as environment variables. | Leaked credentials in source code or container images. |
| **PCI-DSS Level 1 Scope** | Zero raw PAN in application memory, logs, or databases; tokenized at edge. | Credit card theft, PCI audit non-compliance. |
| **Input Validation** | Pydantic strict schemas with sanitization of all JSON command bodies. | SQL Injection, XSS, and command injection attacks. |
| **Rate Limiting** | Sliding-window token bucket algorithm per IP, user ID, and API key. | Brute-force attacks, DDoS, and API resource starvation. |

---

## 3. Threat Modeling Matrix

| Threat | Impact Category | Primary Architecture Controls |
| :--- | :--- | :--- |
| **Credential Theft** | Unauthorized account access | Strong OAuth auth, TLS 1.3, credential rotation, anomaly detection. |
| **Broken Object Authorization** | PII and transaction exposure | Strict object-level ownership checks (`customer_id` derived from verified token). |
| **Duplicate Payment / Replay** | Financial loss, double charge | Client UUIDv4 `Idempotency-Key`, merchant transaction ID, and outbox reconciliation. |
| **Inventory Race / Hoarding** | Overselling, stock starvation | Atomic Redis Lua decrement, 300s TTL hold leases, and automated restock sweeper. |
| **API Abuse / Layer 7 Flood** | Service saturation, 504 outage | Cloudflare Turnstile, eBPF/XDP kernel drop filters, and Envoy connection limits. |
| **Database Injection** | Data compromise, corruption | Parameterized SQL queries, ORM/query builder abstractions, and strict typing. |
| **Stolen Service Credential** | Lateral cluster penetration | SPIFFE workload identity attestation, least-privilege RBAC, and network policies. |

---

## 4. Observability Architecture (The 5 Telemetry Pillars)

| Signal | Source / Technology | Purpose |
| :--- | :--- | :--- |
| **Structured Logs** | JSON stdout forwarded via FluentBit / Vector | Fine-grained transactional audit and forensic investigation. |
| **Metrics** | Prometheus scraped endpoints (`:8080/metrics`, `:8085/metrics`) | High-cardinality quantitative health monitoring and SLO tracking. |
| **Distributed Traces**| OpenTelemetry W3C TraceContext (`traceparent` header) | End-to-end hop diagnosis across REST and Kafka boundaries. |
| **Security Audit Logs** | Dedicated append-only PostgreSQL table (`audit_log`) | Immutable records of administrative changes, refunds, and auth failures. |
| **Real-Time Alerts** | Prometheus Alertmanager routing to PagerDuty and Slack | Proactive alerting on P99 latency regressions and DLQ accumulations. |

---

## 5. Structured Log Schema

Every log emitted by the SALESTORM engine is strictly structured in JSON format:

```json
{
  "timestamp": "2026-10-05T10:15:00.124Z",
  "level": "INFO",
  "service": "reservation-service",
  "event": "RESERVATION_CREATED",
  "reservationId": "resv_ac02c39a87",
  "productId": "flash_sku_titanium_01",
  "quantity": 1,
  "remainingStock": 99,
  "requestId": "req_8ac28e30-e679",
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
  "spanId": "00f067aa0ba902b7"
}
```

---

## 6. Business Metrics & Alertmanager Invariant Rules

### Key Metrics Monitored:
* `salestorm_inventory_contention_duration_seconds` (Histogram: P50, P90, P99)
* `salestorm_reservations_total` (Counter: `status="granted|exhausted|expired"`)
* `salestorm_kafka_outbox_lag_records` (Gauge: unconsumed Kafka messages)
* `salestorm_order_recovery_duration_ms` (Histogram: crash catch-up duration)
* `salestorm_stock_available_gauge` (Gauge: must remain $\ge 0$ at all times)

### Critical P0 / P1 Alerts:
1. **Overselling Invariant Violation (`salestorm_stock_available_gauge < 0`)**: Immediate P0 Disaster alert triggering emergency circuit breaker.
2. **P99 Contention Latency Breach ($>15\,\text{ms}$ for $>30\,\text{s}$)**: P1 Critical page to Flash Sale SRE team.
3. **Dead-Letter Queue Accumulation (`salestorm_dlq_records_total > 0`)**: Alerts on poison pill messages in Kafka.
4. **Order Service Outage & Lag Spike (`salestorm_kafka_outbox_lag_records > 500`)**: Notifies on downstream settlement delays.
