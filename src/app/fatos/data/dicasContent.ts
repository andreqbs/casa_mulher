export interface DicaSlide {
  title: string;
  items: string[];
  note?: string;
}

export const dicasPensamento: DicaSlide[] = [
  {
    title: '💭 Foque no seu PENSAMENTO',
    items: [
      'O que passou pela sua mente?',
      'Quais foram seus primeiros pensamentos sobre a situação?',
      'Como você interpretou o que aconteceu?',
      'Que palavras ou frases vieram à sua cabeça?',
    ],
  },
  {
    title: '🧠 Exemplos de pensamentos',
    items: [
      'Pensamentos automáticos comuns:',
      '"Isso sempre acontece comigo"',
      '"Eu deveria ter feito diferente"',
      '"As pessoas vão me julgar"',
      '"Eu não sou capaz"',
      '"Nada vai dar certo"',
      '"É minha culpa"',
    ],
  },
  {
    title: '💡 Dicas importantes',
    items: [
      'Pensamentos são interpretações, não fatos',
      'Observe sem julgar seus pensamentos',
      'Anote exatamente como pensou no momento',
      'Seja honesto e específico consigo mesmo',
      'Não censure — todos temos pensamentos automáticos',
    ],
  },
  {
    title: '📝 Como anotar',
    items: [
      'Perguntas que podem ajudar:',
      '"O que eu estava pensando quando isso aconteceu?"',
      '"Qual foi minha primeira reação mental?"',
      '"Que conclusões eu tirei da situação?"',
      '"Quais preocupações passaram pela minha cabeça?"',
    ],
  },
];

export const dicasEmocoes: DicaSlide[] = [
  {
    title: '😊 Emoções agradáveis — Parte 1',
    items: [
      'Alegria (satisfeita, acolhida, valorizada, animada)',
      'Gratidão (reconhecida, contente, presente, abençoada)',
      'Esperança (otimista, resiliente, motivada, confiante no futuro)',
      'Alívio (tranquila, segura, despreocupada, leve)',
      'Íntimo (conectada, próxima, acolhida, amada)',
      'Entusiasmo (empolgada, inspirada, cheia de energia)',
    ],
    note: 'Onde no meu corpo eu sinto minha emoção? Quais palavras posso usar para rotulá-la?',
  },
  {
    title: '😊 Emoções agradáveis — Parte 2',
    items: [
      'Confiança (segura, capaz, estável, assertiva)',
      'Satisfação (realizada, plena, contente)',
      'Tranquilidade (calma, serena, pacífica, equilibrada)',
      'Curiosidade (interessada, atenta, aberta)',
      'Apreciação (encantada, admirada, valorizada)',
      'Serenidade (em paz, harmoniosa, centrada, relaxada)',
      'Amor (afetuosa, conectada, valorizada, acolhedora)',
    ],
    note: 'O que posso dizer a mim mesma para ajudar a aceitar minha emoção?',
  },
  {
    title: '😔 Emoções desagradáveis — Parte 1',
    items: [
      'Tristeza (deixada de lado, desprezada, incapaz, rejeitada)',
      'Raiva (injustiçada, traída, desrespeitada, frustrada)',
      'Medo (ameaçada, insegura, em perigo, indefesa)',
      'Frustração (bloqueada, impotente, sem saída)',
      'Ansiedade (preocupada, agitada, em alerta, nervosa)',
      'Culpa (responsável, arrependida, inadequada)',
    ],
    note: 'Escolha as emoções que mais se conectam ao que sentiu no momento.',
  },
  {
    title: '😔 Emoções desagradáveis — Parte 2',
    items: [
      'Vergonha (exposta, humilhada, pequena, inadequada)',
      'Solidão (isolada, esquecida, invisível, desconectada)',
      'Desânimo (cansada, sem energia, sem esperança)',
      'Irritação (impaciente, incomodada, incompreendida)',
      'Preocupação (sobrecarregada, desconfiada, inquieta)',
    ],
  },
];

export const dicasReacoes: DicaSlide[] = [
  {
    title: '⚡ Foque na sua REAÇÃO',
    items: [
      'Como você reagiu à situação?',
      'O que você fez ou disse?',
      'Qual foi seu comportamento?',
      'Como seu corpo reagiu?',
    ],
  },
  {
    title: '🎭 Tipos de reações',
    items: [
      'Reações comportamentais:',
      'Falar alto, gritar ou ficar em silêncio',
      'Sair do local ou se isolar',
      'Chorar, rir nervosamente',
      'Movimentos corporais (gestos, tremores)',
      'Ações impulsivas ou procrastinação',
    ],
  },
  {
    title: '🫀 Reações físicas',
    items: [
      'Sinais no corpo:',
      'Coração acelerado ou respiração ofegante',
      'Tensão muscular ou relaxamento',
      'Sudorese, calafrios ou calor',
      'Dor de cabeça ou no estômago',
      'Tremores ou formigamentos',
    ],
  },
  {
    title: '💡 Lembre-se',
    items: [
      'Reações são naturais e válidas',
      'Não julgue suas reações',
      'Descreva o que realmente aconteceu',
      'Inclua reações físicas e comportamentais',
      'Seja específica sobre suas ações',
    ],
  },
];
