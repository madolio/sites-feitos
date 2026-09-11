// Sabor da Vila é um negócio fictício — conceito de site da Madolio pro nicho de
// hamburgueria de bairro. Cardápio e preços são exemplos plausíveis.

export type Item = {
  id: string
  name: string
  description: string
  price: number
}

export type Category = {
  id: string
  name: string
  note?: string
  items: Item[]
}

export const cardapio: Category[] = [
  {
    id: 'smash',
    name: 'Smash',
    note: 'Carne de 80 g amassada na chapa até a borda ficar crocante.',
    items: [
      { id: 'smash-vila', name: 'Smash da Vila', description: 'Duas carnes, cheddar, cebola na chapa e molho da casa no pão de batata.', price: 29 },
      { id: 'smash-bacon', name: 'Duplo bacon', description: 'Duas carnes, cheddar em dobro e bacon crocante.', price: 34 },
      { id: 'smash-salada', name: 'Smash salada', description: 'Uma carne, queijo prato, alface, tomate e cebola roxa.', price: 27 },
    ],
  },
  {
    id: 'casa',
    name: 'Da casa',
    note: 'Blend de 160 g, no ponto que você pedir.',
    items: [
      { id: 'classico', name: 'Vila clássico', description: 'Queijo prato, alface, tomate e maionese de alho.', price: 36 },
      { id: 'chapa-quente', name: 'Chapa quente', description: 'Provolone, pimenta biquinho e cebola caramelizada.', price: 39 },
      { id: 'veggie', name: 'Veggie da feira', description: 'Burger de grão-de-bico, queijo coalho, rúcula e tomate assado.', price: 35 },
    ],
  },
  {
    id: 'lado',
    name: 'Pro lado',
    items: [
      { id: 'fritas', name: 'Fritas da casa', description: 'Batata cortada na hora, com páprica.', price: 16 },
      { id: 'onion', name: 'Onion rings', description: 'Cebola empanada na cerveja.', price: 19 },
      { id: 'mandioca', name: 'Mandioca frita', description: 'Com maionese de ervas.', price: 18 },
    ],
  },
  {
    id: 'bebidas',
    name: 'Pra beber',
    items: [
      { id: 'refri', name: 'Refrigerante', description: 'Lata de 350 ml.', price: 7 },
      { id: 'suco', name: 'Suco da fruta', description: 'Laranja, limão ou maracujá.', price: 12 },
      { id: 'shake', name: 'Milkshake', description: 'Doce de leite com paçoca.', price: 22 },
    ],
  },
]

export const allItems = cardapio.flatMap((c) => c.items)

export const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
