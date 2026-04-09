import React from 'react';
import { motion } from 'motion/react';
import { Play, Volume2, MessageCircle, Download, LogOut } from 'lucide-react';

export default function EducationView() {
  const handleFastExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="px-6 py-4 space-y-8 animate-in fade-in duration-500 relative">
      {/* Fast Exit Floating Button */}
      <button 
        onClick={handleFastExit}
        className="fixed right-4 top-24 z-30 bg-white shadow-lg border border-slate-100 rounded-full px-4 py-2 flex items-center gap-2 text-brand-purple font-bold text-xs active:scale-95 transition-all"
      >
        <LogOut className="w-4 h-4" /> Sair Rápido
      </button>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-brand-purple leading-tight">
          O Ciclo da Violência: Identificar para Transformar
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Entender os padrões de comportamento é o primeiro passo para encontrar a sua força e recuperar sua liberdade. Você não está sozinha nesta jornada.
        </p>
      </div>

      {/* Audio Player */}
      <div className="bg-slate-50 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-slate-600">
          <Volume2 className="w-4 h-4" />
          <span className="text-xs font-bold">Ouça este conteúdo</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center text-white shadow-md">
            <Play className="w-4 h-4 fill-current ml-1" />
          </button>
          <div className="flex-1 h-1.5 bg-slate-200 rounded-full relative">
            <div className="absolute left-0 top-0 h-full w-1/3 bg-brand-purple rounded-full" />
          </div>
          <span className="text-[10px] text-slate-400 font-mono">04:20 / 12:45</span>
        </div>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed italic">
        O ciclo da violência, identificado pela psicóloga Lenore Walker, é um padrão de comportamento que se repete em relacionamentos abusivos, tornando cada vez mais difícil para a mulher identificar o perigo real. Conhecer essas fases é um ato de coragem e autodefesa.
      </p>

      {/* Stages List - Updated to 3 stages as per new image */}
      <div className="space-y-4">
        {[
          {
            id: 1,
            title: "Aumento da Tensão",
            desc: "Nesta fase inicial, o agressor demonstra irritabilidade por motivos fúteis. Há uma atmosfera de \"pisar em ovos\", onde a mulher tenta prever e evitar conflitos a todo custo, muitas vezes sentindo-se culpada por algo que não fez. As agressões são verbais e psicológicas, criando um clima de medo constante.",
            color: "bg-brand-yellow/30",
            borderColor: "border-brand-yellow",
            icon: "⚡"
          },
          {
            id: 2,
            title: "Explosão da Violência",
            desc: "A tensão acumulada explode em atos de violência física, verbal, emocional ou sexual. É o momento em que o agressor perde o controle e descarrega sua raiva. A mulher pode sentir paralisia, medo extremo e uma profunda sensação de isolamento, enquanto o dano se torna visível ou profundamente sentido.",
            color: "bg-brand-purple-light",
            borderColor: "border-brand-purple",
            icon: "▲"
          },
          {
            id: 3,
            title: "Lua de Mel (Reconciliação)",
            desc: "O agressor se mostra arrependido, pede perdão, traz presentes e promete que \"isso nunca mais vai acontecer\". É a fase da esperança ilusória, onde a mulher acredita que o parceiro mudou e que o amor pode curar a relação. No entanto, sem intervenção, o ciclo invariavelmente volta para a fase de tensão.",
            color: "bg-brand-green/30",
            borderColor: "border-brand-green",
            icon: "♥"
          }
        ].map((stage) => (
          <motion.div 
            key={stage.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`${stage.color} p-6 rounded-[32px] border-l-4 ${stage.borderColor} space-y-3`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{stage.icon}</span>
              <h3 className="font-bold text-slate-800">{stage.id}. {stage.title}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{stage.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Video Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-brand-purple">Vídeo Explicativo</h3>
        <div className="relative rounded-3xl overflow-hidden aspect-video shadow-lg group cursor-pointer">
          <img 
            src="https://picsum.photos/seed/video-guide/800/450" 
            alt="Video Thumbnail" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-brand-purple fill-current ml-1" />
            </div>
          </div>
          <div className="absolute bottom-4 left-6 text-white font-bold text-sm drop-shadow-md">
            Entendendo os Sinais: Um Guia Prático
          </div>
        </div>
      </div>

      {/* Footer Card - Updated as per new image */}
      <div className="bg-brand-purple/60 rounded-[40px] p-8 text-center text-white space-y-6 shadow-xl backdrop-blur-sm">
        <h3 className="text-2xl font-bold">Você merece viver em paz.</h3>
        <p className="text-sm opacity-90">
          Se você se identificou com essas fases, saiba que existem caminhos seguros para sair desse ciclo. Estamos aqui para te apoiar.
        </p>
        
        <div className="flex flex-col gap-3">
          <button className="bg-white text-brand-purple px-8 py-4 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" /> Conversar Agora
          </button>
          <button className="bg-white/20 hover:bg-white/30 text-white border border-white/40 px-8 py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2">
            <Download className="w-5 h-5" /> Baixar Guia de Segurança
          </button>
        </div>
      </div>
    </div>
  );
}
