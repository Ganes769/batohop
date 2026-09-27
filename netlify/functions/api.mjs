import { JSON_HEADERS, handleApi } from '../../server/api.js'

// Serves the same /api routes as the Vite dev middleware, but as a Netlify
// Function so the deployed static site still has a backend.
export default async function handler(request) {
  const url = new URL(request.url)
  const { status, body } = await handleApi(url, request.method)
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS })
}

export const config = {
  path: ['/api', '/api/*'],
}
