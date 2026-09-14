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

export type Zona = {
  id: string
  nome: string
  x: number
  y: number
  diametro: number
}

// Coordenadas no viewBox de Corpo.tsx (0 0 220 480) — cada zona é onde o
// desenho escolhido é "carimbado" em cima do corpo de referência.
export const zonas: Zona[] = [
  { id: 'peito', nome: 'Peito', x: 108, y: 118, diametro: 54 },
  { id: 'ombro', nome: 'Ombro', x: 151, y: 70, diametro: 30 },
  { id: 'antebraco', nome: 'Antebraço', x: 172, y: 148, diametro: 32 },
  { id: 'pulso', nome: 'Pulso', x: 170, y: 226, diametro: 20 },
  { id: 'panturrilha', nome: 'Panturrilha', x: 137, y: 392, diametro: 40 },
]
