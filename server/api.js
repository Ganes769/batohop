import { findHop, getDestinations, getHopById, getHops } from './catalog.js'
import { getRates } from './rates.js'

function send(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

export function apiMiddleware(req, res, next) {
  const host = req.headers.host || 'localhost'
  const url = new URL(req.url, `http://${host}`)
  if (!url.pathname.startsWith('/api/')) {
    next()
    return
  }

  if (req.method !== 'GET') {
    send(res, 405, { error: 'Method not allowed' })
    return
  }

  const path = url.pathname.replace(/\/$/, '')

  if (path === '/api/rates') {
    getRates()
      .then((rates) => send(res, 200, rates))
      .catch(() => send(res, 503, { error: 'Rates unavailable' }))
    return
  }

  if (path === '/api/destinations') {
    send(res, 200, getDestinations())
    return
  }

  const destinationMatch = path.match(/^\/api\/destinations\/([^/]+)$/)
  if (destinationMatch) {
    const item = getDestinations().find((place) => place.id === destinationMatch[1])
    if (!item) {
      send(res, 404, { error: 'Destination not found' })
      return
    }
    send(res, 200, item)
    return
  }

  if (path === '/api/hops') {
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')
    if (from || to) {
      const hop = findHop(from, to)
      if (!hop) {
        send(res, 404, { error: 'Hop not found' })
        return
      }
      send(res, 200, hop)
      return
    }
    send(res, 200, getHops())
    return
  }

  const hopMatch = path.match(/^\/api\/hops\/([^/]+)$/)
  if (hopMatch) {
    const hop = getHopById(decodeURIComponent(hopMatch[1]))
    if (!hop) {
      send(res, 404, { error: 'Hop not found' })
      return
    }
    send(res, 200, hop)
    return
  }

  send(res, 404, { error: 'Not found' })
}
