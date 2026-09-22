// Cada exemplar de sebo é único — o mesmo título pode ter preços e estados
// bem diferentes dependendo do exemplar específico que chegou no balcão.
// Por isso a "nota de margem" é sempre concreta (página, capítulo, ano da
// dedicatória), nunca um adjetivo genérico tipo "ótimo estado".
export type Livro = {
  titulo: string
  autor: string
  edicao: string
  estado: string
  preco: number
  nota: string
}

export const livros: Livro[] = [
  {
    titulo: 'Grande Sertão: Veredas',
    autor: 'Guimarães Rosa',
    edicao: '7ª ed. — Nova Fronteira, 1988',
    estado: 'com grifos a lápis',
    preco: 42,
    nota: 'Grifos do cap. 3 ao 9, letra pequena e cuidadosa. Lombada reforçada com fita kraft, discreta.',
  },
  {
    titulo: 'Cem Anos de Solidão',
    autor: 'Gabriel García Márquez',
    edicao: '1ª ed. brasileira — Record, 1985',
    estado: 'com dedicatória',
    preco: 65,
    nota: '"Pra Helena, no seu aniversário — 1998." na folha de guarda. Capa com leve desbotamento na lombada.',
  },
  {
    titulo: 'A Hora da Estrela',
    autor: 'Clarice Lispector',
    edicao: '2ª ed. — Rocco, 1998',
    estado: 'seminovo',
    preco: 38,
    nota: 'Sem grifos, sem dobras. Uma mancha de café discreta no canto da pág. 40, não passa pro texto.',
  },
  {
    titulo: 'Memórias Póstumas de Brás Cubas',
    autor: 'Machado de Assis',
    edicao: 'Ática, 1994 — didática, com notas',
    estado: 'anotado por estudante',
    preco: 22,
    nota: 'Anotações de vestibular nas margens até o cap. 40, depois limpo. Útil se você também for estudar pelo livro.',
  },
  {
    titulo: 'Vidas Secas',
    autor: 'Graciliano Ramos',
    edicao: '38ª ed. — Record, 2002',
    estado: 'exemplar de sebo antigo',
    preco: 28,
    nota: 'Carimbo apagado de outro sebo na página de rosto — nossa segunda mão não é a primeira dele.',
  },
  {
    titulo: 'O Alienista',
    autor: 'Machado de Assis',
    edicao: 'Bolso — L&PM, 2014',
    estado: 'seminovo',
    preco: 16,
    nota: 'Orelha da capa levemente dobrada de tanto ir na bolsa. Miolo impecável.',
  },
]
