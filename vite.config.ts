import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './Client/src'),
      '@client': path.resolve(__dirname, './Client/src'),
      '@barber': path.resolve(__dirname, './Barber/src'),
      '@components': path.resolve(__dirname, './Client/src/components'),
      '@context': path.resolve(__dirname, './Client/src/context'),
      '@data': path.resolve(__dirname, './Client/src/data'),
      '@types': path.resolve(__dirname, './Client/src/types'),
      '@utils': path.resolve(__dirname, './Client/src/utils'),
      '@pages': path.resolve(__dirname, './Client/src/pages'),
    },
  },
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
})
