export type Especialidade = {
  nome: string
  descricao: string
}

export const especialidades: Especialidade[] = [
  {
    nome: 'Ortopédica',
    descricao:
      'Lesões musculoesqueléticas — entorses, tendinites, lombalgia, hérnia de disco, artrose — com avaliação postural e plano de exercício terapêutico individualizado.',
  },
  {
    nome: 'Pós-operatória',
    descricao:
      'Reabilitação após cirurgia ortopédica (ligamento, menisco, prótese de quadril e joelho, cirurgia de coluna), seguindo o protocolo do cirurgião responsável fase a fase.',
  },
  {
    nome: 'Esportiva',
    descricao:
      'Retorno ao esporte após lesão, prevenção de lesão recorrente e treino de performance para atletas amadores e competitivos.',
  },
  {
    nome: 'Neurológica',
    descricao:
      'Reabilitação motora após AVC, lesão medular, Parkinson e outras condições neurológicas, com foco em função, marcha e independência.',
  },
  {
    nome: 'RPG',
    descricao:
      'Reeducação Postural Global — cadeias musculares alongadas em posturas ativas para tratar desequilíbrios posturais e dor crônica na origem, não só no sintoma.',
  },
]
