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
    define: {
      // Injetados em build-time — nenhum segredo é exposto no bundle.
      __APP_CHAT_PROVIDER__: JSON.stringify(
        ['chatkit', 'openai-native', 'flora'].includes(env.DEFAULT_API_PROVIDER)
          ? env.DEFAULT_API_PROVIDER
          : 'flora',
      ),
      __CHATKIT_WORKFLOW_ID__: JSON.stringify(env.CHATKIT_WORKFLOW_ID || ''),
      __CHATKIT_MODEL__: JSON.stringify(env.CHATKIT_MODEL || 'gpt-4o-mini'),
      __CHATKIT_INSTRUCTIONS__: JSON.stringify(env.CHATKIT_INSTRUCTIONS || ''),
      __API_PROVIDER_DEBUG__: JSON.stringify(env.DEFAULT_API_PROVIDER_DEBUG === 'true'),
      // Provider openai-native — chama a Responses API diretamente via SSE.
      // O comportamento do agente é definido via OPENAI_NATIVE_INSTRUCTIONS no .env.
      __OPENAI_NATIVE_MODEL__: JSON.stringify(env.OPENAI_NATIVE_MODEL || env.CHATKIT_MODEL || 'gpt-4o'),
      __OPENAI_NATIVE_INSTRUCTIONS__: JSON.stringify(env.OPENAI_NATIVE_INSTRUCTIONS || env.CHATKIT_INSTRUCTIONS || ''),
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
        // Proxy para OpenAI Chat Completions: API key fica server-side.
        '/openai-api': {
          target: 'https://api.openai.com/v1',
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/openai-api/, ''),
          headers: {
            Authorization: `Bearer ${env.CHATKIT_OPENAI_API_KEY || ''}`,
          },
        },
        // Proxy para ChatKit Sessions (Agent Builder): API key fica server-side.
        '/chatkit-api': {
          target: 'https://api.openai.com/v1/chatkit',
          changeOrigin: true,
          secure: true,
          rewrite: (p) => p.replace(/^\/chatkit-api/, ''),
          headers: {
            Authorization: `Bearer ${env.CHATKIT_OPENAI_API_KEY || ''}`,
            'OpenAI-Beta': 'chatkit_beta=v1',
          },
        },
      },
    },
  };
});
