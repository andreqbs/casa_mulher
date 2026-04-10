import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import BreathScreen from '@/src/app/breath/index';
import BreathActivityScreen from '@/src/app/breath/breathActivity';

type InternalScreen = 'intro' | 'activity';

interface BreathViewProps {
  onBack: () => void;
}

export default function BreathView({ onBack }: BreathViewProps) {
  const [screen, setScreen] = useState<InternalScreen>('intro');
  const [cycles, setCycles] = useState(2);

  function handleStart(selectedCycles: number) {
    setCycles(selectedCycles);
    setScreen('activity');
  }

  function handleStop() {
    setScreen('intro');
  }

  return (
    <AnimatePresence mode="wait">
      {screen === 'intro' ? (
        <motion.div
          key="intro"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
        >
          <BreathScreen onStart={handleStart} onBack={onBack} />
        </motion.div>
      ) : (
        <motion.div
          key="activity"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.25 }}
        >
          <BreathActivityScreen cycles={cycles} onStop={handleStop} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
