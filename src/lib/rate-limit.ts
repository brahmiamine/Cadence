// Limiteur en mémoire (une seule instance). Si plusieurs réplicas : le déplacer vers un store partagé.
const buckets = new Map<string, { count: number; until: number }>();

export function allowAttempt(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  for (const [name, bucket] of buckets) if (bucket.until <= now) buckets.delete(name);
  const bucket = buckets.get(key);
  if (bucket) return bucket.count++ < limit;
  if (buckets.size >= 10_000) return false; // mémoire bornée
  buckets.set(key, { count: 1, until: now + windowMs });
  return true;
}

/** Dernière adresse de X-Forwarded-For : celle ajoutée par Caddy, non falsifiable par le client. */
export function clientIp(headers: { get(name: string): string | null } | Record<string, unknown> | undefined): string {
  const raw = typeof (headers as { get?: unknown })?.get === "function"
    ? (headers as { get(n: string): string | null }).get("x-forwarded-for")
    : (headers as Record<string, unknown> | undefined)?.["x-forwarded-for"];
  return String(raw ?? "").split(",").map((s) => s.trim()).filter(Boolean).at(-1) ?? "unknown";
}
