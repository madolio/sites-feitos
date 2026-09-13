export type Categoria = 'lanches' | 'bebidas' | 'sobremesas' | 'combos'

export type Item = {
  id: string
  nome: string
  descricao: string
  preco: number
  categoria: Categoria
  glifo: 'burger' | 'wrap' | 'copo' | 'lata' | 'doce' | 'combo'
}

export const categorias: { id: Categoria; label: string }[] = [
  { id: 'lanches', label: 'Lanches' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'sobremesas', label: 'Sobremesas' },
  { id: 'combos', label: 'Combos' },
]

export const cardapio: Item[] = [
  {
    id: 'x-balcao',
    nome: 'X-Balcão',
    descricao: 'Hambúrguer da casa, queijo e molho especial.',
    preco: 24,
    categoria: 'lanches',
    glifo: 'burger',
  },
  {
    id: 'misto',
    nome: 'Misto quente',
    descricao: 'Presunto, queijo e manteiga, na chapa.',
    preco: 14,
    categoria: 'lanches',
    glifo: 'burger',
  },
  {
    id: 'wrap',
    nome: 'Wrap de frango',
    descricao: 'Frango grelhado, alface e molho de iogurte.',
    preco: 19,
    categoria: 'lanches',
    glifo: 'wrap',
  },
  {
    id: 'suco',
    nome: 'Suco natural',
    descricao: 'Laranja, limão ou maracujá.',
    preco: 9,
    categoria: 'bebidas',
    glifo: 'copo',
  },
  {
    id: 'refri',
    nome: 'Refrigerante lata',
    descricao: '350ml, bem gelado.',
    preco: 7,
    categoria: 'bebidas',
    glifo: 'lata',
  },
  {
    id: 'agua',
    nome: 'Água com gás',
    descricao: '500ml.',
    preco: 5,
    categoria: 'bebidas',
    glifo: 'lata',
  },
  {
    id: 'brownie',
    nome: 'Brownie',
    descricao: 'Chocolate meio amargo, servido morno.',
    preco: 12,
    categoria: 'sobremesas',
    glifo: 'doce',
  },
  {
    id: 'mousse',
    nome: 'Mousse de maracujá',
    descricao: 'Cremoso, com calda da fruta.',
    preco: 10,
    categoria: 'sobremesas',
    glifo: 'doce',
  },
  {
    id: 'combo-balcao',
    nome: 'Combo Balcão',
    descricao: 'X-Balcão + suco natural.',
    preco: 30,
    categoria: 'combos',
    glifo: 'combo',
  },
  {
    id: 'combo-kids',
    nome: 'Combo Kids',
    descricao: 'Misto quente + suco natural.',
    preco: 20,
    categoria: 'combos',
    glifo: 'combo',
  },
]
