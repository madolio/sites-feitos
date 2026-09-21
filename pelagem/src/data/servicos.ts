export type Servico = {
  nome: string
  descricao: string
  faixa: string
}

export const servicos: Servico[] = [
  {
    nome: 'Banho',
    descricao: 'Shampoo neutro ou específico pra pele sensível, secagem completa e escovação de saída.',
    faixa: 'A partir de R$ 60, conforme porte',
  },
  {
    nome: 'Tosa higiênica',
    descricao: 'Aparo em volta das patinhas, região íntima e barriga. Recomendada a cada banho.',
    faixa: 'A partir de R$ 25, junto com o banho',
  },
  {
    nome: 'Tosa na máquina ou tesoura',
    descricao: 'Corte completo, com a técnica certa pra cada tipo de pelo — nunca a mesma lâmina pra todos.',
    faixa: 'A partir de R$ 90, conforme pelagem e porte',
  },
  {
    nome: 'De-shedding (retirada de subpelo)',
    descricao: 'Escovação profunda pra remover pelo morto de pelagem dupla. Reduz queda em casa por semanas.',
    faixa: 'A partir de R$ 70',
  },
  {
    nome: 'Corte de unha',
    descricao: 'Corte e lixamento, sem sedação, com pausas se o pet ficar tenso.',
    faixa: 'A partir de R$ 20',
  },
  {
    nome: 'Limpeza de ouvido',
    descricao: 'Remoção de cera e excesso de pelo do canal auditivo, com produto próprio pra pets.',
    faixa: 'A partir de R$ 20',
  },
]
