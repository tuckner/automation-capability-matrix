import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  server: {
    base: "/automation-capability-matrix/",
  },
  plugins: [
    tsconfigPaths(),
    react(),
    eslint({ cache: false})
  ]
})
