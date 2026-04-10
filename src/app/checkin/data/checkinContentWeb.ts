// Versão web do conteúdo de checkin — sem dependências React Native.
// Substitui checkinContent.ts para uso no ambiente Vite/Tailwind.

export type AnimationType = 'breath' | 'timer' | 'pulse';

export interface CheckinContentWeb {
  id: number;
  iconName: string;      // nome do ícone Lucide
  color: string;         // cor principal (Tailwind text/bg)
  bgColor: string;       // fundo da tela de início
  start: {
    title: string;
  };
  activity: {
    title: string;
    animationType: AnimationType;
    duration: number;    // segundos totais da atividade
    hint: string;        // instrução exibida durante a atividade
  };
  journal: {
    question: string;
  };
  result: string;        // mensagem de conclusão
}

export const CHECKIN_CONTENT_WEB: Record<number, CheckinContentWeb> = {
  1: {
    id: 1,
    iconName: 'Wind',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    start: { title: 'Pausa rápida\npra respirar\ne se conectar.' },
    activity: {
      title: 'Pausa rápida pra respirar e perceber como está o tempo aí dentro.',
      animationType: 'breath',
      duration: 96, // ~6 ciclos de 16s
      hint: 'Inspire por 6 segundos. Segure. Expire por 6 segundos.',
    },
    journal: { question: 'Como está o tempo\naí dentro hoje?' },
    result: 'Respirou,\nsentiu,\nobservou.\nIsso é viver com mais leveza.',
  },
  2: {
    id: 2,
    iconName: 'Pause',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    start: { title: 'Hoje, te convido\na não fazer nada.\nSó estar.' },
    activity: {
      title: 'Hoje, te convido a não fazer nada. Só estar.',
      animationType: 'timer',
      duration: 120,
      hint: 'Sente-se em silêncio, sem música, sem distração.',
    },
    journal: { question: 'O que apareceu\nno silêncio?' },
    result: 'Você\nprovou que\nbem-estar\ncabe em\nminutos.',
  },
  3: {
    id: 3,
    iconName: 'Waves',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    start: { title: 'Feche os olhos\ne imagine seu corpo\ncomo um rio…' },
    activity: {
      title: 'Feche os olhos e imagine seu corpo como um rio…',
      animationType: 'pulse',
      duration: 120,
      hint: 'Imagine um rio fluindo dentro de você, levando embora o excesso.',
    },
    journal: { question: 'O que você sente que\nprecisa deixar fluir hoje?' },
    result: 'Hoje você\ncuidou de\ndentro.\nE isso sempre\nreflete fora.',
  },
  4: {
    id: 4,
    iconName: 'Heart',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    start: { title: 'Uma pausa para\nreconhecer o que\nestá funcionando.' },
    activity: {
      title: 'Uma pausa para reconhecer o que está funcionando.',
      animationType: 'breath',
      duration: 96,
      hint: 'Respire fundo e pense em algo simples que foi bom nos últimos dias.',
    },
    journal: { question: 'Hoje, me sinto\ngrato(a) por…' },
    result: 'Pausa\nfeita,\nclareza\nganha.',
  },
  5: {
    id: 5,
    iconName: 'ScanLine',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    start: { title: 'Foque sua atenção\nno seu corpo.' },
    activity: {
      title: 'Traga sua atenção para o seu corpo.',
      animationType: 'pulse',
      duration: 120,
      hint: 'Feche os olhos e faça um escaneamento rápido, dos pés à cabeça.',
    },
    journal: { question: 'Qual parte do seu corpo\nte chamou mais atenção agora?' },
    result: 'Você criou\nespaço dentro\nde si agora.',
  },
  6: {
    id: 6,
    iconName: 'Ear',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    start: { title: 'Hoje, te convido a\nescutar de verdade.' },
    activity: {
      title: 'Hoje, te convido a escutar de verdade.',
      animationType: 'timer',
      duration: 120,
      hint: 'Pare e apenas escute os sons ao seu redor, um de cada vez.',
    },
    journal: { question: 'Qual som ficou mais\npresente para você?' },
    result: 'A escuta\nafina a mente e\nvocê acabou\nde fortalecer\nesse músculo\ninterno.',
  },
  7: {
    id: 7,
    iconName: 'HeartPulse',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    start: { title: 'Conecte-se com o\nritmo do seu coração.' },
    activity: {
      title: 'Conecte-se com o ritmo do seu coração.',
      animationType: 'pulse',
      duration: 90,
      hint: 'Coloque a mão no peito, respire fundo 5 vezes e sinta cada batida.',
    },
    journal: { question: 'Como foi apenas parar\ne perceber seu coração?' },
    result: 'O coração\né seu ponto\nde partida e\nde volta.\nSempre.',
  },
  8: {
    id: 8,
    iconName: 'Leaf',
    color: 'text-lime-600',
    bgColor: 'bg-lime-50',
    start: { title: 'Sinta o aroma\nda vida ao seu redor.' },
    activity: {
      title: 'Sinta o aroma da vida ao seu redor.',
      animationType: 'pulse',
      duration: 90,
      hint: 'Aproxime algo do nariz e inspire devagar, sentindo cada detalhe do aroma.',
    },
    journal: { question: 'O que você percebe\nquando foca só no aroma?' },
    result: 'Hoje,\no olfato te\najudou a treinar\nalgo raro:\ndirigir a\nprópria atenção.',
  },
  9: {
    id: 9,
    iconName: 'Smile',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    start: { title: 'Reviva algo\nque te fez sorrir.' },
    activity: {
      title: 'Reviva algo que te fez sorrir.',
      animationType: 'pulse',
      duration: 90,
      hint: 'Feche os olhos e traga à mente uma lembrança feliz, sentindo como se estivesse lá.',
    },
    journal: { question: 'Se pudesse guardar um detalhe\ndessa memória, qual seria?' },
    result: 'Voltar a\nboas memórias\ntreina a mente\npara perceber\na vida\ncom mais\nabertura.',
  },
  10: {
    id: 10,
    iconName: 'Wind',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    start: { title: 'Solte o peso do\ndia com um suspiro.' },
    activity: {
      title: 'Solte o peso do dia com um suspiro.',
      animationType: 'breath',
      duration: 96,
      hint: 'Encha os pulmões de ar e solte como um suspiro de alívio.',
    },
    journal: { question: 'Que sensação fica\napós esse suspiro?' },
    result: 'Um suspiro\nbasta para\nlembrar o\ncorpo do\nessencial.\nRepita quando\no peso\nvoltar.',
  },
  11: {
    id: 11,
    iconName: 'Hand',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    start: { title: 'Sinta o contato\nda vida em você.' },
    activity: {
      title: 'Sinta o contato da vida em você.',
      animationType: 'pulse',
      duration: 90,
      hint: 'Toque suas mãos, braços e rosto lentamente, percebendo a temperatura e textura da pele.',
    },
    journal: { question: 'Como seu corpo responde\nao seu toque agora?' },
    result: 'Treino feito!\nO seu corpo\né o lugar\nonde a mente\nencontra a\ncalma.',
  },
  12: {
    id: 12,
    iconName: 'Cloud',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
    start: { title: 'Observe o céu\npor 2 minutos,\nsem pressa.' },
    activity: {
      title: 'Observe o céu por 2 minutos, sem pressa.',
      animationType: 'timer',
      duration: 120,
      hint: 'Veja cores, formas das nuvens, movimentos sutis.',
    },
    journal: { question: 'Como o céu de hoje\nconversa com você?' },
    result: 'Você conseguiu.\nPresença é\ncomo o céu:\nse expande\nquando você\nobserva.',
  },
  13: {
    id: 13,
    iconName: 'Smile',
    color: 'text-fuchsia-600',
    bgColor: 'bg-fuchsia-50',
    start: { title: 'Deixe um sorriso\nbrotar agora, mesmo\nsem motivo.' },
    activity: {
      title: 'Deixe um sorriso brotar agora, mesmo sem motivo.',
      animationType: 'pulse',
      duration: 60,
      hint: 'Apenas sorria um pouco agora… e veja como é estar assim, mesmo sem motivo.',
    },
    journal: { question: 'Como foi simplesmente\nexperimentar esse sorriso?' },
    result: 'Feito!\nSorrir, ainda\nque forçado,\nensina o corpo\na sair do\nalerta.',
  },
  14: {
    id: 14,
    iconName: 'Eye',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    start: { title: 'Observe algo à sua\nvolta como se fosse a\nprimeira vez que vê.' },
    activity: {
      title: 'Observe algo à sua volta como se fosse a primeira vez que vê.',
      animationType: 'pulse',
      duration: 90,
      hint: 'Escolha um objeto comum e descubra detalhes que nunca notou.',
    },
    journal: { question: 'O que você notou\nde diferente hoje?' },
    result: 'Feito!\nVocê treinou o\nolhar para\nver o que o\nautomático\nignora.',
  },
  15: {
    id: 15,
    iconName: 'Mic',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    start: { title: 'Escute os sons\ndo seu corpo.' },
    activity: {
      title: 'Escute os sons do seu corpo.',
      animationType: 'timer',
      duration: 120,
      hint: 'Sente-se em silêncio e perceba sua respiração, batimentos ou movimentos internos.',
    },
    journal: { question: 'O que deu pra\nescutar aí dentro?' },
    result: 'Parabéns!\nVocê acalmou\no que estava\nfora, ouvindo\no que está\ndentro.',
  },
  16: {
    id: 16,
    iconName: 'Brain',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    start: { title: 'Dê uma pausa para\nobservar seus pensamentos\ncom leveza.' },
    activity: {
      title: 'Dê uma pausa para observar seus pensamentos com leveza.',
      animationType: 'pulse',
      duration: 120,
      hint: 'Feche os olhos e imagine: sua mente é como o céu. Os pensamentos vão passando como nuvens.',
    },
    journal: { question: 'Como é sentir que\nos pensamentos vão e a\nmente permanece?' },
    result: 'Parabéns!\nVocê percebeu\nque a mente é\nmaior que os\npensamentos.\nIsso muda\ntudo.',
  },
};

/** Retorna o próximo ID de checkin em ciclo (1→16→1…), usando localStorage. */
export function getNextCheckinId(): number {
  const stored = parseInt(localStorage.getItem('checkin_current_id') ?? '0', 10);
  const next = (stored % 16) + 1;
  localStorage.setItem('checkin_current_id', String(next));
  return next;
}
