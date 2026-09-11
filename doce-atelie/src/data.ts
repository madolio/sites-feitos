// Doce Ateliê é um negócio fictício — conceito de site da Madolio pro nicho de
// confeitaria de encomenda. Sabores, prazos e bairro são exemplos plausíveis,
// não dados de um cliente real.

export type Flavor = {
  id: string
  /** Código de cartela, no estilo "Pantone" — parte do conceito visual. */
  code: string
  name: string
  color: string
  description: string
}

export const massas: Flavor[] = [
  { id: 'baunilha', code: 'DA 101', name: 'Baunilha', color: '#f2e2b3', description: 'Amanteigada e fofinha, com fava de baunilha.' },
  { id: 'chocolate', code: 'DA 102', name: 'Chocolate 50%', color: '#6a3b27', description: 'Úmida e escura, com cacau 50%.' },
  { id: 'red-velvet', code: 'DA 103', name: 'Red velvet', color: '#a3243a', description: 'Leve toque de cacau e um vermelho fundo.' },
  { id: 'cenoura', code: 'DA 104', name: 'Cenoura', color: '#ec8c3c', description: 'A de vó, com cenoura ralada na hora.' },
  { id: 'laranja', code: 'DA 105', name: 'Pão de ló de laranja', color: '#f5b544', description: 'Aerado, com raspas de laranja-pera.' },
]

export const recheios: Flavor[] = [
  { id: 'brigadeiro', code: 'DA 201', name: 'Brigadeiro 70%', color: '#4b2519', description: 'Brigadeiro de panela com chocolate 70%, mexido até soltar do fundo.' },
  { id: 'ninho-morango', code: 'DA 202', name: 'Ninho com morango', color: '#f4b4bf', description: 'Creme de leite em pó com morango fresco picado.' },
  { id: 'doce-de-leite', code: 'DA 203', name: 'Doce de leite', color: '#c98646', description: 'Doce de leite mineiro, cozido devagar por quatro horas.' },
  { id: 'pistache', code: 'DA 204', name: 'Pistache', color: '#a2bb6f', description: 'Creme de pistache torrado, com pedaços inteiros.' },
  { id: 'maracuja', code: 'DA 205', name: 'Maracujá', color: '#f5c93a', description: 'Mousse de maracujá azedinho, pra cortar o doce.' },
  { id: 'frutas-vermelhas', code: 'DA 206', name: 'Frutas vermelhas', color: '#8a1c3c', description: 'Geleia da casa de amora, framboesa e morango.' },
  { id: 'limao', code: 'DA 207', name: 'Limão siciliano', color: '#ece28c', description: 'Creme de limão siciliano com raspas da casca.' },
  { id: 'coco', code: 'DA 208', name: 'Coco queimado', color: '#d6bb93', description: 'Coco fresco tostado no leite condensado.' },
]

export type Size = { id: string; name: string; diameter: number; serves: number }

export const tamanhos: Size[] = [
  { id: 'p', name: 'Pequeno', diameter: 18, serves: 15 },
  { id: 'm', name: 'Médio', diameter: 22, serves: 25 },
  { id: 'g', name: 'Grande', diameter: 26, serves: 40 },
]

export type DocinhoKind = 'brigadeiro' | 'beijinho' | 'bicho-de-pe' | 'casadinho' | 'pistache' | 'olho-de-sogra'

export const docinhos: { kind: DocinhoKind; name: string; description: string }[] = [
  { kind: 'brigadeiro', name: 'Brigadeiro', description: 'Chocolate 70% e granulado belga.' },
  { kind: 'beijinho', name: 'Beijinho', description: 'Coco fresco e o cravo em cima, como manda a tradição.' },
  { kind: 'bicho-de-pe', name: 'Bicho-de-pé', description: 'Morango, passado no açúcar cristal.' },
  { kind: 'casadinho', name: 'Casadinho', description: 'Metade brigadeiro, metade beijinho.' },
  { kind: 'pistache', name: 'Brigadeiro de pistache', description: 'Pistache torrado por cima.' },
  { kind: 'olho-de-sogra', name: 'Olho de sogra', description: 'Ameixa recheada com doce de coco.' },
]
