import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { apiMiddleware } from './server/api.js'

function baatohopApi() {
  return {
    name: 'baatohop-api',
    configureServer(server) {
      server.middlewares.use(apiMiddleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(apiMiddleware)
    },
  }
}

export default defineConfig({
  plugins: [react(), baatohopApi()],
  server: {
    host: true,
    port: 5173,
  },
})
