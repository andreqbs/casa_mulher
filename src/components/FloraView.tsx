import React from 'react';
import FloraChat from '@/src/app/flora/chat';

interface FloraViewProps {
  onBack: () => void;
}

export default function FloraView({ onBack }: FloraViewProps) {
  return (
    // h-full para preencher o <main> do Layout (que tem flex-1)
    <div className="flex-1 flex flex-col min-h-0">
      <FloraChat onBack={onBack} />
    </div>
  );
}
