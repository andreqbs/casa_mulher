import React from 'react';
import FloraChat from '@/src/app/flora/chat';
import ChatkitChat from '@/src/app/flora/chatkitChat';
import OpenAINativeChat from '@/src/app/flora/openaiNativeChat';

interface FloraViewProps {
  onBack: () => void;
}

export default function FloraView({ onBack }: FloraViewProps) {
  const provider = __APP_CHAT_PROVIDER__;

  return (
    // h-full para preencher o <main> do Layout (que tem flex-1)
    <div className="flex-1 flex flex-col min-h-0">
      {provider === 'chatkit' ? (
        <ChatkitChat onBack={onBack} />
      ) : provider === 'openai-native' ? (
        <OpenAINativeChat onBack={onBack} />
      ) : (
        <FloraChat onBack={onBack} />
      )}
    </div>
  );
}
