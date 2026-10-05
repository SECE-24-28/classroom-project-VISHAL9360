# ==============================================================================
# SALESTORM ARFA: Scalability, Reliability & 50x Scale Defense
# Deliverable 16 | Section 16 of Master Architecture Specification
# ==============================================================================

## 1. Scale Objectives & Workload Targets
* **Normal Traffic Baseline**: $\sim 10,000\,\text{requests/sec}$.
* **Extreme Flash-Sale Reasoning Target**: $\sim 500,000\,\text{requests/sec}$ ($50\times$ surge factor).
* **High-Contention Flash Scenario**: $10,000$ concurrent purchase attempts competing for $100$ inventory units.
* **Core Invariant**: Scale stateless application services horizontally without sacrificing inventory correctness or overwhelming downstream dependencies.

---

## 2. Separation of the Two Scaling Problems

A critical architectural insight of SALESTORM is separating **Request Scalability** from **Inventory Consistency**:

| Scaling Problem | Nature of Bottleneck | Architectural Solution |
| :--- | :--- | :--- |
| **Request Scalability** | CPU, network sockets, thread pools, SSL termination. | Anycast CDN/WAF, Layer 7 Load Balancing, horizontal stateless API replicas, rate limiting, and admission control. |
| **Inventory Consistency** | Physical disk contention, database row locks, serialization anomalies. | Authoritative single-threaded memory barrier (Redis Lua), atomic conditional decrement, bounded contention hot-path, and outbox buffering. |

---

## 3. Concurrency Strategy Evaluation

| Concurrency Approach | Strengths | Weaknesses | Architecture Decision |
| :--- | :--- | :--- | :--- |
| **Optimistic Version Checking (`version = version + 1`)** | Excellent for low/moderate contention; zero lock waits. | Under 10,000 concurrent requests on 1 SKU, $>99\%$ of transactions fail validation and retry, causing CPU thrashing. | **Retained as supporting audit mechanism**; not primary hot-path. |
| **Pessimistic Row Locking (`SELECT ... FOR UPDATE`)** | Strong correctness; guarantees serializability. | Exhausts database connection pools; creates queue delays; causes cascading 504 timeouts. | **Rejected** for flash-sale ingress. |
| **Atomic Conditional Reservation** | Strong correctness, bounded single-row execution in $< 1\,\text{ms}$, deterministic zero-oversell. | Contention is concentrated at the single authoritative memory cell. | **Selected as Primary Mechanism** (Redis Lua + PostgreSQL conditional update). |

---

## 4. Reliability Controls & Resilience Patterns

| Control Mechanism | Operational Policy | Failure Prevention Goal |
| :--- | :--- | :--- |
| **Bounded Timeouts** | Every remote call (HTTP, Redis, Kafka, Postgres) enforces a strict timeout ($\le 2,500\,\text{ms}$). | Eliminates thread hanging and connection starvation. |
| **Exponential Backoff with Jitter** | Retries apply randomized jitter: $T_{\text{wait}} = 2^n \times \text{base} + \text{rand}(0, \text{jitter})$. | Defeats "thundering herd" retry storms against recovering services. |
| **Client-Side Idempotency** | Requires UUIDv4 `Idempotency-Key` header on all mutation endpoints. | Prevents double-reserving or double-charging upon network drops. |
| **Circuit Breakers (Resilience4j)** | Opens when payment gateway error rate $> 50\%$ over a 10-call sliding window. | Fails fast in $< 1\,\text{ms}$, shedding load from dying payment providers. |
| **Bulkhead Isolation** | Dedicated thread and connection pools for reservation vs. browse vs. admin traffic. | A surge in checkout calls cannot starve catalog queries. |
| **Backpressure & Admission Control**| Drops excess ingress beyond cluster capacity with controlled HTTP 429/503. | Protects database from uncontrolled connection saturation. |
| **Dead-Letter Queue (DLQ)** | Poison pill or unparseable Kafka messages routed to `*.dlq` after 3 failed retries. | Prevents head-of-line blocking in event streaming partitions. |
| **Transactional Outbox** | Writes order records and outbox events in a single PostgreSQL ACID transaction. | Eliminates dual-write data loss across service boundaries. |
| **Asynchronous Reconciliation** | Background reconciler sweeps ambiguous transactions and resolves UNKNOWN states. | Guarantees eventual consistency across financial boundaries. |

---

## 5. Comprehensive Failure Matrix

| Failure Mode | Detection Signal | Automated System Response | Correctness Invariant |
| :--- | :--- | :--- | :--- |
| **Payment Gateway Timeout** | Provider call exceeds 2,500ms timeout | Status marked `UNKNOWN/PENDING_RECONCILIATION`; reconciler queries gateway status. | Zero blind retries; zero duplicate charges. |
| **Payment Card Declined** | Provider returns HTTP 402 / Card Error | Transaction marked `FAILED`; Lua script releases held lease back to pool. | Zero inventory leak; unit immediately available for sale. |
| **Duplicate Client Submission** | Duplicate `Idempotency-Key` detected | Redis `SETNX` short-circuits request and returns cached lease response. | Exactly one reservation granted; zero double-decrement. |
| **Order Service Outage (30s Crash)**| Worker heartbeat loss; consumer group offline | Payments continue to capture; events buffer in Kafka topic `payment.captured.v1`. | 100% of payments preserved; orders resume upon reboot. |
| **Kafka Consumer Failure** | Worker unhandled exception or crash | Uncommitted offset retained; message routed to DLQ after 3 retries. | Zero silent event loss; message replay enabled. |
| **Cart Abandonment / Expiry** | Lease wall-clock expires ($> 300\,\text{s}$) | Background ZSet sweeper deletes lease and increments available stock ($+1$). | Abandoned stock recycled to active buyers. |
| **PostgreSQL Saturation** | Connection pool usage $> 90\%$ | Ingress admission controller sheds lower-priority traffic; applies backpressure. | Core transactional ledger protected. |
| **Flash Traffic Surge (50x)** | Ingress RPS exceeds 50,000 | Fast-Drop Circuit Filter rejects sold-out SKU in $< 1\,\text{ms}$ at the edge. | Sub-15ms P99 latency preserved. |

---

## 6. The 50x Traffic Surge Defense Strategy (Up to 500,000 RPS)
1. **Edge Horizontal Scaling**: Scale stateless Envoy gateway and FastAPI application pods horizontally across multi-AZ clusters.
2. **Admission Control Selectivity**: Enforce adaptive admission control for the flash-sale command path while keeping catalog reads on edge caches.
3. **Read Path Isolation**: All product metadata queries are served from read-through L1/L2 caches without touching PostgreSQL.
4. **Authoritative Write Protection**: Strict limit on concurrent database connections; Redis Lua absorbs 99% of contending ingress requests.
5. **Independent Worker Scaling**: Consumer groups scale based on Kafka partition lag metrics independently of HTTP request handlers.
6. **Provider Concurrency Throttling**: Third-party payment gateways protected via token bucket rate limiters and circuit breakers.
7. **Graceful Functional Degradation**: Under extreme load, non-essential operations (marketing recommendations, email dispatch) degrade before core purchase correctness is compromised.
