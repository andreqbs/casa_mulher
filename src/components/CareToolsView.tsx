import React from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Wind, Sparkles, PenTool, ArrowRight } from 'lucide-react';

interface Tool {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  action?: () => void;
}

interface CareToolsViewProps {
  onNavigate?: (view: string) => void;
}

export default function CareToolsView({ onNavigate }: CareToolsViewProps) {
  const tools: Tool[] = [
    {
      title: "Treinar",
      desc: "Práticas rápidas para acalmar a mente e se sentir mais segura no momento",
      icon: <Dumbbell className="w-6 h-6 text-brand-purple" />,
      color: "bg-brand-purple-light/50",
      action: () => onNavigate?.('checkin'),
    },
    {
      title: "Acalmar",
      desc: "Respire com a gente e reduza a tensão em poucos minutos.",
      icon: <Wind className="w-6 h-6 text-green-600" />,
      color: "bg-brand-green/20",
      action: () => onNavigate?.('breath'),
    },
    {
      title: "Minhas Experiências",
      desc: "Escreva com orientação e perceba ciclos que você pode estar repetindo e caminhos possíveis para sair deles.",
      icon: <Sparkles className="w-6 h-6 text-orange-500" />,
      color: "bg-brand-yellow/20",
      action: () => onNavigate?.('experiencias'),
    },
    {
      title: "Diário",
      desc: "Veja seus registros e perceba, aos poucos o que está mudando dentro de você.",
      icon: <PenTool className="w-6 h-6 text-slate-600" />,
      color: "bg-slate-100",
      action: () => onNavigate?.('diario'),
    },
  ];

  return (
    <div className="px-6 py-4 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-brand-purple leading-tight">
          Um momento para você, em um lugar seguro.
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Explore ferramentas desenhadas para trazer calma e reconexão. Siga o seu próprio ritmo, sem pressa.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => tool.action?.()}
            className={`${tool.color} p-8 rounded-[40px] relative group cursor-pointer overflow-hidden`}
          >
            <div className="space-y-4 relative z-10">
              <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm">
                {tool.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800">{tool.title}</h3>
              <p className="text-sm text-slate-500 max-w-[80%]">{tool.desc}</p>
            </div>
            <ArrowRight className="absolute bottom-8 right-8 w-6 h-6 text-slate-300 group-hover:text-brand-purple transition-colors" />
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
          </motion.div>
        ))}
      </div>

      <div className="text-center pt-8">
        <p className="text-slate-400 text-[16px] italic">
          “Você é a sua maior prioridade.”
        </p>
      </div>
    </div>
  );
}
