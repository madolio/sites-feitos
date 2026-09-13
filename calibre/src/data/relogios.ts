export type Relogio = {
  nome: string
  caixa: string
  movimento: string
  aPartirDe: string
  descricao: string
  corFundo: string
  corMarcadores: string
  corPonteiros: string
  contadores?: { cx: number; cy: number }[]
}

export const relogios: Relogio[] = [
  {
    nome: 'Meridiano',
    caixa: 'aço escovado, 39mm',
    movimento: 'automático, 42h de reserva',
    aPartirDe: 'a partir de R$ 8.900',
    descricao: 'O modelo mais discreto da casa — mostrador prateado guilhoché, sem nenhuma complicação além de dar as horas direito.',
    corFundo: '#d9d3c4',
    corMarcadores: '#2a2620',
    corPonteiros: '#2a2620',
  },
  {
    nome: 'Noturno',
    caixa: 'aço escovado, 40mm',
    movimento: 'automático, 42h de reserva',
    aPartirDe: 'a partir de R$ 9.400',
    descricao: 'Mostrador preto fumê e ponteiros azulados a fogo de verdade — a mesma técnica que enferruja, se você não souber fazer direito.',
    corFundo: '#1a1a1a',
    corMarcadores: '#caa25e',
    corPonteiros: '#3a5a8f',
  },
  {
    nome: 'Cronó Um',
    caixa: 'bronze, 41mm',
    movimento: 'cronógrafo manual, 48h de reserva',
    aPartirDe: 'a partir de R$ 12.600',
    descricao: 'O bronze cria pátina própria com o tempo — cada Cronó Um vai ficar com uma cor levemente diferente de qualquer outro daqui a um ano.',
    corFundo: '#e8dcc4',
    corMarcadores: '#5c3a1e',
    corPonteiros: '#5c3a1e',
    contadores: [
      { cx: 65, cy: 100 },
      { cx: 135, cy: 100 },
    ],
  },
  {
    nome: 'Reserva',
    caixa: 'ouro champanhe, 38mm',
    movimento: 'corda manual, 72h de reserva',
    aPartirDe: 'a partir de R$ 15.200',
    descricao: 'O contador às 6h mostra quanto de corda ainda resta — o único relógio da casa que conta essa história no próprio mostrador.',
    corFundo: '#f0e6cf',
    corMarcadores: '#8a6a34',
    corPonteiros: '#8a6a34',
    contadores: [{ cx: 100, cy: 138 }],
  },
]
