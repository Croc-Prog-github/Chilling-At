import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    server: isDev
      ? {
          proxy: {
            '/api/quote': {
              target: 'https://zenquotes.io/api/today',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api\/quote/, ''),
            },
          },
        }
      : undefined,
  };
});