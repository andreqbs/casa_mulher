import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CHECKIN_CONTENT_WEB, getNextCheckinId } from '@/src/app/checkin/data/checkinContentWeb';
import CheckinStartScreen       from '@/src/app/checkin/CheckinStartScreen';
import CheckinActivityScreen    from '@/src/app/checkin/CheckinActivityScreen';
import CheckinJournalScreen     from '@/src/app/checkin/CheckinJournalScreen';
import CheckinConfirmationScreen from '@/src/app/checkin/CheckinConfirmationScreen';

type Screen = 'start' | 'activity' | 'journal' | 'confirmation';

interface CheckinViewProps {
  onBack: () => void;
}

const SLIDE_VARIANTS = {
  enter:  { opacity: 0, x: 40  },
  center: { opacity: 1, x: 0   },
  exit:   { opacity: 0, x: -40 },
};

export default function CheckinView({ onBack }: CheckinViewProps) {
  // Seleciona o checkin ID ao montar (avança o ciclo em localStorage)
  const [checkinId]  = useState<number>(() => getNextCheckinId());
  const [screen, setScreen] = useState<Screen>('start');

  const content = CHECKIN_CONTENT_WEB[checkinId];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        variants={SLIDE_VARIANTS}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="min-h-full"
      >
        {screen === 'start' && (
          <CheckinStartScreen
            content={content}
            checkinId={checkinId}
            onStart={() => setScreen('activity')}
            onBack={onBack}
          />
        )}

        {screen === 'activity' && (
          <CheckinActivityScreen
            content={content}
            onNext={() => setScreen('journal')}
          />
        )}

        {screen === 'journal' && (
          <CheckinJournalScreen
            content={content}
            onComplete={(_text) => setScreen('confirmation')}
            onSkip={() => setScreen('confirmation')}
          />
        )}

        {screen === 'confirmation' && (
          <CheckinConfirmationScreen
            content={content}
            onClose={onBack}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
