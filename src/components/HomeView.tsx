import React from 'react';
import {motion} from 'motion/react';
import {Play, ChevronRight, MessageCircle, Video, Users} from 'lucide-react';
import mulherImg from '../assets/mulher.png';

interface HomeViewProps {
    onStartQuiz: () => void;
    onViewJuliana: () => void;
    onLearnMore?: () => void;
}

export default function HomeView({onStartQuiz, onViewJuliana, onLearnMore}: HomeViewProps) {
    return (
        <div className="px-6 space-y-8 animate-in fade-in duration-500">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="bg-brand-purple-light rounded-3xl p-8 relative overflow-hidden"
            >
                <div className="relative z-10 space-y-4">
                    <h2 className="text-2xl font-bold text-brand-purple leading-tight">
                        Saiba se você está no ciclo da violência
                    </h2>
                    <p className="text-slate-600 text-sm">
                        Identificar os sinais é o primeiro passo para a liberdade. Entenda as fases do ciclo e como
                        buscar ajuda.
                    </p>
                    <button
                        onClick={onStartQuiz}
                        className="bg-brand-purple text-white px-8 py-3 rounded-full font-semibold text-sm hover:bg-opacity-90 transition-all shadow-md active:scale-95"
                    >
                        Começar
                    </button>
                </div>
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-brand-purple/10 rounded-full blur-2xl"/>
            </motion.div>

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.1}}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex"
            >
                <div className="w-1/3 min-h-[160px]">
                    <img
                        src={mulherImg}
                        alt="Madalena"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                    />
                </div>
                <div className="w-2/3 p-5 flex flex-col justify-center space-y-2">
                    <h3 className="font-bold text-slate-800">Conheça a história da vida de Madalena</h3>
                    <p className="text-xs text-slate-500 line-clamp-3">
                        Uma jornada de coragem, superação e o recomeço em um ambiente de paz. Inspiração para o seu
                        próprio
                        caminho.
                    </p>
                    <button
                        onClick={() => window.open('https://revistaesquinas.casperlibero.edu.br/cotidiano/historias-de-superacao-a-vida-depois-da-violencia-domestica/', '_blank')}
                        className="text-brand-purple text-xs font-bold flex items-center gap-1 hover:underline"
                    >
                        Ler história completa <ChevronRight className="w-3 h-3"/>
                    </button>
                </div>
            </motion.div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-800">Cuidado especializado</h2>

                <div className="grid grid-cols-2 gap-4">
                    <motion.div
                        whileTap={{scale: 0.98}}
                        onClick={() => window.open('https://www.youtube.com', '_blank')}
                        className="bg-brand-purple-light/50 p-5 rounded-3xl space-y-3 flex flex-col cursor-pointer"
                    >
                        <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
                            <Video className="w-5 h-5 text-brand-purple"/>
                        </div>
                        <h4 className="font-bold text-sm text-slate-800 leading-tight">Acompanhe o conteúdo para
                            descobrir se está
                            em um relacionamento tóxico</h4>
                        <p className="text-[10px] text-slate-500">Este conteúdo te ajuda a entender o que está
                            acontecendo e como
                            sair disso com mais segurança.</p>
                    </motion.div>

                    <motion.div
                        whileTap={{scale: 0.98}}
                        className="bg-brand-green/30 p-5 rounded-3xl space-y-3 flex flex-col"
                    >
                        <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
                            <MessageCircle className="w-5 h-5 text-green-600"/>
                        </div>
                        <h4 className="font-bold text-sm text-slate-800">Chat Anônimo</h4>
                        <p className="text-[10px] text-slate-500">Converse com a Flora (Agente IA) em tempo real sem
                            precisar se
                            identificar. Privacidade total.</p>
                        <button className="bg-green-600 text-white text-[10px] font-bold py-2 px-4 rounded-full mt-auto"
                                onClick={() => window.open('https://hooy.com.br', '_blank')}
                        >
                            Iniciar Conversa
                        </button>
                    </motion.div>
                </div>

                <motion.div
                    whileTap={{scale: 0.98}}
                    className="bg-brand-yellow/30 p-6 rounded-3xl flex flex-col space-y-3"
                >
                    <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
                        <Users className="w-5 h-5 text-green-600"/>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800">Grupo de Apoio</h4>
                    <p className="text-xs text-slate-600 font-medium">
                        Conecte-se com outras mulheres em um ambiente mediado por profissionais.
                    </p>
                    <button
                        className="bg-yellow-300 text-orange-500 border border-brand-yellow text-xs font-bold py-2 px-8 rounded-full shadow-sm">
                        Ver Agenda
                    </button>
                </motion.div>
            </div>
        </div>
    );
}