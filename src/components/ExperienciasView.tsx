import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import InicioFatos from '@/src/app/fatos/InicioFatos';
import ExperienciaStep, { StepConfig } from '@/src/app/fatos/ExperienciaStep';
import ExperienciaAprendizado, { ExperienciaData } from '@/src/app/fatos/ExperienciaAprendizado';
import ExperienciaResultado from '@/src/app/fatos/ExperienciaResultado';
import ExperienciaHistorico, { saveExperiencia } from '@/src/app/fatos/ExperienciaHistorico';
import { dicasPensamento, dicasEmocoes, dicasReacoes } from '@/src/app/fatos/data/dicasContent';

type Screen =
  | 'inicio'
  | 'step1'
  | 'step2'
  | 'step3'
  | 'step4'
  | 'resultado'
  | 'historico';

interface ExperienciasViewProps {
  onBack: () => void;
}

const SLIDE_VARIANTS = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
};

const STEP_CONFIGS: Record<'step1' | 'step2' | 'step3', StepConfig> = {
  step1: {
    stepNumber: 1,
    label: 'Pensamento',
    title: 'Foque no seu PENSAMENTO',
    description:
      'Pensamentos são as interpretações que damos às situações, e muitas vezes surgem de maneira automática. Identificá-los é o primeiro passo para entender como eles influenciam suas emoções e comportamentos.',
    prompt: 'Anote o que passou pela sua mente quando isso aconteceu',
    placeholder: 'O que você pensou?',
    dicas: dicasPensamento,
  },
  step2: {
    stepNumber: 2,
    label: 'Sentimento',
    title: 'Foque na SENSAÇÃO INTERNA',
    description:
      'Sentimentos são as respostas emocionais que surgem dentro de nós diante dos pensamentos e da situação. Reconhecer e nomear essas emoções e sensações ajuda a entender a intensidade e o impacto que elas têm sobre você.',
    prompt:
      'Perceba como está a sua cabeça, garganta, coração, estômago, braços e pernas; como se você pudesse escanear o corpo por dentro…',
    placeholder: 'O que você sentiu?',
    dicas: dicasEmocoes,
  },
  step3: {
    stepNumber: 3,
    label: 'Reação',
    title: 'Foque na REAÇÃO EXTERNA',
    description:
      'Ações são as coisas que fazemos sem pensar muito, como uma reação rápida ao que sentimos ou pensamos. Elas acontecem de forma automática, quase como um reflexo, baseadas no que está passando pela nossa mente naquele momento.',
    prompt: 'Quais foram suas ações imediatas após pensar e sentir dessa forma',
    placeholder: 'Como você reagiu?',
    dicas: dicasReacoes,
  },
};

export default function ExperienciasView({ onBack }: ExperienciasViewProps) {
  const [screen, setScreen] = useState<Screen>('inicio');
  const [direction, setDirection] = useState(1);

  // Accumulated form data
  const [textoFato, setTextoFato] = useState('');
  const [pensamento, setPensamento] = useState('');
  const [sentimento, setSentimento] = useState('');
  const [reacao, setReacao] = useState('');

  const navigate = (next: Screen) => {
    setDirection(1);
    setScreen(next);
  };

  const goBack = (prev: Screen) => {
    setDirection(-1);
    setScreen(prev);
  };

  // ── handlers ────────────────────────────────────────────
  const handleCriarFato = (texto: string) => {
    setTextoFato(texto);
    navigate('step1');
  };

  const handleStep1 = (resp: string) => {
    setPensamento(resp);
    navigate('step2');
  };

  const handleStep2 = (resp: string) => {
    setSentimento(resp);
    navigate('step3');
  };

  const handleStep3 = (resp: string) => {
    setReacao(resp);
    navigate('step4');
  };

  const handleConcluir = (aprendizado: string) => {
    const experiencia = {
      id: `exp-${Date.now()}`,
      textContent: textoFato,
      pensamento,
      sentimento,
      reacao,
      aprendizado,
      createdAt: new Date().toISOString(),
    };
    saveExperiencia(experiencia);
    navigate('resultado');
  };

  const resetFlow = () => {
    setTextoFato('');
    setPensamento('');
    setSentimento('');
    setReacao('');
    setScreen('inicio');
  };

  // ── render ───────────────────────────────────────────────
  const renderScreen = () => {
    switch (screen) {
      case 'inicio':
        return (
          <InicioFatos
            onCriar={handleCriarFato}
            onHistorico={() => navigate('historico')}
          />
        );

      case 'step1':
        return (
          <ExperienciaStep
            config={STEP_CONFIGS.step1}
            experienciaTexto={textoFato}
            onNext={handleStep1}
            onSkip={() => handleStep1('')}
          />
        );

      case 'step2':
        return (
          <ExperienciaStep
            config={STEP_CONFIGS.step2}
            experienciaTexto={textoFato}
            onNext={handleStep2}
            onSkip={() => handleStep2('')}
          />
        );

      case 'step3':
        return (
          <ExperienciaStep
            config={STEP_CONFIGS.step3}
            experienciaTexto={textoFato}
            onNext={handleStep3}
            onSkip={() => handleStep3('')}
          />
        );

      case 'step4': {
        const data: ExperienciaData = { textContent: textoFato, pensamento, sentimento, reacao };
        return (
          <ExperienciaAprendizado
            data={data}
            onConcluir={handleConcluir}
            onSkip={() => handleConcluir('')}
          />
        );
      }

      case 'resultado':
        return (
          <ExperienciaResultado
            onFechar={onBack}
            onVerHistorico={() => navigate('historico')}
          />
        );

      case 'historico':
        return <ExperienciaHistorico onBack={resetFlow} />;

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={screen}
            variants={SLIDE_VARIANTS}
            initial={{ x: direction * 60, opacity: 0 }}
            animate="center"
            exit={{ x: direction * -60, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
