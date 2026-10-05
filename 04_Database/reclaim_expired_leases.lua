-- ==============================================================================
-- SALESTORM ARFA: Redis Expired Lease Sweeper Script
-- Purpose: Atomically sweep expired leases via ZRANGEBYSCORE & replenish stock
-- ==============================================================================
--
-- KEYS:
--   KEYS[1] = stock:{product_id}                (String integer: available stock)
--   KEYS[2] = reserved:{product_id}             (String integer: currently reserved units)
--   KEYS[3] = lease_timeline:{product_id}       (Sorted Set: timeline of leases)
--
-- ARGV:
--   ARGV[1] = current_epoch_ms                  (Integer: current Unix timestamp in ms)
--   ARGV[2] = max_batch_size                    (Integer: maximum leases to sweep per cycle, e.g. 100)
--
-- RETURN (JSON string):
--   { status: "OK", reclaimed_count: N, available_stock: S, reserved_stock: R }
-- ==============================================================================

local stockKey        = KEYS[1]
local reservedKey     = KEYS[2]
local timelineKey     = KEYS[3]

local currentEpochMs  = tonumber(ARGV[1])
local maxBatchSize    = tonumber(ARGV[2]) or 100

-- 1. Fetch expired entries from Sorted Set (score <= currentEpochMs)
local expiredEntries  = redis.call('ZRANGEBYSCORE', timelineKey, 0, currentEpochMs, 'LIMIT', 0, maxBatchSize)
local totalReclaimed  = 0
local evictedMembers  = {}

if #expiredEntries == 0 then
    local currentStock    = tonumber(redis.call('GET', stockKey)) or 0
    local currentReserved = tonumber(redis.call('GET', reservedKey)) or 0
    return cjson.encode({
        status = "IDLE",
        reclaimed_count = 0,
        available_stock = currentStock,
        reserved_stock = currentReserved
    })
end

-- 2. Iterate through expired leases and unlink idempotency keys
for i, member in ipairs(expiredEntries) do
    -- Parse reservationId:idempotencyKey:qty
    local parts = {}
    for part in string.gmatch(member, "[^:]+") do
        table.insert(parts, part)
    end
    
    local resvId         = parts[1]
    local idempotencyKey = parts[2]
    local qty            = tonumber(parts[3]) or 1

    -- Remove from Sorted Set index
    redis.call('ZREM', timelineKey, member)

    -- Evict idempotency lease key if present
    if idempotencyKey then
        redis.call('DEL', "idempotency:" .. idempotencyKey)
    end

    totalReclaimed = totalReclaimed + qty
    table.insert(evictedMembers, resvId)
end

-- 3. Atomically replenish available stock and decrement reserved counter
local newAvailableStock = redis.call('INCRBY', stockKey, totalReclaimed)
local newReservedStock  = redis.call('DECRBY', reservedKey, totalReclaimed)

-- Ensure reserved counter does not drop below zero due to clock drift
if newReservedStock < 0 then
    redis.call('SET', reservedKey, 0)
    newReservedStock = 0
end

return cjson.encode({
    status = "RECLAIMED",
    reclaimed_count = totalReclaimed,
    available_stock = newAvailableStock,
    reserved_stock = newReservedStock,
    evicted_reservation_ids = evictedMembers
})
