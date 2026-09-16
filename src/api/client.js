const BASE = import.meta.env.VITE_API_BASE ?? '/api'

async function get(path) {
  const response = await fetch(`${BASE}${path}`)
  if (!response.ok) {
    const error = new Error(`API ${response.status} for ${path}`)
    error.status = response.status
    throw error
  }
  return response.json()
}

export const api = {
  destinations: () => get('/destinations'),
  destination: (id) => get(`/destinations/${id}`),
  hops: () => get('/hops'),
  hop: (id) => get(`/hops/${id}`),
  findHop: (from, to) =>
    get(`/hops?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`),
  rates: () => get('/rates'),
}
