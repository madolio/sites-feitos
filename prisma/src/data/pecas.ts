export type Peca = {
  id: 'anel' | 'colar' | 'brincos'
  nome: string
  descricao: string
}

export const pecas: Peca[] = [
  { id: 'anel', nome: 'Anel', descricao: 'Aro em ouro com a gema encastoada no centro.' },
  { id: 'colar', nome: 'Colar', descricao: 'Corrente fina com pingente solitário.' },
  { id: 'brincos', nome: 'Brincos', descricao: 'Par de brincos discretos, uma gema em cada.' },
]
