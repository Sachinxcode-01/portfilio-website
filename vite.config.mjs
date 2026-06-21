import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 👈 this fixes the blank page on deployment
  resolve: {
    alias: {
      // @/ maps to src/ — required for shadcn-style imports
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'd3': ['d3'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
  },
})
