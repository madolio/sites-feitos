// Âncora é uma consultoria fictícia — conceito de site da Madolio pro nicho
// de planejamento financeiro e gestão de patrimônio. Números, clientes e
// carteiras são exemplos ilustrativos, não uma empresa real nem recomendação
// de investimento.

export type Lancamento = {
  id: string
  descricao: string
  valor: number
}

// Um "extrato" ilustrativo de aportes mensais — não é a carteira de ninguém,
// é o wildcard da página (ver Extrato.tsx): a régua de pontos some e o saldo
// sobe conforme a pessoa rola.
export const lancamentos: Lancamento[] = [
  { id: 'l1', descricao: 'Saldo inicial', valor: 50000 },
  { id: 'l2', descricao: 'Aporte mensal — jan', valor: 3200 },
  { id: 'l3', descricao: 'Rendimento — jan', valor: 410 },
  { id: 'l4', descricao: 'Aporte mensal — fev', valor: 3200 },
  { id: 'l5', descricao: 'Rendimento — fev', valor: 445 },
  { id: 'l6', descricao: 'Aporte mensal — mar', valor: 3200 },
  { id: 'l7', descricao: 'Rendimento — mar', valor: 468 },
  { id: 'l8', descricao: 'Aporte mensal — abr', valor: 3800 },
  { id: 'l9', descricao: 'Rendimento — abr', valor: 512 },
]

export const servicos = [
  {
    title: 'Planejamento financeiro',
    text: 'Organização de receitas, despesas e metas — o mapa antes de qualquer decisão de investimento.',
  },
  {
    title: 'Gestão de carteira',
    text: 'Alocação entre renda fixa, fundos e ações conforme o seu prazo e a sua tolerância a risco de verdade.',
  },
  {
    title: 'Planejamento sucessório',
    text: 'Estrutura de holding e testamento pra que o patrimônio chegue a quem você escolher, do jeito que você escolher.',
  },
  {
    title: 'Aposentadoria',
    text: 'Quanto poupar hoje pra manter o padrão de vida quando a renda do trabalho parar.',
  },
]

export const processo = [
  { title: 'Diagnóstico', text: 'Levantamento completo do patrimônio, das dívidas e dos objetivos de vida.' },
  { title: 'Plano', text: 'Uma estratégia escrita, com metas de prazo e alocação — não uma dica solta.' },
  { title: 'Revisão trimestral', text: 'Ajuste conforme o mercado e a sua vida mudam. Plano nenhum é definitivo.' },
]
