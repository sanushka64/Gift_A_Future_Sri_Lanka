import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),       // ✅ React support
    tailwindcss()  // ✅ Tailwind support
  ],
  base: '/Gift-A-Future-Sri-Lanka/' // ✅ ensures images load on GitHub Pages
})
