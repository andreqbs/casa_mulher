import React from 'react';
import { motion } from 'motion/react';
import {
  Wind, Pause, Waves, Heart, ScanLine, Ear, HeartPulse,
  Leaf, Smile, Hand, Cloud, Eye, Mic, Brain, ChevronLeft,
} from 'lucide-react';
import type { CheckinContentWeb } from './data/checkinContentWeb';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Wind, Pause, Waves, Heart, ScanLine, Ear, HeartPulse,
  Leaf, Smile, Hand, Cloud, Eye, Mic, Brain,
};

interface CheckinStartScreenProps {
  content: CheckinContentWeb;
  checkinId: number;
  onStart: () => void;
  onBack: () => void;
}

export default function CheckinStartScreen({ content, checkinId, onStart, onBack }: CheckinStartScreenProps) {
  const Icon = ICON_MAP[content.iconName] ?? Wind;

  return (
    <div className={`flex flex-col flex-1 ${content.bgColor} px-6 py-4`}>

      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-slate-500 text-sm font-medium mb-6 w-fit"
      >
        <ChevronLeft className="w-4 h-4" />
        Voltar
      </button>

      {/* Badge de progresso */}
      <div className="flex justify-end mb-2">
        <span className="text-xs font-semibold text-slate-400 bg-white/60 px-3 py-1 rounded-full">
          {checkinId} / 16
        </span>
      </div>

      {/* Ilustração */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex justify-center my-10"
      >
        <div className="w-40 h-40 rounded-full bg-white/60 shadow-inner flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
            <Icon className={`w-14 h-14 ${content.color} opacity-85`} />
          </div>
        </div>
      </motion.div>

      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 flex flex-col justify-center text-center space-y-3"
      >
        <h2 className="text-2xl font-bold text-slate-800 leading-snug whitespace-pre-line">
          {content.start.title}
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          {content.activity.hint}
        </p>
      </motion.div>

      {/* Botão */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="w-full py-4 mt-10 rounded-2xl bg-slate-800 text-white font-bold text-base tracking-wide shadow-md active:bg-slate-700 transition-colors"
      >
        COMEÇAR
      </motion.button>
    </div>
  );
}
