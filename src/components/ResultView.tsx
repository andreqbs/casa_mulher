import React from 'react';
import { motion } from 'motion/react';
import { RefreshCcw, Save, PhoneCall } from 'lucide-react';

interface ResultViewProps {
  score: number;
  onReset: () => void;
  onViewContacts: () => void;
}

export default function ResultView({ score, onReset, onViewContacts }: ResultViewProps) {
  let result = {
    title: "RELAÇÃO COM SINAIS DE ALERTA",
    shortTitle: "Relação Alerta",
    description: "Aqui, nem tudo parece errado. Mas algumas situações já chamam a sua atenção. Podem ser comentários que te incomodam, pequenas críticas, ciúmes ou momentos em que você sente que precisa se explicar mais do que gostaria. Ainda existe leveza, mas algo dentro de você já percebe que nem tudo está bem.",
    color: "text-green-500",
    needleRotation: -90
  };

  if (score >= 6 && score <= 12) {
    result = {
      title: "RELAÇÃO DESGASTANTE",
      shortTitle: "Relação Desgastante",
      description: "Nesse ponto, o que antes era pontual começa a se repetir. Você pode se sentir mais insegura, confusa ou \"pisando em ovos\". Talvez comece a evitar conflitos, se adaptar mais do que gostaria ou até duvidar de si mesma. A relação passa a ocupar mais energia do que deveria. E, aos poucos, você pode começar a se afastar de quem você era.",
      color: "text-yellow-500",
      needleRotation: 0
    };
  } else if (score >= 13 && score <= 17) {
    result = {
      title: "RELAÇÃO AGRESSIVA",
      shortTitle: "Relação Agressiva",
      description: "Aqui, os limites já foram ultrapassados. As atitudes deixam de ser apenas desconfortáveis e passam a ferir — emocional ou fisicamente. Podem existir humilhações, ameaças, controle ou agressões. Mesmo assim, é comum que exista confusão: momentos bons misturados com momentos difíceis. Mas é importante reconhecer: isso já é violência.",
      color: "text-brand-purple",
      needleRotation: 70
    };
  } else if (score >= 18) {
    result = {
      title: "RELAÇÃO DE ALTO RISCO",
      shortTitle: "Relação de Alto Risco",
      description: "Neste estágio, a sua segurança pode estar em risco. O medo pode estar presente, seja pela reação da outra pessoa ou pela possibilidade de algo mais grave acontecer. Você pode sentir que não tem saída ou que precisa tomar muito cuidado com cada passo. Aqui, buscar ajuda não é só importante — é necessário.",
      color: "text-red-500",
      needleRotation: 120
    };
  }

  return (
    <div className="px-6 py-4 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-brand-purple">Seu Resultado</h2>
        <p className="text-slate-500 text-sm">
          Este é um indicativo baseado nas suas respostas. Lembre-se: você não está sozinha.
        </p>
      </div>

      {/* Main Result Card */}
      <div className="bg-brand-purple-light/50 rounded-[32px] p-6 space-y-8">
        
        <div className="flex flex-col items-center pt-4">
          <div className="relative w-48 h-24 overflow-visible flex justify-center">
            <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
              {/* Background track */}
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e2e8f0" strokeWidth="24" strokeLinecap="round" />
              {/* Yellow: Left */}
              <path d="M 20 100 A 80 80 0 0 1 60 30" fill="none" stroke="#22c55e" strokeWidth="24" strokeLinecap="round" />
              {/* Purple: Middle */}
              <path d="M 60 30 A 80 80 0 0 1 140 30" fill="none" stroke="#eab308" strokeWidth="24" />
              {/* Green: Right */}
              <path d="M 140 30 A 80 80 0 0 1 180 100" fill="none" stroke="#8b76ad" strokeWidth="24" strokeLinecap="round" />
              {/* Black: Right */}
              <path d="M 178 80 A 80 80 0 0 1 180 100" fill="none" stroke="#FF0000" strokeWidth="24" strokeLinecap="round" />

              {/* Needle */}
              <motion.g 
                initial={{ rotate: -90 }}
                animate={{ rotate: result.needleRotation }}
                transition={{ type: "spring", damping: 12 }}
                style={{ transformOrigin: "100px 100px" }}
              >
                <line x1="100" y1="100" x2="100" y2="20" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
                <circle cx="100" cy="100" r="8" fill="#334155" />
                <circle cx="100" cy="100" r="3" fill="#ffffff" />
              </motion.g>
            </svg>
          </div>
          <span className={`font-bold mt-6 text-lg ${result.color}`}>
            {result.shortTitle}
          </span>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 px-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
            <span className="text-[10px] font-bold text-slate-700">Relação Sinais de alerta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 shrink-0" />
            <span className="text-[10px] font-bold text-slate-700">Relação Desgastante</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-purple shrink-0" />
            <span className="text-[10px] font-bold text-slate-700">Relação Agressiva</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
            <span className="text-[10px] font-bold text-slate-700">Relação de Alto Risco</span>
          </div>
        </div>

        {/* Result Details Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-brand-purple space-y-3">
          <h3 className="font-bold text-sm text-slate-900">{result.title}</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {result.description}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button 
            onClick={onViewContacts}
            className="w-full bg-brand-purple text-white font-bold py-4 rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all text-sm"
          >
            <PhoneCall className="w-4 h-4" /> Entender mais
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onReset}
              className="bg-brand-purple-light text-brand-purple font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-xs"
            >
              <RefreshCcw className="w-4 h-4" /> Refazer
            </button>
            <button className="bg-slate-200/50 text-slate-600 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-xs">
              <Save className="w-4 h-4" /> Compartilhar
            </button>
          </div>
        </div>
      </div>

      {/* Why it matters */}
      <div className="bg-slate-50 rounded-3xl p-6 flex gap-4 items-center border border-slate-100">
        <div className="flex-1 space-y-2">
          <h4 className="font-bold text-brand-purple text-sm">Por que isso importa?</h4>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            O ciclo da violência muitas vezes começa com comportamentos sutis. Reconhecer o estágio em que você se encontra ajuda a prevenir situações de maior perigo e a buscar o tipo certo de orientação.
          </p>
        </div>
        <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm">
          <img 
            src="https://picsum.photos/seed/care/200/200" 
            alt="Care" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
