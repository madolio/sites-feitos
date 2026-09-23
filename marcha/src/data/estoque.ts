// Fotos reais (banco de imagens livre), fichas técnicas fictícias — cada
// carro é descrito por categoria/especificação genérica, nunca por marca
// específica, já que a foto em si não é de um veículo que a Marcha
// realmente tem em estoque.
export type Carro = {
  id: string
  nome: string
  categoria: string
  ano: number
  preco: number
  potencia: string
  aceleracao: string
  foto: string
}

export const estoque: Carro[] = [
  {
    id: 'coupe-azul',
    nome: 'Cupê 2 portas',
    categoria: 'Esportivo compacto',
    ano: 2022,
    preco: 289000,
    potencia: '245 cv',
    aceleracao: '0-100 em 5,8s',
    foto: '/carros/coupe-azul.webp',
  },
  {
    id: 'coupe-cinza',
    nome: 'Cupê performance',
    categoria: 'Esportivo de alto desempenho',
    ano: 2023,
    preco: 512000,
    potencia: '480 cv',
    aceleracao: '0-100 em 3,9s',
    foto: '/carros/coupe-cinza.webp',
  },
  {
    id: 'muscle-preto',
    nome: 'Muscle car preparado',
    categoria: 'Muscle car',
    ano: 2021,
    preco: 398000,
    potencia: '650 cv',
    aceleracao: '0-100 em 4,1s',
    foto: '/carros/muscle-preto.webp',
  },
  {
    id: 'esportivo-azul',
    nome: 'Esportivo americano',
    categoria: 'Muscle car',
    ano: 2023,
    preco: 335000,
    potencia: '455 cv',
    aceleracao: '0-100 em 4,7s',
    foto: '/carros/esportivo-azul.webp',
  },
  {
    id: 'esportivo-amarelo',
    nome: 'Superesportivo V10',
    categoria: 'Superesportivo',
    ano: 2022,
    preco: 1890000,
    potencia: '610 cv',
    aceleracao: '0-100 em 3,2s',
    foto: '/carros/esportivo-amarelo.webp',
  },
]
