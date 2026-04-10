import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, BookOpen } from 'lucide-react';

interface ExperienciaResultadoProps {
  onFechar: () => void;
  onVerHistorico: () => void;
}

export default function ExperienciaResultado({
  onFechar,
  onVerHistorico,
}: ExperienciaResultadoProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center space-y-6">
      {/* Animated check */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 14, stiffness: 200 }}
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #f34b21 0%, #F37335 100%)' }}
      >
        <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
      </motion.div>

      {/* Celebration badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#f34b21]/10 px-4 py-1.5 rounded-full"
      >
        <span className="text-[#f34b21] text-sm font-bold">✨ Experiência concluída!</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <h2 className="text-2xl font-bold text-[#f34b21] leading-snug">
          Parabéns pela sua reflexão!
        </h2>
        <p className="text-sm text-slate-500 italic leading-relaxed">
          Você deu um passo importante para o seu autoconhecimento. Cada reflexão é uma semente que
          planta crescimento e consciência em você.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full space-y-3 pt-2"
      >
        <button
          onClick={onVerHistorico}
          className="w-full flex items-center justify-center gap-2 border-2 border-[#f34b21] text-[#f34b21] font-bold text-sm py-3 rounded-full hover:bg-[#f34b21]/5 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          Ver minhas experiências
        </button>

        <button
          onClick={onFechar}
          className="w-full bg-[#f34b21] text-white font-bold text-sm py-3 rounded-full"
        >
          Fechar
        </button>
      </motion.div>
    </div>
  );
}
