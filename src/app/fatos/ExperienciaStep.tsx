import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { DicaSlide } from './data/dicasContent';

export interface StepConfig {
  stepNumber: 1 | 2 | 3;
  label: string;
  title: string;
  description: string;
  prompt: string;
  placeholder: string;
  dicas: DicaSlide[];
}

interface ExperienciaStepProps {
  config: StepConfig;
  experienciaTexto: string;
  initialValue?: string;
  onNext: (resposta: string) => void;
  onSkip: () => void;
}

const STEP_EMOJIS = ['💭', '💚', '⚡'];

export default function ExperienciaStep({
  config,
  experienciaTexto,
  initialValue = '',
  onNext,
  onSkip,
}: ExperienciaStepProps) {
  const [resposta, setResposta] = useState(initialValue);
  const [showDicas, setShowDicas] = useState(false);
  const [dicaIdx, setDicaIdx] = useState(0);

  const emoji = STEP_EMOJIS[config.stepNumber - 1];

  return (
    <div className="px-6 pb-8 space-y-4">
      {/* Header */}
      <div className="flex flex-col items-center text-center border-t-2 border-t-[#f34b21] mt-5 py-4">
        <h1 className="text-xl font-bold text-[#f34b21] leading-none">Minhas Experiências</h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map(n => (
          <div
            key={n}
            className={`w-2 h-2 rounded-full transition-colors ${
              n === config.stepNumber ? 'bg-[#f34b21]' : n < config.stepNumber ? 'bg-[#f34b21]/40' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* Experience text */}
      <div className="bg-[#FFF3EE] rounded-2xl px-4 py-3">
        <p className="text-[#f34b21] font-semibold text-center text-sm leading-snug">
          {experienciaTexto}
        </p>
      </div>

      {/* Illustration */}
      <div className="flex justify-center py-2">
        <div className="w-16 h-16 rounded-full bg-[#f34b21]/10 flex items-center justify-center text-3xl">
          {emoji}
        </div>
      </div>

      {/* Focus label */}
      <p className="text-center font-bold text-[#f34b21]">{config.title}</p>

      {/* Description */}
      <p className="text-sm text-slate-500 italic text-center">{config.description}</p>

      {/* Prompt + dicas button */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-[#f34b21] italic flex-1">{config.prompt}</p>
        <button
          onClick={() => { setShowDicas(true); setDicaIdx(0); }}
          className="bg-[#f34b21] text-white text-xs font-bold px-4 py-1.5 rounded-full shrink-0"
        >
          dicas
        </button>
      </div>

      {/* Textarea */}
      <textarea
        value={resposta}
        onChange={e => setResposta(e.target.value)}
        placeholder={config.placeholder}
        rows={5}
        className="w-full border-2 border-[#f34b21] rounded-2xl p-3 text-sm text-[#f34b21] placeholder-[#f34b21]/40 outline-none resize-none"
      />

      {/* Primary button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => onNext(resposta)}
        className="w-full bg-[#f34b21] text-white font-bold py-3 rounded-full text-sm"
      >
        FEITO, PRÓXIMA ETAPA
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

      {/* Dicas modal */}
      <AnimatePresence>
        {showDicas && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDicas(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />

            <motion.div
              key="panel"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-xl max-w-md mx-auto"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
                <h3 className="font-bold text-[#f34b21]">
                  {config.dicas[dicaIdx]?.title}
                </h3>
                <button onClick={() => setShowDicas(false)}>
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Slide content */}
              <div className="px-6 py-4 min-h-[200px]">
                <ul className="space-y-2 text-sm text-slate-700">
                  {config.dicas[dicaIdx]?.items.map((item, i) => (
                    <li key={i} className={i === 0 && item.endsWith(':') ? 'font-bold' : ''}>
                      {i > 0 || !item.endsWith(':') ? `• ${item}` : item}
                    </li>
                  ))}
                </ul>
                {config.dicas[dicaIdx]?.note && (
                  <p className="text-xs text-slate-400 italic mt-4">
                    {config.dicas[dicaIdx].note}
                  </p>
                )}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 pb-6">
                <button
                  onClick={() => setDicaIdx(i => Math.max(0, i - 1))}
                  disabled={dicaIdx === 0}
                  className="p-2 rounded-full bg-slate-100 disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-1.5">
                  {config.dicas.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setDicaIdx(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === dicaIdx ? 'bg-[#f34b21]' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setDicaIdx(i => Math.min(config.dicas.length - 1, i + 1))}
                  disabled={dicaIdx === config.dicas.length - 1}
                  className="p-2 rounded-full bg-slate-100 disabled:opacity-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
