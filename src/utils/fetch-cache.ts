const cache = new Map<string, Promise<unknown>>()

export function cachedFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const existing = cache.get(key)
  if (existing) {
    return existing as Promise<T>
  }

  const request = fetcher()
  cache.set(key, request)

  request.catch(() => {
    cache.delete(key)
  })

  return request
}
