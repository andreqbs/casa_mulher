import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    score: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Como essa pessoa costuma se comunicar com você?",
    options: [
      { id: 'A', text: "Me respeita, mas às vezes faz comentários que me deixam desconfortável", score: 1 },
      { id: 'B', text: "Faz piadas, me critica ou me diminui com frequência", score: 2 },
      { id: 'C', text: "Me xinga, me humilha ou me faz sentir inferior", score: 3 },
      { id: 'D', text: "Me ameaça ou me assusta de alguma forma.", score: 4 }
    ]
  },
  {
    id: 2,
    text: "Como você se sente na maior parte do tempo nessa relação?",
    options: [
      { id: 'A', text: "Geralmente bem, mas com alguns incômodos", score: 1 },
      { id: 'B', text: "Confusa, insegura ou “pisando em ovos”", score: 2 },
      { id: 'C', text: "Com medo, ansiedade ou tensão constante", score: 3 },
      { id: 'D', text: "Com medo real de algo pior acontecer.", score: 4 }
    ]
  },
  {
    id: 3,
    text: "Como você se sente em relação à forma como seu parceiro(a) monitora suas atividades diárias e contatos?",
    options: [
      { id: 'A', text: "Ele(a) respeita meu espaço e raramente pergunta onde estou.", score: 1 },
      { id: 'B', text: "Faz perguntas constantes e demonstra ciúmes de amigos ou familiares.", score: 2 },
      { id: 'C', text: "Exige minhas senhas, olha meu celular escondido e me proíbe de ver certas pessoas.", score: 3 },
      { id: 'D', text: "Me isolou completamente, controla minhas finanças e me impede de sair de casa sozinha.", score: 4 }
    ]
  },
  {
    id: 4,
    text: "Já houve algum tipo de agressão física ou ameaça?",
    options: [
      { id: 'A', text: "Nunca", score: 0 },
      { id: 'B', text: "Já aconteceu algo leve (empurrão, brincadeiras agressivas)", score: 2 },
      { id: 'C', text: "Já aconteceu agressão física ou ameaça direta", score: 3 },
      { id: 'D', text: "Sim, e isso acontece ou pode acontecer novamente.", score: 4 }
    ]
  },
  {
    id: 5,
    text: "Se você pensa em se afastar, o que acontece?",
    options: [
      { id: 'A', text: "Nunca pensei nisso", score: 0 },
      { id: 'B', text: "Fico em dúvida, mas acho que conseguiria", score: 2 },
      { id: 'C', text: "Tenho medo da reação dessa pessoa", score: 3 },
      { id: 'D', text: "Sinto que não posso sair ou que algo ruim pode acontecer.", score: 4 }
    ]
  }
];

interface QuizViewProps {
  onComplete: (totalScore: number) => void;
  onCancel: () => void;
}

export default function QuizView({ onComplete, onCancel }: QuizViewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  const handleSelect = (score: number) => {
    setAnswers({ ...answers, [currentStep]: score });
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
      onComplete(totalScore);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onCancel();
    }
  };

  return (
    <div className="px-6 py-4 flex flex-col h-full animate-in fade-in duration-500">
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Questionário</span>
            <h2 className="text-2xl font-bold text-slate-800">Questão {currentStep + 1}/{questions.length}</h2>
          </div>
          <span className="text-brand-purple font-bold">{Math.round(progress)}%</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-brand-purple"
          />
        </div>

        {/* Info Box */}
        <div className="bg-brand-yellow/20 border border-brand-yellow/30 p-4 rounded-2xl">
          <p className="text-xs text-slate-600 italic text-center">
            "Responda com a opção que mais se aproxima do que você vive HOJE."
          </p>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6"
          >
            <h3 className="text-lg font-bold text-slate-800 leading-tight">
              {currentQuestion.id}. {currentQuestion.text}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.score)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                    answers[currentStep] === option.score
                      ? "border-brand-purple bg-brand-purple-light/30"
                      : "border-slate-100 bg-slate-50 hover:border-slate-200"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    answers[currentStep] === option.score
                      ? "bg-brand-purple text-white"
                      : "bg-white text-slate-400 border border-slate-100"
                  }`}>
                    {option.id}
                  </div>
                  <span className="text-sm text-slate-700 flex-1">{option.text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-auto pt-8 flex justify-between items-center">
        <button 
          onClick={prevStep}
          className="flex items-center gap-2 text-slate-400 font-bold text-sm px-4 py-2"
        >
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>

        <button 
          onClick={nextStep}
          disabled={answers[currentStep] === undefined}
          className={`flex items-center gap-2 font-bold text-sm px-8 py-3 rounded-full shadow-lg transition-all ${
            answers[currentStep] !== undefined
              ? currentStep === questions.length - 1 
                ? "bg-green-600 text-white" 
                : "bg-brand-purple text-white"
              : "bg-slate-100 text-slate-300 cursor-not-allowed"
          }`}
        >
          {currentStep === questions.length - 1 ? (
            <>Finalizar <CheckCircle2 className="w-4 h-4" /></>
          ) : (
            <>Próximo <ChevronRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
}
