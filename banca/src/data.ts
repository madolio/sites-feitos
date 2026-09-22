// Fonte única dos dados de conteúdo: a fileira de baldes (navegação) e a
// vitrine de buquês (catálogo). Cores emprestadas de flor de verdade, não
// um accent de marca só — cada seção/produto carrega a cor da flor que o
// representa.

export type Secao = {
  id: string
  label: string
  flor: string
  cor: string
  nivelAtivo: number
  nivelRepouso: number
}

export const secoes: Secao[] = [
  { id: 'topo', label: 'Início', flor: 'Hortênsia', cor: 'var(--color-sky)', nivelAtivo: 0.82, nivelRepouso: 0.38 },
  { id: 'vitrine', label: 'Vitrine', flor: 'Peônia', cor: 'var(--color-magenta)', nivelAtivo: 0.88, nivelRepouso: 0.42 },
  { id: 'processo', label: 'Como funciona', flor: 'Cravo', cor: 'var(--color-marigold)', nivelAtivo: 0.85, nivelRepouso: 0.35 },
  { id: 'contato', label: 'Encomendar', flor: 'Lisianthus', cor: 'var(--color-violeta)', nivelAtivo: 0.9, nivelRepouso: 0.4 },
]

export type Ocasiao = 'Para hoje' | 'Aniversário' | 'Um agrado' | 'Condolências' | 'Casamento'

export type Buque = {
  id: string
  nome: string
  ocasiao: Ocasiao
  estacao: string
  ingredientes: string[]
  embrulho: string
  preco: number
  cor: string
}

export const buques: Buque[] = [
  {
    id: 'girassol-domingo',
    nome: 'Girassol de Domingo',
    ocasiao: 'Para hoje',
    estacao: 'Verão',
    ingredientes: ['6 girassóis', 'folhagem de eucalipto', 'fita crua'],
    embrulho: 'papel kraft, barbante duplo',
    preco: 89,
    cor: 'var(--color-marigold)',
  },
  {
    id: 'rosa-silenciosa',
    nome: 'Rosa Silenciosa',
    ocasiao: 'Condolências',
    estacao: 'Ano todo',
    ingredientes: ['12 rosas brancas', 'eucalipto prateado', 'avenca'],
    embrulho: 'papel de seda branco, sem fita',
    preco: 145,
    cor: 'var(--color-paper)',
  },
  {
    id: 'explosao-aster',
    nome: 'Explosão de Áster',
    ocasiao: 'Aniversário',
    estacao: 'Outono',
    ingredientes: ['8 ásteres roxos', '4 gérberas', 'folhagem variada'],
    embrulho: 'papel pardo colorido, fita crepom',
    preco: 98,
    cor: 'var(--color-violeta)',
  },
  {
    id: 'hortensia-azul',
    nome: 'Hortênsia Azul',
    ocasiao: 'Um agrado',
    estacao: 'Primavera',
    ingredientes: ['3 cabeças de hortênsia', 'alecrim', 'folha de limão'],
    embrulho: 'jornal reciclado, barbante de juta',
    preco: 120,
    cor: 'var(--color-sky)',
  },
  {
    id: 'ramo-de-campo',
    nome: 'Ramo de Campo',
    ocasiao: 'Para hoje',
    estacao: 'Ano todo',
    ingredientes: ['flores silvestres da semana', 'trigo seco', 'folhagem solta'],
    embrulho: 'papel kraft, sem laço',
    preco: 75,
    cor: 'var(--color-folha)',
  },
  {
    id: 'noiva-de-papel',
    nome: 'Noiva de Papel',
    ocasiao: 'Casamento',
    estacao: 'Ano todo',
    ingredientes: ['copo-de-leite', 'folhagem prateada', 'ramos de oliveira'],
    embrulho: 'papel de seda marfim, fita de cetim',
    preco: 210,
    cor: 'var(--color-magenta)',
  },
]

export const ocasioes: Ocasiao[] = ['Para hoje', 'Aniversário', 'Um agrado', 'Condolências', 'Casamento']
