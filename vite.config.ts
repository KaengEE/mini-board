import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // 실제 API 서버의 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // 요청 경로에서 '/api' 제거
      },
    },
  },
});
