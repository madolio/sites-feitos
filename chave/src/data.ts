// Chave é uma imobiliária fictícia — conceito de site da Madolio pro nicho
// de corretora de imóveis. Anúncios, preços e endereços são exemplos
// plausíveis, não imóveis reais à venda.

export type Tipo = 'apartamento' | 'casa' | 'cobertura' | 'terreno'

export type Anuncio = {
  codigo: string
  tipo: Tipo
  titulo: string
  bairro: string
  preco: string
  area: string
  quartos?: number
  descricao: string
  novo?: boolean
}

export const anuncios: Anuncio[] = [
  {
    codigo: 'CH-1042',
    tipo: 'apartamento',
    titulo: '2 quartos com varanda',
    bairro: 'Vila Madalena, São Paulo',
    preco: 'R$ 620.000',
    area: '68 m²',
    quartos: 2,
    descricao: 'Reformado, sol da tarde, 1 vaga coberta. A 5 min da estação.',
    novo: true,
  },
  {
    codigo: 'CH-0988',
    tipo: 'casa',
    titulo: 'Casa térrea com quintal',
    bairro: 'Vila Mariana, São Paulo',
    preco: 'R$ 890.000',
    area: '140 m²',
    quartos: 3,
    descricao: 'Quintal com churrasqueira, 2 vagas, rua tranquila e arborizada.',
  },
  {
    codigo: 'CH-1101',
    tipo: 'cobertura',
    titulo: 'Cobertura duplex',
    bairro: 'Moema, São Paulo',
    preco: 'R$ 1.750.000',
    area: '210 m²',
    quartos: 3,
    descricao: 'Terraço com piscina privativa, vista livre, 3 vagas.',
    novo: true,
  },
  {
    codigo: 'CH-0876',
    tipo: 'apartamento',
    titulo: 'Studio mobiliado',
    bairro: 'Pinheiros, São Paulo',
    preco: 'R$ 380.000',
    area: '32 m²',
    descricao: 'Pronto pra morar, prédio com coworking e lavanderia compartilhada.',
  },
  {
    codigo: 'CH-1055',
    tipo: 'terreno',
    titulo: 'Terreno plano, 300m²',
    bairro: 'Granja Viana, Cotia',
    preco: 'R$ 450.000',
    area: '300 m²',
    descricao: 'Condomínio fechado com portaria 24h, pronto pra construir.',
  },
  {
    codigo: 'CH-0921',
    tipo: 'apartamento',
    titulo: '3 quartos, 1 suíte',
    bairro: 'Tatuapé, São Paulo',
    preco: 'R$ 740.000',
    area: '95 m²',
    quartos: 3,
    descricao: 'Andar alto, 2 vagas, salão de festas e playground no prédio.',
  },
  {
    codigo: 'CH-1130',
    tipo: 'casa',
    titulo: 'Sobrado em condomínio',
    bairro: 'Alphaville, Barueri',
    preco: 'R$ 1.280.000',
    area: '180 m²',
    quartos: 4,
    descricao: 'Área de lazer completa no condomínio, 4 vagas, 4 quartos sendo 2 suítes.',
    novo: true,
  },
  {
    codigo: 'CH-0844',
    tipo: 'apartamento',
    titulo: '1 quarto perto do metrô',
    bairro: 'Santana, São Paulo',
    preco: 'R$ 310.000',
    area: '45 m²',
    quartos: 1,
    descricao: 'A 300m da estação, prédio com portaria 24h e bicicletário.',
  },
  {
    codigo: 'CH-1017',
    tipo: 'cobertura',
    titulo: 'Cobertura linear',
    bairro: 'Perdizes, São Paulo',
    preco: 'R$ 1.480.000',
    area: '165 m²',
    quartos: 3,
    descricao: 'Terraço gourmet, 3 vagas, reformada em 2024.',
  },
]

export const tipos: { id: Tipo; label: string }[] = [
  { id: 'apartamento', label: 'Apartamento' },
  { id: 'casa', label: 'Casa' },
  { id: 'cobertura', label: 'Cobertura' },
  { id: 'terreno', label: 'Terreno' },
]
