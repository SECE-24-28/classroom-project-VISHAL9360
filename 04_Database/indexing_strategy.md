# SALESTORM ARFA - Database Indexing & Contention Mitigation Strategy

## 1. Indexing Philosophy for High-Write Systems
Under flash-sale peak load, traditional unoptimized B-Tree indexes severely degrade write throughput due to write amplification and index leaf-page splits. SALESTORM employs a surgical indexing strategy focused on:
1. Minimizing index maintenance overhead on write-heavy tables (`orders`, `outbox_events`).
2. Providing instantaneous $O(1)$ or $O(\log N)$ lookup performance for idempotency validation and reservation lease reconciliation.
3. Leveraging partial indexes to exclude historical cold rows from active B-Tree working memory.

---

## 2. Production Index Definitions & Benchmarking Rationale

### A. Partial Index for Unpublished Outbox Events
```sql
CREATE INDEX idx_outbox_unpublished 
ON outbox_events (created_at ASC) 
WHERE published = FALSE;
```
- **Rationale**: The outbox table grows monotonically. Once published, events become historical audit logs. A partial index contains only the tiny set of un-dispatched events (typically 0 to 50 rows).
- **Performance Impact**: Outbox CDC worker scans 1 index page instead of full-table scanning millions of past events. Disk buffer pool hit ratio remains >99.9%.

### B. High-Frequency Lease Expiry Sweeper Index
```sql
CREATE INDEX idx_reservations_pending_expires 
ON reservations (expires_at ASC) 
WHERE status = 'PENDING';
```
- **Rationale**: The background sweeper worker polls for leases where `status = 'PENDING' AND expires_at < NOW()`.
- **Performance Impact**: Index scan returns strictly candidates for reclamation without locking active checkout transactions.

### C. Fast Idempotency Hash Lookup
```sql
CREATE UNIQUE INDEX idx_idempotency_lookup 
ON idempotency_keys (idempotency_key, user_id);
```
- **Rationale**: Prevents duplicate HTTP requests from firing duplicate credit card authorization calls to Stripe.
- **Lookup Latency**: Sub-millisecond index seek ($< 0.4ms$).

### D. Optimistic Concurrency Control on Inventory Items
```sql
CREATE INDEX idx_inventory_sku_version 
ON inventory_items (sku_code, version);
```
- **Rationale**: Supports optimistic concurrency checks during batch inventory ledger reconciliation.
