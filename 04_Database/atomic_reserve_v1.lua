-- ==============================================================================
-- SALESTORM ARFA: Production-Grade Redis Lua Atomic Reservation Script (v1)
-- Guarantee: Strictly Linearizable Check-and-Decrement with Zero Oversell
-- ==============================================================================
--
-- KEYS:
--   KEYS[1] = stock:{product_id}                (String integer: available unreserved units)
--   KEYS[2] = reserved:{product_id}             (String integer: currently reserved units)
--   KEYS[3] = idempotency:{idempotency_key}     (String: cached active lease payload)
--   KEYS[4] = lease_timeline:{product_id}       (Sorted Set: reservationId -> expires_at epoch ms)
--
-- ARGV:
--   ARGV[1] = requested_quantity                (Integer: default 1)
--   ARGV[2] = lease_duration_seconds            (Integer: default 300)
--   ARGV[3] = reservation_metadata_json         (JSON string: {reservation_id, user_id, current_epoch_ms})
--
-- RETURN (JSON string):
--   { status: "RESERVED"|"ALREADY_RESERVED"|"INVENTORY_EXHAUSTED", code: 0|1|2, ... }
-- ==============================================================================

local stockKey        = KEYS[1]
local reservedKey     = KEYS[2]
local idempotencyKey  = KEYS[3]
local timelineKey     = KEYS[4]

local requestedQty    = tonumber(ARGV[1]) or 1
local leaseTtlSec     = tonumber(ARGV[2]) or 300
local metaJson        = ARGV[3]

-- ------------------------------------------------------------------------------
-- 1. Atomic Idempotency Check (Duplicate Request Suppression)
-- ------------------------------------------------------------------------------
local cachedLease = redis.call('GET', idempotencyKey)
if cachedLease then
    local ttlRemaining = redis.call('TTL', idempotencyKey)
    return cjson.encode({
        status = "ALREADY_RESERVED",
        code = 1,
        message = "Idempotency key already assigned to active reservation",
        cached_payload = cjson.decode(cachedLease),
        ttl_remaining_seconds = ttlRemaining
    })
end

-- ------------------------------------------------------------------------------
-- 2. Atomic Stock Evaluation
-- ------------------------------------------------------------------------------
local rawStock = redis.call('GET', stockKey)
local currentStock = tonumber(rawStock)

if not currentStock or currentStock < requestedQty then
    return cjson.encode({
        status = "INVENTORY_EXHAUSTED",
        code = 2,
        message = "Stock completely depleted. Zero inventory remaining.",
        remaining_stock = currentStock or 0
    })
end

-- ------------------------------------------------------------------------------
-- 3. Atomic Allocation (DECRBY Available, INCRBY Reserved)
-- ------------------------------------------------------------------------------
local remainingStock = redis.call('DECRBY', stockKey, requestedQty)
local totalReserved  = redis.call('INCRBY', reservedKey, requestedQty)

-- ------------------------------------------------------------------------------
-- 4. Set Ephemeral User Lease with Hard 300-Second TTL
-- ------------------------------------------------------------------------------
local meta = cjson.decode(metaJson)
local currentEpochMs = tonumber(meta.current_epoch_ms) or 0
local expiresEpochMs = currentEpochMs + (leaseTtlSec * 1000)
local reservationId  = meta.reservation_id

local leasePayload = {
    reservation_id = reservationId,
    user_id = meta.user_id,
    quantity = requestedQty,
    lease_duration_seconds = leaseTtlSec,
    expires_at = expiresEpochMs,
    created_at = currentEpochMs,
    remaining_stock = remainingStock
}

redis.call('SET', idempotencyKey, cjson.encode(leasePayload), 'EX', leaseTtlSec)

-- ------------------------------------------------------------------------------
-- 5. ZADD to Expiry Timeline for Automated Sweeper Worker
-- ------------------------------------------------------------------------------
local timelineMember = reservationId .. ":" .. idempotencyKey .. ":" .. requestedQty
redis.call('ZADD', timelineKey, expiresEpochMs, timelineMember)

-- ------------------------------------------------------------------------------
-- 6. Return Structured Success Result
-- ------------------------------------------------------------------------------
return cjson.encode({
    status = "RESERVED",
    code = 0,
    reservation_id = reservationId,
    remaining_stock = remainingStock,
    total_reserved = totalReserved,
    expires_at = expiresEpochMs,
    lease_duration_seconds = leaseTtlSec
})
