// A ficha de registro de pensamento é a técnica real de reestruturação
// cognitiva usada em terapia cognitivo-comportamental (Beck): situação →
// pensamento automático → emoção (com intensidade) → reformulação. Os
// quatro casos abaixo são ilustrativos e genéricos — não diagnosticam nem
// avaliam quem visita o site, só mostram como o exercício funciona na
// prática. Nenhum deles corresponde a uma pessoa real.

export type Etapa = {
  rotulo: string
  texto: string
}

export type Caso = {
  id: string
  tema: string
  situacao: string
  pensamento: string
  emocao: string
  intensidade: number // 0–100, autorrelato hipotético, ilustrativo
  reformulacao: string
}

export const casos: Caso[] = [
  {
    id: 'trabalho',
    tema: 'Estresse no trabalho',
    situacao: 'O chefe pediu pra revisar um relatório que eu já tinha entregue como pronto.',
    pensamento: '"Eu estraguei tudo, ele deve achar que eu sou incompetente."',
    emocao: 'Vergonha e ansiedade',
    intensidade: 80,
    reformulacao:
      'Pedir revisão é parte normal do processo, não é veredito sobre minha competência. Posso perguntar especificamente o que ele quer ajustar em vez de supor o pior.',
  },
  {
    id: 'social',
    tema: 'Relacionamentos',
    situacao: 'Mandei uma mensagem pra um amigo há dois dias e ele ainda não respondeu.',
    pensamento: '"Eu devo ter feito algo errado, ele está evitando falar comigo."',
    emocao: 'Ansiedade e insegurança',
    intensidade: 65,
    reformulacao:
      'Tem várias explicações possíveis pra uma resposta demorada, a maioria não tem nada a ver comigo. Se continuar me incomodando, posso perguntar direto em vez de adivinhar.',
  },
  {
    id: 'autoestima',
    tema: 'Autoestima',
    situacao: 'Errei uma pergunta simples numa reunião, na frente de todo mundo.',
    pensamento: '"Todo mundo ali percebeu que eu não sei nada."',
    emocao: 'Humilhação',
    intensidade: 75,
    reformulacao:
      'Um erro pontual não apaga tudo que eu sei. Provavelmente ninguém guardou esse momento do jeito que eu guardei, as pessoas lembram muito menos dos erros dos outros do que a gente imagina.',
  },
  {
    id: 'futuro',
    tema: 'Preocupação com o futuro',
    situacao: 'Vi uma notícia sobre demissões no meu setor.',
    pensamento: '"Vou ser o próximo, e depois não vou conseguir pagar as contas."',
    emocao: 'Medo',
    intensidade: 70,
    reformulacao:
      'Estou prevendo o pior cenário como se fosse certo, sem nenhuma evidência de que vai acontecer comigo. Posso separar o que dá pra me preparar de verdade do que é só antecipação ansiosa.',
  },
]

export const etapasFicha: Etapa[] = [
  { rotulo: 'Situação', texto: 'O que aconteceu, sem interpretação, só o fato.' },
  { rotulo: 'Pensamento automático', texto: 'O que passou pela cabeça na hora, quase sem pensar.' },
  { rotulo: 'Emoção', texto: 'O que se sentiu, e o quanto, numa escala de 0 a 100.' },
  { rotulo: 'Reformulação', texto: 'Uma leitura mais equilibrada, construída junto em sessão.' },
]
