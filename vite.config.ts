import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        // Proxy para Flora API: evita CORS no dev. Token fica server-side, nunca no bundle.
        '/flora-api': {
          target: env.FLORA_API_URL || 'https://flora3.hooy.com.br/api/v1',
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/flora-api/, ''),
          headers: {
            Authorization: `Bearer ${env.FLORA_API_TOKEN || ''}`,
          },
        },
      },
    },
  };
});
