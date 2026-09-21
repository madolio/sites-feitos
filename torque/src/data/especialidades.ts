export type Especialidade = {
  nome: string
  descricao: string
}

export const especialidades: Especialidade[] = [
  {
    nome: 'Mecânica geral',
    descricao: 'Motor, câmbio, embreagem e diagnóstico com scanner OBD-II.',
  },
  {
    nome: 'Freios',
    descricao: 'Pastilhas, discos, fluido e sangria do sistema.',
  },
  {
    nome: 'Suspensão e direção',
    descricao: 'Amortecedores, buchas, terminais e alinhamento.',
  },
  {
    nome: 'Ar-condicionado',
    descricao: 'Higienização, recarga de gás e troca de filtro de cabine.',
  },
  {
    nome: 'Revisão programada',
    descricao: 'Checklist completo por quilometragem, com relatório do que foi feito.',
  },
]
