// Estrutura real das três faixas etárias da Educação Infantil brasileira
// (mesma divisão usada pela BNCC pra creches e pré-escolas): bebês, crianças
// bem pequenas e crianças pequenas. Os marcos de cada domínio são os marcos
// de desenvolvimento amplamente documentados em literatura pediátrica e
// pedagógica pra cada faixa, não inventados. Por isso a linguagem usa
// referência geral ("costuma", "em geral", "por volta de"), porque todo
// marco de desenvolvimento varia de criança pra criança e uma data fechada
// seria informação incorreta.

export type Dominio = 'motor' | 'linguagem' | 'social' | 'cognitivo'

export type Faixa = {
  id: string
  nome: string
  idade: string
  resumo: string
  marcos: Record<Dominio, string[]>
}

export const dominioLabel: Record<Dominio, string> = {
  motor: 'Motor',
  linguagem: 'Linguagem',
  social: 'Social e emocional',
  cognitivo: 'Cognitivo',
}

export const faixas: Faixa[] = [
  {
    id: 'bebes',
    nome: 'Bebês',
    idade: '0 a 1 ano e 6 meses',
    resumo:
      'Fase de vínculo, exploração sensorial e das primeiras conquistas motoras: sustentar a cabeça, sentar, engatinhar, e pra muitos bebês, dar os primeiros passos.',
    marcos: {
      motor: [
        'Sustenta a cabeça e rola sozinho nos primeiros meses',
        'Senta sem apoio por volta dos 6 meses',
        'Engatinha e fica em pé com apoio entre 8 e 12 meses',
        'Dá os primeiros passos, em geral entre 12 e 18 meses',
      ],
      linguagem: [
        'Balbucia e reage a sons e vozes conhecidas',
        'Responde ao próprio nome por volta dos 9 meses',
        'Fala as primeiras palavras com sentido entre 12 e 18 meses',
      ],
      social: [
        'Constrói vínculo de apego com adultos de referência',
        'Reage a rostos e expressões, sorri em resposta',
        'Demonstra estranhamento a desconhecidos, sinal saudável de apego',
      ],
      cognitivo: [
        'Explora objetos levando à boca e manipulando com as mãos',
        'Entende permanência do objeto: sabe que algo escondido continua existindo',
        'Imita gestos simples de adultos e outras crianças',
      ],
    },
  },
  {
    id: 'bem-pequenas',
    nome: 'Crianças bem pequenas',
    idade: '1 ano e 7 meses a 3 anos e 11 meses',
    resumo:
      'Autonomia em explosão: andar, correr, falar em frases, brincar ao lado de outras crianças e começar o processo de desfralde.',
    marcos: {
      motor: [
        'Anda com firmeza e começa a correr',
        'Sobe escadas segurando corrimão, chuta bola',
        'Começa a controlar esfíncteres, processo que varia bastante de criança pra criança',
      ],
      linguagem: [
        'Amplia vocabulário rapidamente, forma frases curtas',
        'Nomeia objetos e pessoas do dia a dia',
        'Começa a fazer perguntas simples ("o quê", "onde")',
      ],
      social: [
        'Brinca ao lado de outras crianças (brincar paralelo)',
        'Começa a dividir atenção do adulto com o grupo',
        'Expressa emoções com mais intensidade, inclusive frustração',
      ],
      cognitivo: [
        'Brinca de faz de conta com objetos simples',
        'Reconhece cores e formas básicas',
        'Segue instruções de duas etapas',
      ],
    },
  },
  {
    id: 'pequenas',
    nome: 'Crianças pequenas',
    idade: '4 a 5 anos e 11 meses',
    resumo:
      'Preparação pra alfabetização e convívio em grupo mais estruturado: linguagem elaborada, jogos com regra e primeira noção de rotina e responsabilidade.',
    marcos: {
      motor: [
        'Corre, pula, equilibra-se num pé só',
        'Refina coordenação fina: recorta, desenha formas, segura o lápis com mais controle',
        'Participa de jogos com regras simples',
      ],
      linguagem: [
        'Conta histórias com começo, meio e fim',
        'Amplia vocabulário e começa a reconhecer letras e o próprio nome escrito',
        'Conversa em frases completas e articula melhor',
      ],
      social: [
        'Brinca de forma cooperativa, negocia papéis em brincadeiras de grupo',
        'Começa a entender regras coletivas e esperar a vez',
        'Nomeia e conversa sobre as próprias emoções com mais clareza',
      ],
      cognitivo: [
        'Classifica objetos por mais de um critério (cor e tamanho, por exemplo)',
        'Entende noções iniciais de quantidade e sequência',
        'Resolve pequenos problemas práticos com tentativa e erro',
      ],
    },
  },
]
