export const navItems = [
  { id: 'painel', label: 'Painel', icone: 'painel' as const },
  { id: 'rotas', label: 'Rotas', icone: 'rotas' as const },
  { id: 'frota', label: 'Frota', icone: 'frota' as const },
  { id: 'entregas', label: 'Entregas', icone: 'entregas' as const },
  { id: 'config', label: 'Configurações', icone: 'config' as const },
]

export const stats = [
  { label: 'Entregas hoje', valor: '128', nota: '+12% vs. ontem' },
  { label: 'Em rota agora', valor: '14', nota: '3 motoristas livres' },
  { label: 'Atraso médio', valor: '4 min', nota: 'meta: até 8 min' },
  { label: 'Ocupação da frota', valor: '82%', nota: '18 de 22 veículos' },
]

export type StatusEntrega = 'a caminho' | 'entregue' | 'atrasado'

export const entregas: { pedido: string; motorista: string; bairro: string; status: StatusEntrega; eta: string }[] = [
  { pedido: '#4821', motorista: 'Carlos M.', bairro: 'Pinheiros', status: 'a caminho', eta: '8 min' },
  { pedido: '#4820', motorista: 'Ana P.', bairro: 'Vila Mariana', status: 'entregue', eta: '—' },
  { pedido: '#4819', motorista: 'Diego S.', bairro: 'Moema', status: 'atrasado', eta: '19 min' },
  { pedido: '#4818', motorista: 'Carlos M.', bairro: 'Itaim Bibi', status: 'entregue', eta: '—' },
  { pedido: '#4817', motorista: 'Bruna L.', bairro: 'Perdizes', status: 'a caminho', eta: '15 min' },
]
