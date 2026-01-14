import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/photography-portfolio/', 
  build: {
    chunkSizeWarningLimit: 1600, 
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor modules into separate chunks
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor_three';
            }
            if (id.includes('framer-motion')) {
              return 'vendor_animation';
            }
            return 'vendor'; 
          }
        },
      },
    },
  },
})