import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = dirname(fileURLToPath(import.meta.url))

function load() {
  return {
    destinations: JSON.parse(
      readFileSync(join(dir, 'data/destinations.json'), 'utf8'),
    ),
    hops: JSON.parse(readFileSync(join(dir, 'data/hops.json'), 'utf8')),
  }
}

export function getDestinations() {
  return load().destinations
}

export function getHops() {
  return load().hops
}

export function placeName(id) {
  return getDestinations().find((item) => item.id === id)?.shortName ?? id
}

export function findHop(fromId, toId) {
  if (!fromId || !toId || fromId === toId) return null
  const hops = getHops()
  const direct = hops.find((hop) => hop.from === fromId && hop.to === toId)
  if (direct) return direct
  const reverse = hops.find((hop) => hop.from === toId && hop.to === fromId)
  if (!reverse) return null
  return {
    ...reverse,
    id: `${reverse.id}-return`,
    from: fromId,
    to: toId,
    title: `${placeName(fromId)} → ${placeName(toId)}`,
    reversed: true,
    alongTheWay: [...reverse.alongTheWay].reverse(),
    summary: `Return hop of ${reverse.title}. Same modes and sample prices, other direction. ${reverse.summary}`,
  }
}

export function getHopById(id) {
  const hops = getHops()
  const stored = hops.find((hop) => hop.id === id)
  if (stored) return stored
  if (!id.endsWith('-return')) return null
  const baseId = id.replace(/-return$/, '')
  const base = hops.find((hop) => hop.id === baseId)
  if (!base) return null
  return findHop(base.to, base.from)
}
