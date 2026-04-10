import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export interface ExperienciaData {
  textContent: string;
  pensamento: string;
  sentimento: string;
  reacao: string;
}

interface ExperienciaAprendizadoProps {
  data: ExperienciaData;
  onConcluir: (aprendizado: string) => void;
  onSkip: () => void;
}

const SUMMARY_ITEMS = [
  { label: 'FATO', key: 'textContent' as const, bg: '#FFC9BB', num: '1' },
  { label: 'PENSEI', key: 'pensamento' as const, bg: '#F98F74', num: '2' },
  { label: 'SENTI', key: 'sentimento' as const, bg: '#F96C48', num: '3' },
  { label: 'REAGI', key: 'reacao' as const, bg: '#F34B21', num: '4' },
];

export default function ExperienciaAprendizado({
  data,
  onConcluir,
  onSkip,
}: ExperienciaAprendizadoProps) {
  const [aprendizado, setAprendizado] = useState('');

  return (
    <div className="px-6 pb-8 space-y-4">
      {/* Header */}
      <div className="flex flex-col items-center text-center border-t-2 border-t-[#f34b21] mt-5 py-4">
        <h1 className="text-xl font-bold text-[#f34b21] leading-none uppercase">
          Construindo consciência
        </h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map(n => (
          <div
            key={n}
            className={`w-2 h-2 rounded-full ${n <= 4 ? 'bg-[#f34b21]' : 'bg-slate-200'}`}
          />
        ))}
      </div>

      {/* Summary cards */}
      <div className="space-y-2">
        {SUMMARY_ITEMS.map(({ label, key, bg, num }) => (
          <div key={key} className="flex items-start gap-3">
            {/* Number badge */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
              style={{ backgroundColor: '#f34b21' }}
            >
              {num}
            </div>
            {/* Content */}
            <div
              className="flex-1 rounded-2xl px-4 py-3 text-white text-sm font-semibold"
              style={{ backgroundColor: bg }}
            >
              {label === 'FATO' ? data[key] : `${label}: ${data[key]}`}
            </div>
          </div>
        ))}
      </div>

      {/* Reflection prompt */}
      <p className="text-sm text-slate-500 italic text-center">
        Agora que você revisou o que escreveu sobre seus pensamentos, sentimentos e reações, o que
        isso revela sobre como você costuma agir em situações semelhantes? Há algo que você gostaria
        de mudar ou fazer diferente no futuro?
      </p>

      {/* Textarea */}
      <textarea
        value={aprendizado}
        onChange={e => setAprendizado(e.target.value)}
        placeholder="Sugestão de início: lendo meus pensamentos, sentimentos e reações reconheço que..."
        rows={5}
        className="w-full border-2 border-[#f34b21] rounded-2xl p-3 text-sm text-[#f34b21] placeholder-[#f34b21]/40 outline-none resize-none"
      />

      {/* Conclude button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => onConcluir(aprendizado)}
        className="w-full bg-[#f34b21] text-white font-bold py-3 rounded-full text-sm"
      >
        CONCLUIR MINHAS EXPERIÊNCIAS
      </motion.button>

      {/* Skip */}
      <div className="flex justify-end items-center pb-2">
        <button
          onClick={onSkip}
          className="text-[#f34b21] text-sm font-semibold flex items-center gap-1"
        >
          NÃO VOU ESCREVER HOJE
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
