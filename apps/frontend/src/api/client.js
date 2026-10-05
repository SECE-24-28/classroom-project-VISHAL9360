/**
 * SALESTORM ARFA: Production-Grade Frontend API Client
 * Communicates directly with FastAPI backend running at http://localhost:8080
 */

export const API_BASE_URL =
  (typeof window !== 'undefined' && window.__API_BASE_URL__) ||
  'http://localhost:8080';

/**
 * Generate cryptographically secure UUIDv4 idempotency key
 */
export function generateIdempotencyKey() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback RFC4122 v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Reserve inventory lease atomically via Redis Lua backend
 * POST /api/v1/checkout/reserve
 * Attaches Idempotency-Key header
 */
export async function reserveStock({
  productId = 'flash_sku_titanium_01',
  quantity = 1,
  idempotencyKey,
} = {}) {
  const key = idempotencyKey || generateIdempotencyKey();
  const url = `${API_BASE_URL}/api/v1/checkout/reserve`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': key,
      },
      body: JSON.stringify({ product_id: productId, quantity }),
    });

    const data = await response.json().catch(() => ({}));
    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err.message || 'Network error connecting to reservation engine',
      data: null,
    };
  }
}

/**
 * Authorize and commit order payment
 * POST /api/v1/payments/execute
 * Attaches Idempotency-Key header
 */
export async function executePayment({
  reservationId,
  paymentToken = 'tok_visa_4242',
  success = true,
  idempotencyKey,
} = {}) {
  const key = idempotencyKey || generateIdempotencyKey();
  const url = `${API_BASE_URL}/api/v1/payments/execute`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': key,
      },
      body: JSON.stringify({
        reservation_id: reservationId,
        payment_method_token: paymentToken,
        success,
      }),
    });

    const data = await response.json().catch(() => ({}));
    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err.message || 'Network error executing payment',
      data: null,
    };
  }
}

/**
 * Trigger 10,000 concurrent contender storm
 * POST /api/v1/chaos/10k-burst
 */
export async function trigger10kBurst() {
  const url = `${API_BASE_URL}/api/v1/chaos/10k-burst`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json().catch(() => ({}));
    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err.message || 'Network error triggering 10k burst',
      data: null,
    };
  }
}

/**
 * Toggle downstream Order Service brownout / crash state
 * POST /api/v1/chaos/crash-order-svc
 */
export async function toggleCrashOrderService() {
  const url = `${API_BASE_URL}/api/v1/chaos/crash-order-svc`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json().catch(() => ({}));
    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err.message || 'Network error toggling order service',
      data: null,
    };
  }
}

/**
 * Reset flash sale state for demo replay
 * POST /api/v1/admin/reset
 */
export async function resetAdminDemo() {
  const url = `${API_BASE_URL}/api/v1/admin/reset`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json().catch(() => ({}));
    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: err.message || 'Network error resetting demo state',
      data: null,
    };
  }
}

/**
 * Fetch snapshot telemetry metrics
 * GET /api/v1/telemetry
 */
export async function getTelemetry() {
  const url = `${API_BASE_URL}/api/v1/telemetry`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Telemetry fetch failed: ${response.status}`);
  }
  return await response.json();
}

/**
 * High-precision upstream probe relay
 * POST /api/probe (or POST /api/v1/probe)
 */
export async function probeEndpoint(targetUrl) {
  const start = performance.now();
  const url = `${API_BASE_URL}/api/probe`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: targetUrl }),
    });
    const data = await response.json().catch(() => null);
    if (data && typeof data.latency_ms === 'number') {
      return { ok: data.ok, status: data.status, latency: data.latency_ms };
    }
    const elapsed = Math.round(performance.now() - start);
    return { ok: response.ok, status: response.status, latency: elapsed };
  } catch (_) {
    // Secondary attempt: direct browser fetch with short timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const directRes = await fetch(targetUrl, { signal: controller.signal, mode: 'cors' }).catch(() => null);
      clearTimeout(timeoutId);
      const elapsed = Math.round(performance.now() - start);
      return { ok: !!(directRes && directRes.ok), status: directRes ? directRes.status : 0, latency: elapsed };
    } catch (__) {
      const elapsed = Math.round(performance.now() - start);
      return { ok: false, status: 0, latency: elapsed };
    }
  }
}

/**
 * Connect to real-time SSE stream with automatic fallback polling every 500ms
 * GET /api/v1/telemetry/stream -> fallback to GET /api/v1/telemetry
 */
export function connectTelemetryStream(onData, onError) {
  let eventSource = null;
  let pollInterval = null;
  let isSSEActive = false;
  let isCleanedUp = false;

  const startPolling = () => {
    if (pollInterval || isCleanedUp) return;

    const fetchLatest = async () => {
      if (isCleanedUp) return;
      try {
        const data = await getTelemetry();
        if (!isCleanedUp && onData) onData(data);
      } catch (err) {
        if (!isCleanedUp && onError) onError(err);
      }
    };

    // Immediate initial poll
    fetchLatest();
    pollInterval = setInterval(fetchLatest, 500);
  };

  const stopPolling = () => {
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  };

  if (typeof window !== 'undefined' && 'EventSource' in window) {
    try {
      const streamUrl = `${API_BASE_URL}/api/v1/telemetry/stream`;
      eventSource = new EventSource(streamUrl);

      eventSource.onmessage = (event) => {
        if (isCleanedUp) return;
        isSSEActive = true;
        stopPolling();
        try {
          const parsed = JSON.parse(event.data);
          if (onData) onData(parsed);
        } catch (e) {
          console.error('[SSE] JSON parse error:', e);
        }
      };

      eventSource.onerror = (err) => {
        if (isCleanedUp) return;
        // Fall back to polling on SSE disconnect or backend offline
        if (isSSEActive) {
          isSSEActive = false;
        }
        startPolling();
        if (onError) onError(err);
      };
    } catch (_) {
      startPolling();
    }
  } else {
    startPolling();
  }

  // Cleanup handler
  return () => {
    isCleanedUp = true;
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
    stopPolling();
  };
}
