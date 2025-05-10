import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api/quote': {
        target: 'https://zenquotes.io/api/today',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/quote/, ''),
      },
    },
  },
});