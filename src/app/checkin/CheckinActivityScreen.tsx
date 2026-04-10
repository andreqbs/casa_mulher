import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import type { CheckinContentWeb, AnimationType } from './data/checkinContentWeb';

// ─────────────────────────────────────────────
// Animação: RESPIRAÇÃO (4 fases — box breathing)
// ─────────────────────────────────────────────
const BREATH_PHASES = [
  { label: 'Inspire',  sub: 'devagar, pelo nariz', duration: 4, expanded: true  },
  { label: 'Segure',   sub: 'o ar dentro',         duration: 4, expanded: true  },
  { label: 'Expire',   sub: 'devagar, pela boca',  duration: 4, expanded: false },
  { label: 'Descanse', sub: 'antes do próximo',    duration: 4, expanded: false },
];

function BreathAnim({ color, onDone }: { color: string; onDone: () => void }) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secs, setSecs]         = useState(BREATH_PHASES[0].duration);
  const [done, setDone]         = useState(false);
  const ref = useRef({ phaseIdx: 0, secs: BREATH_PHASES[0].duration, cycles: 0 });

  useEffect(() => {
    const iv = setInterval(() => {
      const s = ref.current;
      const next = s.secs - 1;
      if (next > 0) { s.secs = next; setSecs(next); return; }

      const nextP = s.phaseIdx + 1;
      if (nextP < BREATH_PHASES.length) {
        s.phaseIdx = nextP; s.secs = BREATH_PHASES[nextP].duration;
        setPhaseIdx(nextP); setSecs(BREATH_PHASES[nextP].duration);
        return;
      }
      s.cycles++; s.phaseIdx = 0; s.secs = BREATH_PHASES[0].duration;
      setPhaseIdx(0); setSecs(BREATH_PHASES[0].duration);
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const phase  = BREATH_PHASES[phaseIdx];
  const scale  = phase.expanded ? 1.65 : 1;
  const prog   = 1 - secs / phase.duration;
  const R      = 118;
  const circum = 2 * Math.PI * R;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>
        <motion.div animate={{ scale, opacity: phase.expanded ? 0.25 : 0.1 }}
          transition={{ duration: phase.duration, ease: 'easeInOut' }}
          className="absolute w-56 h-56 rounded-full bg-green-400" />
        <motion.div animate={{ scale, opacity: phase.expanded ? 0.45 : 0.2 }}
          transition={{ duration: phase.duration, ease: 'easeInOut' }}
          className="absolute w-44 h-44 rounded-full bg-green-400" />
        <motion.div animate={{ scale }}
          transition={{ duration: phase.duration, ease: 'easeInOut' }}
          className="absolute w-32 h-32 rounded-full bg-green-500/70" />
        <div className="relative z-10 w-20 h-20 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
          <span className="text-white text-3xl font-bold tabular-nums">{secs}</span>
        </div>
        <svg className="absolute inset-0 -rotate-90" width="260" height="260" viewBox="0 0 260 260">
          <circle cx="130" cy="130" r={R} fill="none" stroke="#bbf7d0" strokeWidth="3" />
          <circle cx="130" cy="130" r={R} fill="none" stroke="#16a34a" strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circum}
            strokeDashoffset={circum * (1 - prog)}
            className="transition-all duration-1000 ease-linear" />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={phaseIdx}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
          className="text-center space-y-1">
          <p className="text-2xl font-bold text-green-900">{phase.label}</p>
          <p className="text-sm text-green-600">{phase.sub}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────
// Animação: TIMER (contagem regressiva)
// ─────────────────────────────────────────────
function TimerAnim({ duration, color, onDone }: { duration: number; color: string; onDone: () => void }) {
  const [secs, setSecs] = useState(duration);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setSecs(prev => {
        if (prev <= 1) { clearInterval(iv); setDone(true); onDone(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [duration, onDone]);

  const mins   = Math.floor(secs / 60);
  const secPad = String(secs % 60).padStart(2, '0');
  const R      = 100;
  const circum = 2 * Math.PI * R;
  const prog   = secs / duration;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center" style={{ width: 240, height: 240 }}>
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.15, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-48 h-48 rounded-full bg-violet-300"
        />
        <div className="relative z-10 w-32 h-32 rounded-full bg-violet-600 flex flex-col items-center justify-center shadow-lg">
          {done ? (
            <CheckCircle className="w-10 h-10 text-white" />
          ) : (
            <>
              <span className="text-white text-3xl font-bold tabular-nums leading-none">
                {mins}:{secPad}
              </span>
              <span className="text-violet-200 text-xs mt-0.5">restante</span>
            </>
          )}
        </div>
        <svg className="absolute inset-0 -rotate-90" width="240" height="240" viewBox="0 0 240 240">
          <circle cx="120" cy="120" r={R} fill="none" stroke="#ddd6fe" strokeWidth="4" />
          <circle cx="120" cy="120" r={R} fill="none" stroke="#7c3aed" strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circum}
            strokeDashoffset={circum * (1 - prog)}
            className="transition-all duration-1000 ease-linear" />
        </svg>
      </div>

      <p className="text-violet-700 text-sm font-medium text-center">
        {done ? 'Concluído ✓' : 'Permaneça presente…'}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Animação: PULSE (respiração suave / atenção plena)
// ─────────────────────────────────────────────
function PulseAnim({ color }: { color: string }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center" style={{ width: 240, height: 240 }}>
        {/* Anel pulsante lento */}
        <motion.div
          animate={{ scale: [1, 1.35, 1], opacity: [0.15, 0.05, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-52 h-52 rounded-full bg-current opacity-10"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.15, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute w-40 h-40 rounded-full bg-current opacity-20"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="w-28 h-28 rounded-full bg-white/70 shadow-lg flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: [0.9, 1, 0.9], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-16 h-16 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-400').replace('-500', '-400')} opacity-70`}
          />
        </motion.div>
      </div>
      <p className="text-slate-500 text-sm font-medium text-center">
        Permaneça presente e atento…
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Tela principal de atividade
// ─────────────────────────────────────────────
interface CheckinActivityScreenProps {
  content: CheckinContentWeb;
  onNext: () => void;
}

export default function CheckinActivityScreen({ content, onNext }: CheckinActivityScreenProps) {
  const [started, setStarted]   = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const { animationType, title, hint, duration } = content.activity;

  const btnLabel = !started
    ? 'INICIAR'
    : timerDone
    ? 'FEITO, PRÓXIMA ETAPA ›'
    : 'FEITO, PRÓXIMA ETAPA ›';

  return (
    <div className={`flex flex-col min-h-full ${content.bgColor} px-6 py-8`}>

      {/* Título da atividade */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 space-y-2"
      >
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          Atividade
        </p>
        <h2 className={`text-lg font-bold ${content.color} leading-snug`}>
          {title}
        </h2>
      </motion.div>

      {/* Área de animação */}
      <div className={`flex-1 flex items-center justify-center ${content.color}`}>
        {!started ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4 px-4"
          >
            <p className="text-slate-500 text-sm leading-relaxed">{hint}</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="anim"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {animationType === 'breath' && (
                <BreathAnim color={content.color} onDone={() => setTimerDone(true)} />
              )}
              {animationType === 'timer' && (
                <TimerAnim
                  duration={duration}
                  color={content.color}
                  onDone={() => setTimerDone(true)}
                />
              )}
              {animationType === 'pulse' && (
                <PulseAnim color={content.color} />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Botão */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          if (!started) { setStarted(true); return; }
          onNext();
        }}
        className="w-full py-4 mt-8 rounded-2xl bg-slate-800 text-white font-bold text-base tracking-wide shadow-md active:bg-slate-700 transition-colors"
      >
        {btnLabel}
      </motion.button>
    </div>
  );
}
