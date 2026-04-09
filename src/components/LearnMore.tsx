import React from 'react';
import { motion } from 'motion/react';
import { Play, ChevronRight, Leaf, TriangleAlert, Angry, Flame, Siren } from 'lucide-react';

interface LearnMoreProps {
  onBack?: () => void;
}

export default function LearnMore({ onBack }: LearnMoreProps) {
  return (
    <div className="px-6 py-4 space-y-8 animate-in fade-in duration-500 pb-24">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-brand-purple leading-tight">
          Estágios do relacionamento
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Nem todo relacionamento começa difícil.<br/>
          Na maioria das vezes, ele vai mudando aos poucos.<br/>
          O que no início parecia leve, com o tempo pode começar a gerar desconforto, dúvida e até sofrimento.<br/>
          Por isso, entender como você está se sentindo dentro da relação é um dos caminhos mais importantes para enxergar o que está acontecendo.<br/>
          Abaixo, você pode reconhecer alguns estágios que muitas mulheres vivenciam:
        </p>
      </div>

      {/* Audio Player */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-purple-light flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-brand-purple rounded-full animate-pulse" />
              <div className="w-1 h-4 bg-brand-purple rounded-full animate-pulse delay-75" />
              <div className="w-1 h-2 bg-brand-purple rounded-full animate-pulse delay-150" />
            </div>
          </div>
          <span className="font-bold text-sm text-slate-800">Ouça este conteúdo</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 rounded-full bg-brand-purple text-white flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-transform">
            <Play className="w-5 h-5 ml-1" fill="currentColor" />
          </button>
          <div className="flex-1 space-y-2">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-brand-purple rounded-full" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>04:20</span>
              <span>12:45</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed">
        O ciclo da violência, identificado pela psicóloga Lenore Walker, é um padrão de comportamento que se repete em relacionamentos abusivos, tornando cada vez mais difícil para a mulher identificar o perigo real. Conhecer essas fases é um ato de coragem e autodefesa.
      </p>

      {/* Stages */}
      <div className="space-y-4">
        {/* Stage 1 */}
        <div className="bg-yellow-50/50 rounded-[32px] p-6 border-l-4 border-yellow-400 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-sm">
              <TriangleAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">1. Relação com sinais de alerta</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Aqui, nem tudo parece errado. Mas algumas situações já chamam a sua atenção. Podem ser comentários que te incomodam, pequenas críticas, ciúmes ou momentos em que você sente que precisa se explicar mais do que gostaria. Ainda existe leveza, mas algo dentro de você já percebe que nem tudo está bem.
          </p>
        </div>

        <div className="bg-brand-purple-light/30 rounded-[32px] p-6 border-l-4 border-brand-purple space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple font-bold text-sm">
              <Angry className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">2. Relação Desgastante</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nesse ponto, o que antes era pontual começa a se repetir. Você pode se sentir mais insegura, confusa ou "pisando em ovos". Talvez comece a evitar conflitos, se adaptar mais do que gostaria ou até duvidar de si mesma. A relação passa a ocupar mais energia do que deveria. E, aos poucos, você pode começar a se afastar de quem você era.
          </p>
        </div>

        <div className="bg-green-50/50 rounded-[32px] p-6 border-l-4 border-green-500 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">3. Relação Agressiva</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Aqui, os limites já foram ultrapassados. As atitudes deixam de ser apenas desconfortáveis e passam a ferir — emocional ou fisicamente. Podem existir humilhações, ameaças, controle ou agressões. Mesmo assim, é comum que exista confusão: momentos bons misturados com momentos difíceis. Mas é importante reconhecer: isso já é violência.
          </p>
        </div>

        <div className="bg-orange-50/50 rounded-[32px] p-6 border-l-4 border-orange-400 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                <Siren className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">4. Relação de Alto Risco</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Neste estágio, a sua segurança pode estar em risco. O medo pode estar presente, seja pela reação da outra pessoa ou pela possibilidade de algo mais grave acontecer. Você pode sentir que não tem saída ou que precisa tomar muito cuidado com cada passo. Aqui, buscar ajuda não é só importante — é necessário.
          </p>
        </div>
      </div>

      {/* Video Section */}
      <div className="space-y-4">
        <h3 className="font-bold text-brand-purple text-lg">Vídeo Explicativo</h3>
        <div className="relative rounded-3xl overflow-hidden aspect-video bg-slate-900 shadow-md">
          <img 
            src="https://picsum.photos/seed/video2/800/450" 
            alt="Video thumbnail" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <Play className="w-6 h-6 text-brand-purple ml-1" fill="currentColor" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-bold text-sm drop-shadow-md">Entendendo os Sinais: Um Guia Prático</p>
          </div>
        </div>
      </div>

      {/* Info Block */}
      <div className="bg-slate-50 rounded-[32px] p-6 space-y-6 border border-slate-100">
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>
            Você não precisa passar por isso sozinha. Aqui dentro, você encontra apoio de diferentes formas. Existem programas que ajudam na sua profissionalização, no apoio com os filhos e, principalmente, no seu desenvolvimento emocional — para que você consiga se fortalecer e fazer escolhas com mais clareza.
          </p>
          <p>
            No botão <strong>'Pra você'</strong>, você pode voltar todos os dias para se escutar. O autoconhecimento não resolve tudo de uma vez, mas te devolve algo essencial: consciência sobre o que você sente, pensa e faz. E isso muda a forma como você vive qualquer relação.
          </p>
          <p>
            Se precisar de ajuda imediata, o botão <strong>SOS Mulher</strong> está disponível para você entrar em contato com a polícia, com apoio emocional ou pedir ajuda com segurança. Na tela inicial, você também encontra conteúdos no blog e pode conversar com a <strong>Flora</strong>, uma assistente que te escuta sem julgamento e te ajuda a organizar o que você está sentindo — no seu tempo.
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-brand-purple font-bold">
            <Leaf className="w-5 h-5" />
            <h4>Onde fizer mais sentido pra você?</h4>
          </div>
          <p className="text-xs text-slate-600">Você não precisa fazer tudo agora. Mas pode começar por algo.</p>
          
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex gap-2">
              <span>👉</span> Se quiser entender melhor o que está vivendo, explore os conteúdos
            </li>
            <li className="flex gap-2">
              <span>👉</span> Se quiser se fortalecer, vá para o 'Para Você'
            </li>
            <li className="flex gap-2">
              <span>👉</span> Se precisar de ajuda agora, use o SOS
            </li>
          </ul>
          
          <p className="text-xs text-brand-purple font-medium italic pt-2">
            Só de estar aqui... você já começou. 💛
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-br from-brand-purple to-[#7a659c] rounded-[32px] p-8 text-center space-y-6 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 space-y-3">
          <h2 className="text-2xl font-bold text-white">Você merece viver em paz.</h2>
          <p className="text-white/90 text-sm leading-relaxed px-2">
            Se você se identificou com essas fases, saiba que existem caminhos seguros para sair desse ciclo. Estamos aqui para te apoiar.
          </p>
        </div>
        
        <button className="relative z-10 border-2 border-white/30 bg-white/10 text-white font-bold py-3 px-8 rounded-full text-sm hover:bg-white/20 transition-colors backdrop-blur-sm">
          Começar por aqui
        </button>
      </div>
    </div>
  );
}
