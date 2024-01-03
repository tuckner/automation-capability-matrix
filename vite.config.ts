import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslint from 'vite-plugin-eslint'

export default defineConfig(() => {
  const config = {
    base: process.env.BASE_URL || "/automation-capability-matrix/",
    server: {
      port: 3000,
    },
    plugins: [
      tsconfigPaths(),
      react(),
      eslint({ cache: false})
    ]
  };

  return config;
});