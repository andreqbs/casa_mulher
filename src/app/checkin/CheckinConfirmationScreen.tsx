import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Sparkles } from 'lucide-react';
import type { CheckinContentWeb } from './data/checkinContentWeb';

interface CheckinConfirmationScreenProps {
  content: CheckinContentWeb;
  onClose: () => void;
}

export default function CheckinConfirmationScreen({ content, onClose }: CheckinConfirmationScreenProps) {
  return (
    <div className="flex flex-col flex-1 bg-gradient-to-b from-brand-purple to-violet-700 px-6 py-10">

      {/* Ícone de celebração */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="flex justify-center mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
      </motion.div>

      {/* Checkin ID + badge */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mb-6"
      >
        <div className="flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-white/80" />
          <span className="text-white/80 text-xs font-semibold tracking-wide">
            Prática {content.id} de 16 concluída
          </span>
        </div>
      </motion.div>

      {/* Mensagem de resultado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="flex-1 flex items-center justify-center"
      >
        <p className="text-white text-3xl font-bold text-center leading-snug whitespace-pre-line">
          {content.result}
        </p>
      </motion.div>

      {/* Botão fechar */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClose}
        className="w-full py-4 rounded-2xl bg-white text-brand-purple font-bold text-base tracking-wide shadow-lg active:bg-slate-100 transition-colors"
      >
        Fechar
      </motion.button>
    </div>
  );
}
