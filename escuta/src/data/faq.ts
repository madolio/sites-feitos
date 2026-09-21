// Perguntas reais de quem nunca fez terapia, respondidas de forma genérica e
// precisa — sem prometer resultado clínico específico e sem qualquer
// avaliação da pessoa que está lendo.

export type PerguntaFrequente = {
  pergunta: string
  resposta: string
}

export const faq: PerguntaFrequente[] = [
  {
    pergunta: 'Terapia online funciona mesmo?',
    resposta:
      'Pesquisas na área indicam que a psicoterapia por vídeo pode ser tão eficaz quanto a presencial pra boa parte das queixas, quando a conexão e a privacidade do ambiente são adequadas. A modalidade certa depende do seu caso e pode ser conversada na primeira sessão.',
  },
  {
    pergunta: 'Quanto tempo dura cada sessão?',
    resposta:
      'A sessão individual dura em torno de 50 minutos, o padrão mais comum em consultórios de psicologia no Brasil. A frequência (semanal, quinzenal) é combinada de acordo com a demanda.',
  },
  {
    pergunta: 'O convênio cobre as sessões?',
    resposta:
      'Depende do plano e do tipo de atendimento (particular com recibo pra reembolso, ou credenciado direto). Vale confirmar com o seu convênio antes da primeira sessão, dá pra alinhar isso já na primeira conversa.',
  },
  {
    pergunta: 'O que eu digo em sessão fica em sigilo?',
    resposta:
      'Sim. O sigilo profissional é uma exigência do Código de Ética do psicólogo, com exceção apenas das situações previstas em lei (como risco iminente à vida). Fora isso, o conteúdo da sessão não é compartilhado com ninguém.',
  },
  {
    pergunta: 'E se eu não souber por onde começar a falar?',
    resposta:
      'É extremamente comum. Não existe "forma certa" de começar: a primeira sessão costuma ser justamente sobre entender o que te trouxe até aqui, sem roteiro pronto.',
  },
]
