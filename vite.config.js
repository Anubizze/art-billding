import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/art-billding/',
  server: {
    proxy: {
      '/api/send-mail': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/send-mail-simple.php': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
