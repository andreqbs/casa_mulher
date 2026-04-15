import React from 'react';
import FloraChat from '@/src/app/flora/chat';
import ChatkitChat from '@/src/app/flora/chatkitChat';

interface FloraViewProps {
  onBack: () => void;
}

export default function FloraView({ onBack }: FloraViewProps) {
  const useChatkit = __APP_CHAT_PROVIDER__ === 'chatkit';

  return (
    // h-full para preencher o <main> do Layout (que tem flex-1)
    <div className="flex-1 flex flex-col min-h-0">
      {useChatkit ? (
        <ChatkitChat onBack={onBack} />
      ) : (
        <FloraChat onBack={onBack} />
      )}
    </div>
  );
}
