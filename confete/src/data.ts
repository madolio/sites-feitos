// Confete é uma empresa fictícia — conceito de site da Madolio pro nicho de
// festa infantil (buffet e organização). Pacotes, temas e preços são
// exemplos plausíveis, não uma empresa real.

export const pacotes = [
  {
    nome: 'Confete Mini',
    cor: 'sky',
    horas: '2h',
    convidados: 'até 30 convidados',
    inclui: 'Salgados, bolo, refrigerante e decoração temática simples.',
    preco: 'R$ 2.400',
  },
  {
    nome: 'Confete Completa',
    cor: 'ember',
    horas: '4h',
    convidados: 'até 60 convidados',
    inclui: 'Buffet completo, recreação com 2 monitores e decoração temática.',
    preco: 'R$ 4.800',
  },
  {
    nome: 'Confete Show',
    cor: 'mint',
    horas: '5h',
    convidados: 'até 100 convidados',
    inclui: 'Tudo da Completa + brinquedos infláveis e personagem vivo.',
    preco: 'R$ 8.200',
  },
] as const

export const temas = ['Super-heróis', 'Fundo do mar', 'Safári', 'Espaço', 'Princesas', 'Dinossauros']

export const depoimentos = [
  { texto: 'Chegamos e não precisamos fazer nada. Literalmente nada.', autor: 'Camila R., mãe da Aninha' },
  { texto: 'Os monitores brincaram com as crianças a festa inteira. Os pais puderam relaxar de verdade.', autor: 'Diego M., pai do Théo' },
]
