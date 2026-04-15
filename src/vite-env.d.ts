/// <reference types="vite/client" />

// Constantes injetadas em build-time pelo Vite (vite.config.ts → define).
declare const __APP_CHAT_PROVIDER__: 'chatkit' | 'flora';
declare const __CHATKIT_WORKFLOW_ID__: string;
declare const __CHATKIT_MODEL__: string;
declare const __CHATKIT_INSTRUCTIONS__: string;
declare const __CHATKIT_DEBUG__: boolean;

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
