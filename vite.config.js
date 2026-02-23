import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'drei': ['@react-three/drei'],
          'fiber': ['@react-three/fiber'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})
