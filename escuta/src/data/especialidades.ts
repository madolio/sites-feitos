export type Especialidade = {
  nome: string
  descricao: string
}

export const especialidades: Especialidade[] = [
  {
    nome: 'Ansiedade',
    descricao:
      'Preocupação excessiva, pensamentos acelerados, tensão física constante ou crises de pânico que atrapalham o dia a dia.',
  },
  {
    nome: 'Esgotamento no trabalho',
    descricao:
      'Cansaço que não passa com descanso, irritação constante, sensação de estar sempre no limite: sinais de burnout que merecem espaço pra serem tratados, não só "tirar uma folga".',
  },
  {
    nome: 'Autoestima',
    descricao:
      'Autocrítica dura demais, dificuldade de reconhecer o próprio valor, comparação constante que mina a confiança nas próprias decisões.',
  },
  {
    nome: 'Relacionamentos',
    descricao:
      'Conflitos recorrentes, dificuldade de colocar limite, padrões que se repetem em relações afetivas, familiares ou de amizade.',
  },
]
