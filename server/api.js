import { findHop, getDestinations, getHopById, getHops } from './catalog.js'
import { getRates } from './rates.js'

export const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
}

/**
 * Route an API request. Shared by the Vite dev middleware and the Netlify
 * function so both environments serve identical responses.
 *
 * @param {URL} url
 * @param {string} method
 * @returns {Promise<{ status: number, body: unknown }>}
 */
export async function handleApi(url, method = 'GET') {
  if (method !== 'GET') {
    return { status: 405, body: { error: 'Method not allowed' } }
  }

  const path = normalisePath(url.pathname)

  if (path === '/api/rates') {
    try {
      return { status: 200, body: await getRates() }
    } catch {
      return { status: 503, body: { error: 'Rates unavailable' } }
    }
  }

  if (path === '/api/destinations') {
    return { status: 200, body: getDestinations() }
  }

  const destinationMatch = path.match(/^\/api\/destinations\/([^/]+)$/)
  if (destinationMatch) {
    const id = decodeURIComponent(destinationMatch[1])
    const item = getDestinations().find((place) => place.id === id)
    if (!item) return { status: 404, body: { error: 'Destination not found' } }
    return { status: 200, body: item }
  }

  if (path === '/api/hops') {
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')
    if (from || to) {
      const hop = findHop(from, to)
      if (!hop) return { status: 404, body: { error: 'Hop not found' } }
      return { status: 200, body: hop }
    }
    return { status: 200, body: getHops() }
  }

  const hopMatch = path.match(/^\/api\/hops\/([^/]+)$/)
  if (hopMatch) {
    const hop = getHopById(decodeURIComponent(hopMatch[1]))
    if (!hop) return { status: 404, body: { error: 'Hop not found' } }
    return { status: 200, body: hop }
  }

  return { status: 404, body: { error: 'Not found' } }
}

export function isApiPath(pathname) {
  return normalisePath(pathname).startsWith('/api/')
}

// Accept `/api/...` directly and `/.netlify/functions/api/...` when the
// function is invoked via its internal URL; strip trailing slashes.
function normalisePath(pathname) {
  let path = pathname.replace(/\/+$/, '')
  const internal = '/.netlify/functions/api'
  if (path === internal || path.startsWith(`${internal}/`)) {
    path = `/api${path.slice(internal.length)}`
  }
  return path
}

function send(res, status, body) {
  res.statusCode = status
  for (const [key, value] of Object.entries(JSON_HEADERS)) {
    res.setHeader(key, value)
  }
  res.end(JSON.stringify(body))
}

export function apiMiddleware(req, res, next) {
  const host = req.headers.host || 'localhost'
  const url = new URL(req.url, `http://${host}`)
  if (!isApiPath(url.pathname)) {
    next()
    return
  }

  handleApi(url, req.method)
    .then(({ status, body }) => send(res, status, body))
    .catch(() => send(res, 500, { error: 'Internal error' }))
}
