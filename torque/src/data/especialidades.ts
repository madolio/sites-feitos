export type Especialidade = {
  nome: string
  descricao: string
  /** Tempo estimado de bancada, mesmo dado-oficina usado no painel de revisão. */
  tempoEstimado: string
  /** Checklist curto do que entra nesse serviço, exibido como sub-itens da OS. */
  itens: string[]
}

export const especialidades: Especialidade[] = [
  {
    nome: 'Mecânica geral',
    descricao: 'Motor, câmbio, embreagem e diagnóstico com scanner OBD-II.',
    tempoEstimado: '40–90 min',
    itens: [
      'Leitura de códigos de falha',
      'Inspeção visual de vazamentos',
      'Teste de embreagem em subida',
    ],
  },
  {
    nome: 'Freios',
    descricao: 'Pastilhas, discos, fluido e sangria do sistema.',
    tempoEstimado: '40–60 min',
    itens: ['Medição de espessura da pastilha', 'Inspeção do disco', 'Sangria e troca de fluido'],
  },
  {
    nome: 'Suspensão e direção',
    descricao: 'Amortecedores, buchas, terminais e alinhamento.',
    tempoEstimado: '1–2h',
    itens: [
      'Teste de folga em buchas e terminais',
      'Inspeção de amortecedor',
      'Alinhamento e balanceamento',
    ],
  },
  {
    nome: 'Ar-condicionado',
    descricao: 'Higienização, recarga de gás e troca de filtro de cabine.',
    tempoEstimado: '30–50 min',
    itens: ['Higienização do sistema', 'Recarga de gás', 'Troca do filtro de cabine'],
  },
  {
    nome: 'Revisão programada',
    descricao: 'Checklist completo por quilometragem, com relatório do que foi feito.',
    tempoEstimado: '1–3h',
    itens: [
      'Checklist dos 8 itens do painel',
      'Relatório do que foi trocado',
      'Registro pra próxima revisão',
    ],
  },
]
