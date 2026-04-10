import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle } from 'lucide-react';

interface Phase {
  label: string;
  subLabel: string;
  duration: number; // seconds
  expanded: boolean; // true = circle expands, false = contracts
}

const PHASES: Phase[] = [
  { label: 'Inspire',  subLabel: 'devagar, pelo nariz', duration: 4, expanded: true  },
  { label: 'Segure',   subLabel: 'o ar dentro',         duration: 4, expanded: true  },
  { label: 'Expire',   subLabel: 'devagar, pela boca',  duration: 4, expanded: false },
  { label: 'Descanse', subLabel: 'antes do próximo',    duration: 4, expanded: false },
];

interface BreathActivityScreenProps {
  cycles: number;
  onStop: () => void;
}

export default function BreathActivityScreen({ cycles, onStop }: BreathActivityScreenProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].duration);
  const [cyclesDone, setCyclesDone] = useState(0);
  const [finished, setFinished] = useState(false);

  // Refs to keep mutable state inside the interval without re-creating it
  const stateRef = useRef({ phaseIndex: 0, secondsLeft: PHASES[0].duration, cyclesDone: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const s = stateRef.current;
      const next = s.secondsLeft - 1;

      if (next > 0) {
        s.secondsLeft = next;
        setSecondsLeft(next);
        return;
      }

      // Advance phase
      const nextPhase = s.phaseIndex + 1;

      if (nextPhase < PHASES.length) {
        s.phaseIndex = nextPhase;
        s.secondsLeft = PHASES[nextPhase].duration;
        setPhaseIndex(nextPhase);
        setSecondsLeft(PHASES[nextPhase].duration);
        return;
      }

      // Completed one full cycle
      const nextCycles = s.cyclesDone + 1;
      s.cyclesDone = nextCycles;
      setCyclesDone(nextCycles);

      if (nextCycles >= cycles) {
        clearInterval(interval);
        setFinished(true);
        return;
      }

      // Reset to first phase
      s.phaseIndex = 0;
      s.secondsLeft = PHASES[0].duration;
      setPhaseIndex(0);
      setSecondsLeft(PHASES[0].duration);
    }, 1000);

    return () => clearInterval(interval);
  }, [cycles]);

  const currentPhase = PHASES[phaseIndex];
  const circleScale = currentPhase.expanded ? 1.65 : 1;
  const progress = 1 - (secondsLeft / currentPhase.duration);

  return (
    <div className="flex flex-col items-center justify-between flex-1 bg-green-50 px-6 py-8">

      {/* Cycle progress */}
      <div className="w-full text-center">
        <p className="text-green-700 text-sm font-semibold tracking-wide">
          {finished
            ? 'Sessão concluída'
            : `Ciclo ${Math.min(cyclesDone + 1, cycles)} de ${cycles}`}
        </p>

        {/* Cycle dots */}
        <div className="flex justify-center gap-2 mt-2">
          {Array.from({ length: cycles }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                i < cyclesDone
                  ? 'bg-green-500'
                  : i === cyclesDone && !finished
                  ? 'bg-green-300'
                  : 'bg-green-100'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Breathing circles */}
      <div className="relative flex items-center justify-center my-8" style={{ width: 260, height: 260 }}>

        {/* Outer ripple */}
        <motion.div
          animate={{ scale: circleScale, opacity: currentPhase.expanded ? 0.25 : 0.1 }}
          transition={{ duration: currentPhase.duration, ease: 'easeInOut' }}
          className="absolute w-56 h-56 rounded-full bg-green-400"
        />

        {/* Mid ring */}
        <motion.div
          animate={{ scale: circleScale, opacity: currentPhase.expanded ? 0.45 : 0.2 }}
          transition={{ duration: currentPhase.duration, ease: 'easeInOut' }}
          className="absolute w-44 h-44 rounded-full bg-green-400"
        />

        {/* Inner circle */}
        <motion.div
          animate={{ scale: circleScale }}
          transition={{ duration: currentPhase.duration, ease: 'easeInOut' }}
          className="absolute w-32 h-32 rounded-full bg-green-500/70"
        />

        {/* Core — countdown or check */}
        <div className="relative z-10 w-20 h-20 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
          {finished ? (
            <CheckCircle className="w-9 h-9 text-white" />
          ) : (
            <span className="text-white text-3xl font-bold tabular-nums">
              {secondsLeft}
            </span>
          )}
        </div>

        {/* Arc progress indicator */}
        <svg
          className="absolute inset-0 -rotate-90"
          width="260"
          height="260"
          viewBox="0 0 260 260"
        >
          <circle cx="130" cy="130" r="118" fill="none" stroke="#bbf7d0" strokeWidth="3" />
          <circle
            cx="130" cy="130" r="118"
            fill="none"
            stroke="#16a34a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 118}`}
            strokeDashoffset={`${2 * Math.PI * 118 * (1 - progress)}`}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
      </div>

      {/* Phase label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phaseIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-1 mb-8"
        >
          {finished ? (
            <p className="text-2xl font-bold text-green-800">Muito bem! 🌿</p>
          ) : (
            <>
              <p className="text-3xl font-bold text-green-900">{currentPhase.label}</p>
              <p className="text-sm text-green-600">{currentPhase.subLabel}</p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Stop / Done button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onStop}
        className={`w-full py-4 rounded-2xl font-bold text-base tracking-wide transition-colors ${
          finished
            ? 'bg-green-600 text-white shadow-md'
            : 'bg-white border-2 border-green-300 text-green-700'
        }`}
      >
        {finished ? 'Concluir' : 'Parar'}
      </motion.button>
    </div>
  );
}
