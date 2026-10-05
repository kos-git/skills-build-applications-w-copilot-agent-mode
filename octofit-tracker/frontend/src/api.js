export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  return []
}

export async function fetchCollection(endpoint, { signal } = {}) {
  const response = await fetch(endpoint, {
    headers: { Accept: 'application/json' },
    signal,
  })
  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(payload?.detail || `Request failed (${response.status})`)
  }

  return normalizeCollection(payload)
}