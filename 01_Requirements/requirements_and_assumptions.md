# ==============================================================================
# SALESTORM ARFA: Requirements & Assumptions Document
# Deliverable 01 | Section 1 of Master Architecture Specification
# ==============================================================================

## 1.1 Business Problem
During a flash sale, customer demand is highly concentrated in a short interval. A product with 100 units may receive 10,000 near-simultaneous "Buy Now" requests. The system must:
1. Determine which requests can obtain a temporary claim on inventory.
2. Protect the inventory invariant under concurrency (strictly zero overselling).
3. Safely process payment without charging for unavailable stock.
4. Complete the order lifecycle despite partial failures (such as a 30-second downstream Order Service outage).

---

## 1.2 Functional Requirements

| ID | Requirement | Priority | Primary Owner | Description |
| :--- | :--- | :--- | :--- | :--- |
| **FR-01** | Customer Identity & Account Management | High | Identity / Customer | Authenticated identity verification; customerId derived from auth tokens. |
| **FR-02** | Product Catalogue & Category Discovery | High | Product Service | Catalogue browsing, specifications, pricing, and category hierarchies. |
| **FR-03** | Cart & Cart-Item Management | High | Cart Service | Shopping cart lifecycle and user-to-item quantity tracking. |
| **FR-04** | Sale / Deal / Coupon Handling | Medium | Sale Service | Flash sale rule enforcement, promotional discounts, and coupon validation. |
| **FR-05** | Inventory Availability | Critical | Inventory Service | Real-time unreserved stock status queries. |
| **FR-06** | Inventory Reservation, Confirmation, Expiry & Release | Critical | Reservation / Inventory | Atomic conditional allocation, 300s hold leases, sweeper expiration, and restock release. |
| **FR-07** | Checkout Orchestration | Critical | Checkout Service | End-to-end coordination across reservation, payment, and order creation. |
| **FR-08** | Payment Processing & Reconciliation | Critical | Payment Service | Provider abstraction (Stripe/Razorpay), idempotent execution, and timeout reconciliation. |
| **FR-09** | Order Creation & Lifecycle | Critical | Order Service | Post-payment asynchronous order materialization and state machine transitions. |
| **FR-10** | Shipment / Fulfilment Integration | High | Shipment Service | Downstream logistics, parcel labeling, and tracking updates. |
| **FR-11** | Customer Notification | Medium | Notification Service | Asynchronous email/SMS/push delivery upon lifecycle events. |
| **FR-12** | Audit, Monitoring, Logging & Tracing | Critical | Cross-cutting | Distributed W3C tracing, Prometheus metrics, and security audit logs. |

---

## 1.3 Non-Functional Requirements

| ID | Requirement | Type | Acceptance Intent |
| :--- | :--- | :--- | :--- |
| **NFR-01** | Handle 10,000 Concurrent Purchase Attempts | Capacity | Controlled contention without correctness loss under flash burst. |
| **NFR-02** | Reason about up to ~500,000 requests/sec | Scalability | Traffic shaping, edge admission control, and horizontal scaling strategy. |
| **NFR-03** | Zero Overselling | Consistency | Successful sales $\le$ authoritative stock ($100$ units max). Inventory never negative. |
| **NFR-04** | Idempotent Processing | Correctness | Retried state-changing requests do not duplicate business effects. |
| **NFR-05** | Horizontal Scalability | Availability | Stateless application services scale horizontally while protecting downstream capacity. |
| **NFR-06** | Failure Recovery | Reliability | Defined deterministic recovery paths for service, gateway, and database failures. |
| **NFR-07** | Observability | Operability | Real-time metrics, structured logs, W3C traces, and business invariant alerts. |
| **NFR-08** | Security | Security | Authenticated, authorized, encrypted (mTLS 1.3), and audited zero-trust access. |

---

## 1.4 Workload and Practical Scenario

| Parameter | Baseline Value | Architectural Significance |
| :--- | :--- | :--- |
| **Normal Traffic** | $\sim 10,000\,\text{requests/sec}$ | Baseline day-to-day browse and search throughput. |
| **Extreme Flash-Sale Reasoning Target** | $\sim 500,000\,\text{requests/sec}$ | Peak burst scenario at sale opening ($T=0$). |
| **Concurrent Purchase Attempts** | **10,000 contenders** | Simultaneous "Buy Now" contenders competing for stock. |
| **Available Inventory** | **100 units** | Strict physical stock limit. |
| **Payment Success Assumption** | **95%** | 95 units successfully authorized and captured. |
| **Payment Failure Assumption** | **5%** | 5 card failures/declines releasing stock back to the pool. |
| **Duplicate Request Assumption** | **2%** | Network retries suppressed by client idempotency keys. |
| **Order Service Outage Scenario** | **30 seconds** | Downstream service crash while payments continue to buffer in Kafka. |

---

## 1.5 Constraints and Assumptions
1. **Design-First Architecture**: The solution is design-first; production implementation conforms strictly to the 18 mandatory deliverables.
2. **Strict Inventory Correctness**: Inventory correctness is a strict invariant rather than a best-effort target.
3. **Idempotency & Safe Recovery**: Payments must be idempotent and safely recoverable.
4. **Durable Asynchronous Messaging**: Critical cross-service outcomes require durable recovery mechanisms (Transactional Outbox + Kafka).
5. **Clear Consistency Boundaries**: The system explicitly identifies bottlenecks, consistency boundaries, and failure behaviour.
6. **No Phantom Benchmarks**: Performance figures in this document represent architectural targets/assumptions unless backed by actual integration test evidence.

---

## 1.6 Success Criteria

| Area | Expected Outcome |
| :--- | :--- |
| **Concurrency** | 10,000 simultaneous attempts are handled through controlled contention and defined scaling behaviour. |
| **Inventory** | 100 available units cannot produce more than 100 successful sales. |
| **Reservation** | Unpaid and expired reservations are released correctly and only once. |
| **Payment** | Duplicate requests do not create duplicate charges; ambiguous outcomes are reconciled. |
| **Order** | Successful payments eventually reach a valid order state even during a 30-second Order Service crash. |
| **Reliability** | Service and gateway failures have deterministic recovery paths without data loss. |
| **Scalability** | Stateless application services scale horizontally while downstream database capacity is strictly bounded. |
