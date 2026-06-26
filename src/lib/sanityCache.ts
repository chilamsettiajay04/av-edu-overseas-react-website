const TTL = 30 * 1000;

const STORAGE_PREFIX = "sanity_v2_";

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry>();
const pendingFetches = new Map<string, Promise<unknown>>();

function makeKey(query: string, params?: Record<string, unknown>): string {
  const input = query + (params ? JSON.stringify(params, Object.keys(params).sort()) : "");
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0;
  }
  return STORAGE_PREFIX + Math.abs(hash).toString(36);
}

function isFresh(entry: CacheEntry): boolean {
  return Date.now() - entry.timestamp < TTL;
}

function getPersisted(key: string): CacheEntry | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (!isFresh(entry)) {
      localStorage.removeItem(key);
      return null;
    }
    return entry;
  } catch {
    return null;
  }
}

function persist(key: string, entry: CacheEntry): void {
  try {
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

function deleteExpired(): void {
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!key?.startsWith(STORAGE_PREFIX)) continue;
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const entry = JSON.parse(raw) as CacheEntry;
        if (!isFresh(entry)) localStorage.removeItem(key);
      } catch {
        localStorage.removeItem(key);
      }
    }
  } catch {
    // localStorage unavailable
  }
}

deleteExpired();

export async function cachedFetch<T>(
  fetchFn: () => Promise<T>,
  query: string,
  params?: Record<string, unknown>,
): Promise<T> {
  const key = makeKey(query, params);

  const memEntry = memoryCache.get(key);
  if (memEntry && isFresh(memEntry)) {
    return memEntry.data as T;
  }

  const stored = getPersisted(key);
  if (stored) {
    memoryCache.set(key, stored);
    return stored.data as T;
  }

  const pending = pendingFetches.get(key);
  if (pending) return pending as Promise<T>;

  const promise = fetchFn().then((data) => {
    pendingFetches.delete(key);
    const entry: CacheEntry = { data, timestamp: Date.now() };
    memoryCache.set(key, entry);
    persist(key, entry);
    return data;
  });
  pendingFetches.set(key, promise);
  return promise;
}
