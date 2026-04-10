import React from 'react';
import { motion } from 'motion/react';
import { Wind, ChevronLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface BreathScreenProps {
  onStart: (cycles: number) => void;
  onBack: () => void;
}

export default function BreathScreen({ onStart, onBack }: BreathScreenProps) {
  const [count, setCount] = React.useState(2);

  function handleCount(delta: number) {
    setCount(prev => Math.max(1, prev + delta));
  }

  return (
    <div className="flex flex-col min-h-full bg-green-50 px-6 py-4">

      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-green-700 text-sm font-medium mb-6 w-fit"
      >
        <ChevronLeft className="w-4 h-4" />
        Voltar
      </button>

      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex justify-center mb-8"
      >
        <div className="w-36 h-36 rounded-full bg-green-200/60 flex items-center justify-center shadow-inner">
          <div className="w-24 h-24 rounded-full bg-green-300/70 flex items-center justify-center">
            <Wind className="w-12 h-12 text-green-700 opacity-80" strokeWidth={1.5} />
          </div>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center space-y-3 mb-10"
      >
        <h2 className="text-2xl font-bold text-green-900 leading-snug">
          Respire.{'\n'}Seu corpo te guia{'\n'}quando a mente se perde.
        </h2>
        <p className="text-sm text-green-700 leading-relaxed">
          Sinta sua respiração como ela está nesse momento.{' '}
          Deixe o ar ir e vir no seu próprio ritmo.
        </p>
      </motion.div>

      {/* Cycle counter */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="bg-white rounded-3xl p-6 shadow-sm space-y-4 mb-8"
      >
        <p className="text-center text-sm text-slate-500 font-medium">
          Repita os ciclos quantas vezes achar necessário.
        </p>
        <div className="flex items-center justify-between max-w-[220px] mx-auto">
          <button
            onClick={() => handleCount(-1)}
            className={cn(
              'w-11 h-11 rounded-xl border-2 border-green-400 flex items-center justify-center',
              'text-green-700 text-xl font-bold active:scale-95 transition-transform',
              count <= 1 && 'opacity-40 cursor-not-allowed'
            )}
            disabled={count <= 1}
          >
            −
          </button>
          <span className="text-lg font-bold text-green-800">
            {count} ciclo{count > 1 ? 's' : ''}
          </span>
          <button
            onClick={() => handleCount(1)}
            className="w-11 h-11 rounded-xl border-2 border-green-400 flex items-center justify-center text-green-700 text-xl font-bold active:scale-95 transition-transform"
          >
            +
          </button>
        </div>
      </motion.div>

      {/* Start button */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onStart(count)}
        className="w-full py-4 rounded-2xl bg-green-600 text-white font-bold text-base tracking-wide shadow-md active:bg-green-700 transition-colors"
      >
        INICIAR
      </motion.button>
    </div>
  );
}
