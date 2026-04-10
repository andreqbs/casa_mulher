import React from 'react';
import FloraChat from '@/src/app/flora/chat';

interface FloraViewProps {
  onBack: () => void;
}

export default function FloraView({ onBack }: FloraViewProps) {
  return (
    // h-full para preencher o <main> do Layout (que tem flex-1)
    <div className="h-full flex flex-col">
      <FloraChat onBack={onBack} />
    </div>
  );
}
