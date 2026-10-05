# SALESTORM ARFA - Functional Requirements Specification

## 1. System Mission & Scope
SALESTORM is a mission-critical, ultra-low-latency flash sale orchestration engine engineered to withstand extreme instantaneous demand spikes. The system orchestrates high-contention flash sales characterized by thousands of concurrent users competing for a strictly constrained inventory pool (e.g., 10,000 concurrent requests contending for 100 units).

---

## 2. Core Functional Requirements (FR)

### FR-01: Atomic Inventory Reservation
- **Behavior**: The system MUST guarantee atomic check-and-decrement semantics for constrained inventory items.
- **Guarantee**: Inventory overselling is mathematically impossible. Exactly $N$ units ($N=100$) can be reserved; request $N+1$ through $10,000$ must receive an immediate, deterministic rejection (`HTTP 409 Conflict - INVENTORY_EXHAUSTED`).
- **Idempotency**: A user identity is restricted to at most one active reservation per SKU. Repeat reservation attempts by the same authenticated user MUST return their existing active lease or `HTTP 400 ALREADY_RESERVED`.

### FR-02: Time-To-Live (TTL) Ephemeral Lease Management
- **Lease Window**: Upon successful reservation, a temporary lease is granted for exactly 300 seconds (5 minutes).
- **Lease Extension**: Leases cannot be arbitrarily extended by client requests.
- **Settlement**: If checkout and payment are completed within 300 seconds, the reservation transitions permanently to `PURCHASED`.
- **Automatic Reclaim**: If the lease timer expires without a verified payment confirmation, the reserved unit is atomically reclaimed and returned to the available inventory pool without human intervention.

### FR-03: Asynchronous Order Settlement & Payment Decoupling
- **Decoupled Architecture**: Inventory reservation and payment processing MUST NOT execute within the same synchronous database transaction.
- **Immediate ACK**: The client receives a signed reservation token (`reservation_id`, `expires_at`, `hmac_signature`) within `< 50ms`.
- **Payment Gateway Integration**: Payment processing occurs asynchronously against third-party providers (e.g., Stripe Gateway). The user submits payment referencing the `reservation_id`.
- **Webhook / Callback Ingestion**: Payment gateway callbacks trigger order finalization through an idempotent event stream.

### FR-04: Strict Idempotency on Payment & Order Placement
- **Client Idempotency Key**: All checkout requests must carry a unique `Idempotency-Key` header (UUIDv4).
- **Duplicate Suppression**: Duplicate payment submissions with identical keys within 24 hours must return the cached original response without re-executing credit card charges or double-booking orders.

### FR-05: Real-Time Telemetry & Observability Ingress
- **Live Inventory Counters**: Expose real-time counters for `available_stock`, `active_reservations`, `settled_orders`, and `ingress_rps`.
- **Cloud Probe Relay**: Maintain continuous health and latency probes to critical upstream infrastructure (Cloudflare Anycast edge, Stripe Gateway, AWS multi-AZ endpoints).
