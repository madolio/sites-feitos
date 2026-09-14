export type Etapa = {
  numero: string
  titulo: string
  descricao: string
}

export const etapas: Etapa[] = [
  {
    numero: '01',
    titulo: 'Colheita manual',
    descricao: 'Sempre de madrugada, com a uva ainda fria — a altitude da serra dá o frio de graça, a gente só aproveita a janela certa.',
  },
  {
    numero: '02',
    titulo: 'Prensagem suave',
    descricao: 'Prensa pneumática, pressão baixa: quanto menos a casca sofre, menos amargor sobra no vinho depois.',
  },
  {
    numero: '03',
    titulo: 'Fermentação em aço inox',
    descricao: 'Temperatura controlada por semanas — é aqui que o açúcar da uva vira o álcool que você vai girar na taça.',
  },
  {
    numero: '04',
    titulo: 'Estágio em carvalho',
    descricao: 'Alguns lotes ficam de 6 a 18 meses no barril, ganhando a baunilha e a madeira que a uva sozinha não dá.',
  },
  {
    numero: '05',
    titulo: 'Engarrafamento',
    descricao: 'Lote pequeno, rótulo numerado — cada garrafa sai com o ano e o talhão de onde a uva veio.',
  },
  {
    numero: '06',
    titulo: 'Decantação na sua taça',
    descricao: 'A última etapa não acontece aqui — acontece quando você gira o copo e deixa o vinho respirar antes do primeiro gole.',
  },
]
