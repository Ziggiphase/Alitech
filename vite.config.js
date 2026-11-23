import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// The site talks to Firebase. For automated testing only, VITE_MOCK_BACKEND=1 swaps in
// an in-browser stand-in so nothing touches the real database.
const useMock = process.env.VITE_MOCK_BACKEND === '1'
const backendDir = fileURLToPath(new URL(`./src/lib/backend/${useMock ? 'mock' : 'firebase'}`, import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@backend': backendDir },
  },
  server: {
    port: 5173,
    open: true
  }
})
