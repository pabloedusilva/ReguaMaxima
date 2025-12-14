import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'
import { copyFileSync } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-sw',
      closeBundle() {
        // Copia o service worker para o dist após o build
        copyFileSync(
          path.resolve(__dirname, 'sw.js'),
          path.resolve(__dirname, 'dist/sw.js')
        )
      }
    }
  ],
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@barber': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5175,
    open: true
  },
  build: {
    outDir: 'dist',
  },
})
