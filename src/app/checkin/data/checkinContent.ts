import React from 'react';

import CheckinRespirar from '@/assets/icons/avatars/checkin-respirar.svg';
import CheckinSilencio from '@/assets/icons/avatars/checkin-silencio.svg';
import CheckinRio from '@/assets/icons/avatars/checkin-rio.svg';
import CheckinParar from '@/assets/icons/avatars/checkin-parar.svg';
import CheckinScanOlhosAbertos from '@/assets/icons/avatars/checkin-scan-olhos-abertos.svg';
import CheckinEscutar from '@/assets/icons/avatars/checkin-escutar.svg';
import CheckinCoracao from '@/assets/icons/avatars/checkin-coracao.svg';
import CheckinAromas from '@/assets/icons/avatars/checkin-aromas.svg';
import CheckinReviver from '@/assets/icons/avatars/checkin-reviver.svg';
import CheckinRespirar2 from '@/assets/icons/avatars/checkin-respirar2.svg';
import CheckinSinta from '@/assets/icons/avatars/checkin-sinta.svg';
import CheckinWatch from '@/assets/icons/avatars/checkin-watch.svg';
import CheckinFace from '@/assets/icons/avatars/checkin-face.svg';
import CheckinSearch from '@/assets/icons/avatars/checkin-search.svg';
import CheckinSound from '@/assets/icons/avatars/checkin-sound.svg';
import CheckinObserveThoughts from '@/assets/icons/avatars/checkin-observe-thoughts.svg';

import BreathTimerAnimation from '@/app/checkin/components/motion/BreathTimerAnimation';
import TimerAnimation from '@/app/checkin/components/motion/TimerAnimation';
import RiverAnimation from '@/app/checkin/components/motion/RiverAnimation';
import BreathAnimation from '@/app/checkin/components/motion/BreathAnimation';
import ScanAnimation from '@/app/checkin/components/motion/ScanAnimation';
import ListenAnimation from '@/app/checkin/components/motion/ListenAnimation';
import HeartAnimation from '@/app/checkin/components/motion/HeartAnimation';
import FragranceAnimation from '@/app/checkin/components/motion/FragranceAnimation';
import MemoryAnimation from '@/app/checkin/components/motion/MemoryAnimation';
import LungsAnimation from '@/app/checkin/components/motion/LungsAnimation';
import TouchAnimation from '@/app/checkin/components/motion/TouchAnimation';
import CloudsAnimation from '@/app/checkin/components/motion/CloudsAnimation';
import SmileAnimation from '@/app/checkin/components/motion/SmileAnimation';
import SoundsAnimation from '@/app/checkin/components/motion/SoundsAnimation';
import WatchThoughtsAnimation from '@/app/checkin/components/motion/WatchThoughtsAnimation';
import GlassAnimation from "@/app/checkin/components/motion/GlassAnimation";

export const AUDIO_FILES = {
    audiocheckin3: require('@/assets/asounds/checkin_3.mp3'),
    audiocheckin4: require('@/assets/asounds/checkin_4.mp3'),
    audiocheckin5: require('@/assets/asounds/checkin_5.mp3'),
    audiocheckin6: require('@/assets/asounds/checkin_6.mp3'),
    audiocheckin7: require('@/assets/asounds/checkin_7.mp3'),
    audiocheckin9: require('@/assets/asounds/checkin_9.mp3'),
    audiocheckin11: require('@/assets/asounds/checkin_11.mp3'),
    audiocheckin12: require('@/assets/asounds/checkin_12.mp3'),
    audiocheckin13: require('@/assets/asounds/checkin_13.mp3'),
    audiocheckin14: require('@/assets/asounds/checkin_14.mp3'),
    audiocheckin15: require('@/assets/asounds/checkin_15.mp3'),
    audiocheckin16: require('@/assets/asounds/checkin_16.mp3'),
};


export interface CheckinContent {
    id: number;
    start: {
        image: React.FC<any>;
        title: string;
    };
    activity: {
        title: string;
        motionComponent: React.FC<any>;
        audioSource?: keyof typeof AUDIO_FILES | null;
    };
    journal: {
        question: string;
    };
    summary: {
        practice: string;
        question: string;
    };
    final?: {
        message: string;
    };
}


export const CHECKIN_CONTENT_MAP: Record<number, CheckinContent> = {
    1: {
        id: 1,
        start: {
            image: CheckinRespirar,
            title: "Pausa rápida\npra respirar\ne se conectar.",
        },
        activity: {
            title: "Pausa rápida pra respirar e \nperceber como está\n o tempo ai dentro.",
            motionComponent: BreathTimerAnimation,
        },
        journal: {
            question: "Como está o tempo\naí dentro hoje?",
        },
        summary: {
            practice: "Inspire e Expire por 6 segundos.",
            question: "Como está o tempo aí dentro hoje?",
        },
    },
    2: {
        id: 2,
        start: {
            image: CheckinSilencio,
            title: "Hoje, te convido\na não fazer nada.\nSó estar.",
        },
        activity: {
            title: "Hoje, te convido a não fazer\nnada. Só estar.",
            motionComponent: TimerAnimation,
        },
        journal: {
            question: "O que apareceu\nno silêncio?",
        },
        summary: {
            practice: "Sente-se por 2 minutos em silêncio, sem música, sem distração.",
            question: "O que apareceu no silêncio?",
        },
    },
    3: {
        id: 3,
        start: {
            image: CheckinRio,
            title: "Feche os olhos\ne imagine seu corpo\ncomo um rio…",
        },
        activity: {
            title: "Feche os olhos e imagine\nseu corpo como um rio….",
            motionComponent: RiverAnimation,
            audioSource: 'audiocheckin3',
        },
        journal: {
            question: "O que você sente que\nprecisa deixar fluir hoje?",
        },
        summary: {
            practice: "Imagine um rio fluindo dentro de você, levando embora o excesso e deixando só o que importa.",
            question: "O que você sente que precisa deixar fluir hoje?",
        },
    },
    4: {
        id: 4,
        start: {
            image: CheckinParar,
            title: "Uma pausa para\nreconhecer o que está funcionando.",
        },
        activity: {
            title: "Uma pausa para reconhecer\no que está funcionando.",
            motionComponent: BreathAnimation,
            audioSource: 'audiocheckin4',
        },
        journal: {
            question: "Hoje, me sinto\ngrato(a) por…",
        },
        summary: {
            practice: "Respire fundo e pense em algo simples que foi bom nos últimos dias.",
            question: "Hoje, me sinto grato(a) por…",
        },
    },
    5: {
        id: 5,
        start: {
            image: CheckinScanOlhosAbertos,
            title: "Foque sua atenção\nno seu corpo",
        },
        activity: {
            title: "Traga sua atenção\n para o seu corpo.",
            motionComponent: ScanAnimation,
            audioSource: 'audiocheckin5',
        },
        journal: {
            question: "Qual parte do seu corpo\nte chamou mais atenção agora?",
        },
        summary: {
            practice: "Feche os olhos e faça um\n escaneamento rápido do corpo, dos pés à cabeça.",
            question: "Qual parte do seu corpo te chamou mais atenção agora?",
        },
    },
    6: {
        id: 6,
        start: {
            image: CheckinEscutar,
            title: "Hoje, te convido a\nescutar de verdade.",
        },
        activity: {
            title: "Hoje, te convido a \nescutar de verdade.",
            motionComponent: ListenAnimation,
            audioSource: 'audiocheckin6',
        },
        journal: {
            question: "Qual som ficou mais\npresente para você?",
        },
        summary: {
            practice: "Pare por 2 minutos e apenas escute os sons ao seu redor, um de cada vez.",
            question: "Qual som ficou mais presente para você?",
        },
    },
    7: {
        id: 7,
        start: {
            image: CheckinCoracao,
            title: "Conecte-se com o\nritmo do seu coração.",
        },
        activity: {
            title: "Conecte-se com o ritmo do seu coração.",
            motionComponent: HeartAnimation,
            audioSource: 'audiocheckin7',
        },
        journal: {
            question: "Como foi apenas parar\ne perceber seu coração?",
        },
        summary: {
            practice: "Coloque a mão no peito, respire fundo 5 vezes e sinta cada batida.",
            question: "Como foi apenas parar e perceber seu coração?",
        },
    },
    8: {
        id: 8,
        start: {
            image: CheckinAromas,
            title: "Sinta o aroma\nda vida ao seu redor.",
        },
        activity: {
            title: "Sinta o aroma da vida ao seu redor.",
            motionComponent: FragranceAnimation,
        },
        journal: {
            question: "Hoje, o olfato te ajudou a treinar algo raro: dirigir a própria atenção",
        },
        summary: {
            practice: "Aproxime algo do nariz e inspire devagar, sentindo cada detalhe do aroma.",
            question: "O que você percebe quando foca só no aroma?",
        },
    },
    9: {
        id: 9,
        start: {
            image: CheckinReviver,
            title: "Reviva algo\nque te fez sorrir.",
        },
        activity: {
            title: "Reviva algo que te fez sorrir.",
            motionComponent: MemoryAnimation,
            audioSource: 'audiocheckin9',
        },
        journal: {
            question: "Se pudesse guardar um detalhe dessa memória, qual seria?",
        },
        summary: {
            practice: "Feche os olhos e traga à mente uma lembrança feliz, sentindo como se estivesse lá.",
            question: "Se pudesse guardar um detalhe dessa memória, qual seria?",
        },
    },
    10: {
        id: 10,
        start: {
            image: CheckinRespirar2,
            title: "Solte o peso do\ndia com um suspiro.",
        },
        activity: {
            title: "Solte o peso do dia com um suspiro.",
            motionComponent: LungsAnimation,
        },
        journal: {
            question: "Que sensação fica\napós esse suspiro?",
        },
        summary: {
            practice: "Encha os pulmões de ar e solte como um suspiro de alívio.",
            question: "Que sensação fica após esse suspiro?",
        },
    },
    11: {
        id: 11,
        start: {
            image: CheckinSinta,
            title: "Sinta o contato\nda vida em você.",
        },
        activity: {
            title: "Sinta o contato da vida em você.",
            motionComponent: TouchAnimation,
            audioSource: 'audiocheckin11',
        },
        journal: {
            question: "Como seu corpo responde\nao seu toque agora?",
        },
        summary: {
            practice: "Toque suas mãos, braços e rosto lentamente, percebendo a temperatura e textura da pele.",
            question: "Como seu corpo responde ao seu toque agora?",
        },
    },
    12: {
        id: 12,
        start: {
            image: CheckinWatch,
            title: "Observe o céu\npor 2 minutos,\nsem pressa.",
        },
        activity: {
            title: "Observe o céu\npor 2 minutos,\nsem pressa.",
            motionComponent: CloudsAnimation,
            audioSource: 'audiocheckin12',
        },
        journal: {
            question: "Como o céu de hoje\nconversa com você?",
        },
        summary: {
            practice: "Veja cores, formas das nuvens, movimentos sutis.",
            question: "Como o céu de hoje conversa com você?",
        },
    },
    13: {
        id: 13,
        start: {
            image: CheckinFace,
            title: "Deixe um sorriso\nbrotar agora, mesmo\nsem motivo.",
        },
        activity: {
            title: "Deixe um sorriso\nbrotar agora, mesmo\nsem motivo.",
            motionComponent: SmileAnimation,
            audioSource: 'audiocheckin13',
        },
        journal: {
            question: "Como foi simplesmente\nexperimentar esse sorriso?",
        },
        summary: {
            practice: "Apenas sorria um pouco agora… e veja como é estar assim, mesmo sem motivo.",
            question: "Como foi simplesmente experimentar esse sorriso?",
        },
    },
    14: {
        id: 14,
        start: {
            image: CheckinSearch,
            title: "Observe algo à sua\nvolta como se fosse a\nprimeira vez que vê.",
        },
        activity: {
            title: "Observe algo à sua\nvolta como se fosse a\nprimeira vez que vê.",
            motionComponent: GlassAnimation,
            audioSource: 'audiocheckin14',
        },
        journal: {
            question: "O que você notou\nde diferente hoje?",
        },
        summary: {
            practice: "Escolha um objeto comum e descubra detalhes que nunca notou.",
            question: "O que você notou de diferente hoje?",
        },
    },
    15: {
        id: 15,
        start: {
            image: CheckinSound,
            title: "Escute os sons\ndo seu corpo.",
        },
        activity: {
            title: "Escute os sons\ndo seu corpo.",
            motionComponent: SoundsAnimation,
            audioSource: 'audiocheckin15',
        },
        journal: {
            question: "O que deu pra\nescutar aí dentro?",
        },
        summary: {
            practice: "Sente-se em silêncio e perceba sua respiração, batimentos ou movimentos internos.",
            question: "O que deu pra escutar aí dentro?",
        },
    },
    16: {
        id: 16,
        start: {
            image: CheckinObserveThoughts,
            title: "Dê uma pausa para \nobservar seus pensamentos\ncom leveza.",
        },
        activity: {
            title: "Dê uma pausa para \nobservar seus pensamentos\ncom leveza.",
            motionComponent: WatchThoughtsAnimation,
            audioSource: 'audiocheckin16',
        },
        journal: {
            question: "Como é sentir que\nos pensamentos vão e a\nmente permanece?",
        },
        summary: {
            practice: "Feche os olhos e imagine: sua mente é como o céu. Os pensamentos vão passando como nuvens.",
            question: "Como é sentir que os pensamentos vão e a mente permanece?",
        },
    },
};