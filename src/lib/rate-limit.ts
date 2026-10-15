// src/lib/rate-limit.ts

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

/**
 * Very small in-memory rate limiter. Not suitable for multi-instance
 * deployments — swap for Upstash / Vercel KV in production.
 */
export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    const entry: Entry = { count: 1, resetAt: now + windowMs };
    buckets.set(key, entry);
    return { ok: true, remaining: limit - 1, resetAt: entry.resetAt };
  }

  if (bucket.count >= limit) {
    return { ok: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return { ok: true, remaining: limit - bucket.count, resetAt: bucket.resetAt };
}

/**
 * Best-effort client IP from request headers.
 *
 * Trust model: on platforms that terminate the connection and *set* the
 * forwarding header themselves (Vercel, Cloudflare, most reverse proxies) the
 * first hop is reliable. When the app is exposed directly, a client can spoof
 * `x-forwarded-for` and evade per-IP limits — pair this with a shared,
 * server-side limiter (Upstash/Vercel KV) for anything security-sensitive.
 */
export function getClientIp(req: Request): string {
  // Prefer headers that are harder for clients to inject.
  const vercel = req.headers.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0]!.trim();

  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();

  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();

  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();

  return "unknown";
}

// Periodic cleanup so the Map doesn't grow forever in long-lived processes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of buckets) {
      if (v.resetAt < now) buckets.delete(k);
    }
  }, 60_000).unref?.();
}