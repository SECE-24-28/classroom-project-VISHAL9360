-- ==============================================================================
-- SALESTORM ARFA: Production-Grade PostgreSQL 16 DDL
-- Architecture: High-Contention Flash Sale System of Record & Transactional Outbox
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables in reverse dependency order for clean recreation if re-run
DROP TABLE IF EXISTS transactional_outbox CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS inventory_reservation CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;

-- ------------------------------------------------------------------------------
-- 1. Inventory Catalog & Stock Invariant Table
-- Invariant: total_quantity >= (reserved_quantity + sold_quantity)
-- ------------------------------------------------------------------------------
CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
    total_quantity INTEGER NOT NULL CHECK (total_quantity >= 0),
    reserved_quantity INTEGER NOT NULL DEFAULT 0 CHECK (reserved_quantity >= 0),
    sold_quantity INTEGER NOT NULL DEFAULT 0 CHECK (sold_quantity >= 0),
    version BIGINT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_inventory_allocation_integrity 
        CHECK (total_quantity >= (reserved_quantity + sold_quantity))
);

COMMENT ON TABLE inventory IS 'Master catalog and allocation ledger. Guarantees mathematical zero oversell via check constraint.';
COMMENT ON COLUMN inventory.version IS 'Optimistic locking concurrency counter for batch reconciliations.';

-- ------------------------------------------------------------------------------
-- 2. Inventory Reservation Table (Ephemeral Leases)
-- Statuses: 'RESERVED', 'CONFIRMED', 'EXPIRED', 'RELEASED'
-- ------------------------------------------------------------------------------
CREATE TYPE reservation_status AS ENUM ('RESERVED', 'CONFIRMED', 'EXPIRED', 'RELEASED');

CREATE TABLE inventory_reservation (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id VARCHAR(64) NOT NULL REFERENCES inventory(product_id) ON DELETE RESTRICT,
    user_id UUID NOT NULL,
    idempotency_key VARCHAR(128) UNIQUE NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    status reservation_status NOT NULL DEFAULT 'RESERVED',
    lease_duration_seconds INTEGER NOT NULL DEFAULT 300,
    expires_at TIMESTAMPTZ NOT NULL,
    hmac_signature VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Partial index for active lease countdown sweeper (P99 < 1ms index scan)
CREATE INDEX idx_reservation_active_expiry 
ON inventory_reservation (status, expires_at) 
WHERE status = 'RESERVED';

-- Index for fast user lookup and anti-hoarding verification
CREATE INDEX idx_reservation_user_product 
ON inventory_reservation (user_id, product_id, status);

COMMENT ON TABLE inventory_reservation IS 'Ephemeral reservation leases granted by Redis Lua engine and synced to RDBMS.';

-- ------------------------------------------------------------------------------
-- 3. Orders Table
-- ------------------------------------------------------------------------------
CREATE TYPE order_status AS ENUM ('CREATED', 'PAYMENT_PENDING', 'CONFIRMED', 'FAILED', 'REFUNDED');

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID NOT NULL REFERENCES inventory_reservation(id) ON DELETE RESTRICT,
    user_id UUID NOT NULL,
    product_id VARCHAR(64) NOT NULL REFERENCES inventory(product_id) ON DELETE RESTRICT,
    total_amount_cents INTEGER NOT NULL CHECK (total_amount_cents >= 0),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status order_status NOT NULL DEFAULT 'CREATED',
    payment_transaction_id VARCHAR(128),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON orders (user_id, created_at DESC);
CREATE UNIQUE INDEX idx_orders_reservation ON orders (reservation_id);

COMMENT ON TABLE orders IS 'Committed order records finalized after Stripe payment authorization.';

-- ------------------------------------------------------------------------------
-- 4. Transactional Outbox Table
-- Dual-write elimination: guarantees at-least-once message delivery to Kafka
-- ------------------------------------------------------------------------------
CREATE TYPE outbox_status AS ENUM ('PENDING', 'PROCESSING', 'PUBLISHED', 'FAILED');

CREATE TABLE transactional_outbox (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aggregate_type VARCHAR(64) NOT NULL,
    aggregate_id UUID NOT NULL,
    event_type VARCHAR(64) NOT NULL,
    payload JSONB NOT NULL,
    status outbox_status NOT NULL DEFAULT 'PENDING',
    retry_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    processed_at TIMESTAMPTZ,
    last_error TEXT
);

-- Highly selective partial index for the CDC/outbox publisher daemon
CREATE INDEX idx_outbox_pending_created 
ON transactional_outbox (created_at ASC) 
WHERE status = 'PENDING';

COMMENT ON TABLE transactional_outbox IS 'Transactional Outbox ledger. Committed in the exact same ACID transaction as the order.';

-- ------------------------------------------------------------------------------
-- 5. Automatic updated_at Trigger
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_inventory_timestamp
    BEFORE UPDATE ON inventory
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

CREATE TRIGGER trg_reservation_timestamp
    BEFORE UPDATE ON inventory_reservation
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

CREATE TRIGGER trg_orders_timestamp
    BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ------------------------------------------------------------------------------
-- 6. Initial Seed Catalog: Flash Sale SKU (100 Limited Units)
-- ------------------------------------------------------------------------------
INSERT INTO inventory (product_id, title, description, price_cents, total_quantity, reserved_quantity, sold_quantity)
VALUES (
    'flash_sku_titanium_01', 
    'PlayStation 5 Pro (Limited Flash Drop)', 
    'Ultra-limited flash drop. Exclusive titanium anniversary edition.', 
    19900, 
    100, 
    0, 
    0
)
ON CONFLICT (product_id) DO NOTHING;
