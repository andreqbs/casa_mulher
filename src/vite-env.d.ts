/// <reference types="vite/client" />

// Constantes injetadas em build-time pelo Vite (vite.config.ts → define).
declare const __APP_CHAT_PROVIDER__: 'chatkit' | 'flora' | 'openai-native';
declare const __CHATKIT_WORKFLOW_ID__: string;
declare const __CHATKIT_MODEL__: string;
declare const __CHATKIT_INSTRUCTIONS__: string;
declare const __API_PROVIDER_DEBUG__: boolean;

// Constantes para o provider openai-native
declare const __OPENAI_NATIVE_MODEL__: string;
declare const __OPENAI_NATIVE_INSTRUCTIONS__: string;

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}
