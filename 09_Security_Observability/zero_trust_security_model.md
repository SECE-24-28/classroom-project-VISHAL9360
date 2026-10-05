# ==============================================================================
# SALESTORM ARFA: Zero-Trust Security Architecture & Threat Model
# Document: 09_Security_Observability/zero_trust_security_model.md
# Tier-1 Enterprise Specification | PCI-DSS Level 1 | NIST SP 800-207 Zero Trust
# ==============================================================================

## 1. Executive Summary & Security Posture
The SALESTORM ARFA flash sale engine operates under the fundamental premise of **NIST SP 800-207 Zero Trust Architecture (ZTA)**: *"Never Trust, Always Verify"*. Every network packet, actor, inter-service RPC, and client token is treated as potentially hostile.

Under 10,000-to-100 high-contention traffic spikes, malicious actors deploy automated scalper bots, replay networks, transaction race conditions, and volumetric DDoS attacks. This document details the defense-in-depth security model protecting inventory integrity, financial data, and downstream stability.

---

## 2. Threat Modeling Matrix (STRIDE & Flash-Sale Attack Vectors)

| Attack Vector | Threat Category | Exploit Mechanism | Architectural Mitigation | Verification Invariant |
| :--- | :--- | :--- | :--- | :--- |
| **Bot-Driven Inventory Hoarding** | Denial of Service & Tampering | Headless bot farms (Puppeteer, Playwright) claiming leases across thousands of sybil accounts without purchase intent to starve real shoppers. | **1. Turnstile Behavioral Proof-of-Work (PoW):** Non-interactive browser entropy validation.<br/>**2. Dynamic Hashcash Challenge:** Client must solve SHA-256 difficulty puzzle ($target < 0x0000FFFF$) before queue ingress.<br/>**3. Single-Account Invariant:** Redis `user_lease:{sku}:{user_id}` enforces strict $1\text{ lease per verified identity}$. | Zero unverified bot identities can acquire reservation tokens; unused leases restock in exactly 300s via Lua sweeper. |
| **Replay & Race Attacks on Reservations** | Spoofing & Repudiation | Network interception of valid reservation requests, replaying identical packets across edge nodes to induce race conditions or double allocation. | **1. Client-Side Cryptographic UUIDv4 Idempotency:** Auto-generated on client mount.<br/>**2. Atomic Redis `SETNX` Barrier:** Pre-allocates idempotency key with 300s TTL.<br/>**3. Single-Threaded Isolation:** Redis Lua executes check-and-decrement atomically inside the core engine loop. | 5 identical requests produce identical `reservation_id` without deducting inventory ($100 \rightarrow 99$, never $95$). |
| **Payment Nonce Tampering & Double-Spending** | Tampering & Elevation of Privilege | Attacker intercepts lease token, mutates `expires_at` timestamp or swaps SKU to discounted product before submitting payment payload. | **1. HMAC-SHA256 Signed Lease Tokens:** Server signs lease with rotating secret key:<br/>$$\text{Sig} = \text{HMAC-SHA256}(K_{secret}, \text{resvId} \parallel \text{productId} \parallel \text{userId} \parallel \text{expiresAt})$$<br/>**2. PostgreSQL Unique Constraint:** `UNIQUE (reservation_id)` with `INSERT ... ON CONFLICT DO NOTHING`. | Tampered lease tokens fail cryptographic validation at Checkout Saga Coordinator; double-capture attempts are rejected. |
| **TCP SYN Flood & HTTP/2 Stream Multiplexing** | Denial of Service | Contenders launch distributed SYN floods or exploit HTTP/2 multiplexed stream floods to exhaust server file descriptors and worker connection pools. | **1. Anycast Ingress Scrubbing:** Cloudflare Edge drops Layer 3/4 volumetric floods.<br/>**2. eBPF/XDP Kernel Filter:** High-speed packet drop at network interface before context-switching to userspace.<br/>**3. Envoy Connection Management:** `max_connections: 50000`, `max_concurrent_streams: 100`, sliding-window rate limiting. | Ingress P99 latency remains $< 20\,\text{ms}$ during 10,000 contender bursts; zero socket exhaustion errors. |

---

## 3. Cryptographic Lease Signature Specification
Reservation leases are cryptographically tamper-proof. The backend never trusts client-supplied expiration timestamps or product metadata.

### A. Signature Construction
Upon successful atomic decrement in Redis Lua, the engine generates an HMAC signature:

$$\text{HMAC-SHA256}(K_{\text{secret}}, \text{reservation\_id} \parallel \text{product\_id} \parallel \text{expires\_at})$$

```python
import hmac
import hashlib

def generate_signature(secret_key: str, resv_id: str, product_id: str, expires_at: int) -> str:
    message = f"{resv_id}:{product_id}:{expires_at}".encode("utf-8")
    return hmac.new(secret_key.encode("utf-8"), message, hashlib.sha256).hexdigest()
```

### B. Verification Gate (Checkout Saga Coordinator)
Before delegating any call to third-party payment gateways (Stripe/Razorpay), the Checkout Saga Coordinator re-computes the HMAC:
1. Re-computes expected signature using server-held rotating key.
2. Performs **constant-time byte comparison** (`hmac.compare_digest`) to defeat timing attacks.
3. Checks wall-clock expiration:
   $$\text{CurrentTimeEpochMs} \le \text{expires\_at}$$
4. If expired or signature mismatch, immediate HTTP 410 Gone / HTTP 403 Forbidden is returned, preventing fraudulent payment processing.

---

## 4. Service Mesh Identity & mTLS 1.3 (SPIFFE/SPIRE)

All intra-cluster communication within the SALESTORM VPC is strictly mutual-TLS 1.3 encrypted and authenticated via SPIFFE/SPIRE workload attestation.

```
┌────────────────────────────────────────────────────────────────────────┐
│                      SPIRE SERVER (Root Authority)                      │
│             Issues Cryptographic X.509 SVIDs (1-Hour Rotation)          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ SPIFFE Workload API
                                    ▼
       ┌────────────────────────────────────────────────────────┐
       │             SPIRE AGENT (DaemonSet on Node)             │
       │       Attests: Kubernetes PSAT / Linux cgroup / UID     │
       └───────────────────┬────────────────────────┬───────────┘
                           │ mTLS 1.3               │ mTLS 1.3
                           ▼                        ▼
              ┌────────────────────────┐┌────────────────────────┐
              │ Envoy Sidecar Proxy    ││ Envoy Sidecar Proxy    │
              │ (Inventory Service)    ││ (Order Worker Service) │
              │ spiffe://salestorm/    ││ spiffe://salestorm/    │
              │ ns/prod/sa/inventory   ││ ns/prod/sa/orders      │
              └────────────────────────┘└────────────────────────┘
```

### A. SPIFFE ID Taxonomy
Workload identities are formalized as URI strings:
* **Inventory Service**: `spiffe://salestorm.internal/ns/production/sa/inventory-service`
* **Order Saga Service**: `spiffe://salestorm.internal/ns/production/sa/order-orchestrator`
* **Order Worker Consumer**: `spiffe://salestorm.internal/ns/production/sa/order-settlement-worker`
* **Debezium CDC Connector**: `spiffe://salestorm.internal/ns/production/sa/debezium-cdc`

### B. Envoy Sidecar Authorization Policy
Envoy sidecars enforce cryptographic RBAC at the transport layer:
```yaml
# Envoy SPIFFE Authorization Filter
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: enforce-inventory-spiffe
  namespace: production
spec:
  selector:
    matchLabels:
      app: inventory-service
  action: ALLOW
  rules:
  - from:
    - source:
        principals:
        - "spiffe://salestorm.internal/ns/production/sa/envoy-gateway"
        - "spiffe://salestorm.internal/ns/production/sa/order-orchestrator"
    to:
    - operation:
        methods: ["POST", "GET"]
        paths: ["/api/v1/checkout/*", "/api/v1/telemetry*"]
```

---

## 5. PCI-DSS Level 1 Tokenization & Boundary Isolation

SALESTORM strictly enforces **Zero-Knowledge Primary Account Number (PAN) Boundaries**. The application architecture completely de-scopes internal infrastructure from PCI-DSS Level 1 audit liability.

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │ CLIENT BROWSER (React SPA)                                              │
 │ • User inputs Credit Card into Stripe Elements / Razorpay iFrame       │
 └───────────────────┬────────────────────────────────────────────────────┘
                     │ HTTPS / TLS 1.3 (Direct to Stripe Gateway)
                     ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │ STRIPE PCI-DSS LEVEL 1 CERTIFIED VAULT                                  │
 │ • Tokenizes raw PAN, Expiry, CVV into opaque token: 'tok_visa_4242'     │
 └───────────────────┬────────────────────────────────────────────────────┘
                     │ Returns Payment Token ('tok_1N4...')
                     ▼
 ┌────────────────────────────────────────────────────────────────────────┐
 │ SALESTORM VPC BOUNDARY (FastAPI Backend & PostgreSQL)                  │
 │ • Zero raw PAN, zero CVV, zero track data                              │
 │ • Stores solely: token, transaction_id, last4, brand, amount_cents     │
 └────────────────────────────────────────────────────────────────────────┘
```

### A. Inviolable PCI-DSS Architectural Rules
1. **Zero PAN Ingestion**: No raw card numbers ever touch SALESTORM containers, memory spaces, logs, or databases. The frontend directly communicates with the card network vault using Stripe Elements SDK.
2. **Log Scrubbing Pipeline**: OpenTelemetry and log forwarders execute automated regex sanitization:
   ```regex
   # PCI-DSS Credit Card Pattern Scrubber
   \b(?:\d[ -]*?){13,16}\b
   ```
   Any string matching the Luhn algorithm pattern is masked as `[REDACTED_PCI_PAN]` prior to disk serialization.
3. **Database Column Encryption**: All operational metadata (customer ID, transaction IDs) is encrypted at rest in PostgreSQL using AES-256 via `pgcrypto`:
   ```sql
   -- Column-level metadata masking
   SELECT pgp_sym_encrypt(user_id::text, current_setting('salestorm.encryption_key'));
   ```

---

## 6. SRE Incident Playbook: Security Alert Escalation

| Trigger Metric | Severity | Automated Action | Engineer Runbook |
| :--- | :--- | :--- | :--- |
| `salestorm_rejected_requests_total > 5000/s` | **P1 - Warning** | Auto-scales Envoy rate limiter; tightens IP CIDR bucket | Monitor Cloudflare Turnstile rejection rate; check edge ASN anomalies. |
| `salestorm_hmac_mismatch_total > 10` | **P0 - Critical** | Drops offending IP; revokes active user session | Rotate `SALESTORM_SECRET_KEY` via Vault; audit ingress gateway logs. |
| `salestorm_stock_available_gauge < 0` | **P0 - Catastrophic** | Triggers Global Emergency Circuit Breaker; freezes reservations | **INVARIANT BREACH:** Audit Redis appendonly log; trigger reconciliation job. |
