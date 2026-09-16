const CACHE_MS = 60 * 60 * 1000
const FALLBACK = {
  usdToNpr: 133.5,
  gbpToNpr: 168.2,
  source: 'sample',
  updatedAt: new Date().toISOString(),
}

let cache = null

export async function getRates() {
  if (cache && Date.now() - cache.fetchedAt < CACHE_MS) {
    return cache.data
  }

  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD')
    if (!response.ok) throw new Error('Rate fetch failed')
    const payload = await response.json()
    const usdToNpr = payload.rates?.NPR
    const gbpPerUsd = payload.rates?.GBP
    if (!usdToNpr || !gbpPerUsd) throw new Error('NPR rate missing')

    const data = {
      usdToNpr,
      gbpToNpr: usdToNpr / gbpPerUsd,
      source: 'open.er-api.com',
      updatedAt: payload.time_last_update_utc ?? new Date().toISOString(),
    }
    cache = { fetchedAt: Date.now(), data }
    return data
  } catch {
    return { ...FALLBACK, updatedAt: new Date().toISOString() }
  }
}
