export type Peca = {
  id: 'anel' | 'colar' | 'pulseira'
  nome: string
  descricao: string
}

export const pecas: Peca[] = [
  { id: 'anel', nome: 'Anel', descricao: 'Aro em ouro com a gema encastoada no centro.' },
  { id: 'colar', nome: 'Colar', descricao: 'Corrente fina com pingente solitário.' },
  { id: 'pulseira', nome: 'Pulseira', descricao: 'Bangle em ouro com a gema encastoada na frente.' },
]
