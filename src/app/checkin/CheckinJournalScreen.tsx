import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PenLine } from 'lucide-react';
import type { CheckinContentWeb } from './data/checkinContentWeb';

interface CheckinJournalScreenProps {
  content: CheckinContentWeb;
  onComplete: (text: string) => void;
  onSkip: () => void;
}

export default function CheckinJournalScreen({ content, onComplete, onSkip }: CheckinJournalScreenProps) {
  const [text, setText] = useState('');

  return (
    <div className={`flex flex-col min-h-full ${content.bgColor} px-6 py-8`}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center mb-8 space-y-3"
      >
        <div className="w-12 h-12 rounded-2xl bg-white/70 flex items-center justify-center shadow-sm">
          <PenLine className={`w-6 h-6 ${content.color}`} />
        </div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Diário da prática
        </p>
        <h2 className="text-xl font-bold text-slate-800 leading-snug whitespace-pre-line">
          {content.journal.question}
        </h2>
      </motion.div>

      {/* Textarea */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex-1"
      >
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Escreva livremente, sem julgamentos…"
          rows={7}
          className="w-full p-4 rounded-3xl bg-white/80 shadow-sm text-slate-700 text-sm leading-relaxed
                     placeholder:text-slate-300 resize-none outline-none
                     focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 transition"
        />
      </motion.div>

      {/* Botões */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-6 space-y-3"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onComplete(text)}
          disabled={text.trim().length === 0}
          className="w-full py-4 rounded-2xl bg-slate-800 text-white font-bold text-base tracking-wide shadow-md
                     disabled:opacity-40 disabled:cursor-not-allowed active:bg-slate-700 transition-colors"
        >
          CONCLUIR
        </motion.button>

        <button
          onClick={onSkip}
          className="w-full py-3 text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors"
        >
          Não quero escrever agora
        </button>
      </motion.div>
    </div>
  );
}
