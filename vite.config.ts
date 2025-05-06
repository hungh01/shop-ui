import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080, // 🔧 Đổi thành port bạn muốn
    //open: true  // Mở trình duyệt tự động khi chạy `npm run dev`
    hmr: true, // Hot Module Replacement
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // alias @ -> /src
    },
  },
})
