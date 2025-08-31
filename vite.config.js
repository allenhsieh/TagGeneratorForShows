import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/TagGeneratorForShows/',
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000,
    open: true
  }
})