export type Flash = {
  id: string
  nome: string
  tipo: 'rosa' | 'punhal' | 'andorinha' | 'raio' | 'cobra' | 'ancora'
  preco: string
}

export const flashes: Flash[] = [
  { id: 'rosa', nome: 'Rosa clássica', tipo: 'rosa', preco: 'R$ 280' },
  { id: 'punhal', nome: 'Punhal', tipo: 'punhal', preco: 'R$ 220' },
  { id: 'andorinha', nome: 'Andorinha', tipo: 'andorinha', preco: 'R$ 180' },
  { id: 'raio', nome: 'Raio', tipo: 'raio', preco: 'R$ 150' },
  { id: 'cobra', nome: 'Cobra', tipo: 'cobra', preco: 'R$ 260' },
  { id: 'ancora', nome: 'Âncora', tipo: 'ancora', preco: 'R$ 200' },
]

export type Artista = {
  nome: string
  estilo: string
}

export const artistas: Artista[] = [
  { nome: 'Bia Ferro', estilo: 'Blackwork' },
  { nome: 'Renan Reis', estilo: 'Fine line' },
  { nome: 'Duda Cruz', estilo: 'Old school' },
]
