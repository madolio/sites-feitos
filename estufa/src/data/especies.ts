// Dados botânicos reais — luz, floração e dificuldade de cuidado seguem
// referência de catálogo/viveiro (não inventados). Nomenclatura binomial
// em itálico, como convenção real de taxonomia (gênero + epíteto).

export type Luz = 'sol pleno' | 'meia-sombra' | 'sombra filtrada'
export type Cuidado = 'fácil' | 'moderado' | 'exigente'

export type Especie = {
  id: string
  cientifico: string // gênero + epíteto
  autor: string // autoridade botânica da descrição original
  comum: string
  familia: string
  origem: string
  luz: Luz
  agua: string
  floracao: string
  cuidado: Cuidado
  uso: string
  nota: string
  ilustracao: 'strelitzia' | 'aechmea' | 'heliconia' | 'cattleya' | 'zantedeschia' | 'tibouchina'
  /** Cor real da flor/bráctea — usada como acento vivo na ficha (faixa, selo), tirada da própria espécie, não decorativa. */
  cor: string
}

export const especies: Especie[] = [
  {
    id: 'strelitzia',
    cientifico: 'Strelitzia reginae',
    autor: 'Aiton',
    comum: 'Ave-do-paraíso',
    familia: 'Strelitziaceae',
    origem: 'África do Sul, naturalizada em jardins tropicais e subtropicais',
    luz: 'sol pleno',
    agua: 'regas espaçadas, solo bem drenado — tolera curtos períodos de seca',
    floracao: 'outono ao início da primavera, pode florescer o ano todo em clima ameno',
    cuidado: 'moderado',
    uso: 'arranjo de destaque, jardim de sol pleno, vaso grande de entrada',
    nota:
      'a inflorescência em forma de cabeça de ave é polinizada por pássaros (nectarívoros) que pousam sobre a bráctea — a estrutura rígida existe pra sustentar o peso da ave, não é decorativa.',
    ilustracao: 'strelitzia',
    cor: '#f2661a',
  },
  {
    id: 'aechmea',
    cientifico: 'Aechmea fasciata',
    autor: '(Lindl.) Baker',
    comum: 'Bromélia-prateada',
    familia: 'Bromeliaceae',
    origem: 'Mata Atlântica brasileira, epífita de sub-bosque',
    luz: 'sombra filtrada',
    agua: 'manter água no "tanque" central da roseta, substrato só úmido',
    floracao: 'inflorescência dura de semanas a meses, geralmente na primavera',
    cuidado: 'fácil',
    uso: 'composição de sub-bosque, vaso suspenso, painel vertical de jardim vertical',
    nota:
      'planta monocárpica: cada roseta floresce uma única vez na vida e depois emite "filhotes" (brotações laterais) que a substituem — o vaso nunca fica vazio, só se renova.',
    ilustracao: 'aechmea',
    cor: '#e0518c',
  },
  {
    id: 'heliconia',
    cientifico: 'Heliconia psittacorum',
    autor: 'L. f.',
    comum: 'Helicônia-papagaio',
    familia: 'Heliconiaceae',
    origem: 'América tropical, incluindo o norte do Brasil',
    luz: 'sol pleno',
    agua: 'solo sempre úmido, rega frequente em clima quente',
    floracao: 'praticamente o ano todo em clima tropical, pico no verão',
    cuidado: 'fácil',
    uso: 'arranjo tropical de longa duração, canteiro de fundo, paisagismo de piscina',
    nota:
      'as brácteas coloridas (não as flores em si, pequenas e escondidas dentro delas) são o que se vê e o que dura semanas cortado — a mesma lógica de durabilidade da bougainville.',
    ilustracao: 'heliconia',
    cor: '#ff5a36',
  },
  {
    id: 'cattleya',
    cientifico: 'Cattleya labiata',
    autor: 'Lindl.',
    comum: 'Orquídea-nacional',
    familia: 'Orchidaceae',
    origem: 'Mata Atlântica de Pernambuco à Bahia — símbolo floral do Brasil',
    luz: 'sombra filtrada',
    agua: 'regar e deixar secar entre uma rega e outra — raiz encharcada apodrece',
    floracao: 'outono, floração breve e intensa (2 a 3 semanas)',
    cuidado: 'exigente',
    uso: 'peça central de arranjo fino, presente, evento de casamento',
    nota:
      'foi a espécie que, em 1818, reacendeu a febre europeia por orquídeas depois que William Cattley a floresceu em estufa a partir de material usado só como amortecedor de outra carga — daí o nome do gênero.',
    ilustracao: 'cattleya',
    cor: '#c93fa0',
  },
  {
    id: 'zantedeschia',
    cientifico: 'Zantedeschia aethiopica',
    autor: '(L.) Spreng.',
    comum: 'Copo-de-leite',
    familia: 'Araceae',
    origem: 'África do Sul, naturalizada em jardins de clima ameno',
    luz: 'meia-sombra',
    agua: 'solo sempre úmido a encharcado — tolera beira de lago ou chafariz',
    floracao: 'inverno à primavera',
    cuidado: 'moderado',
    uso: 'arranjo formal, buquê de casamento, canteiro de borda de água',
    nota:
      'a "flor" branca é na verdade uma espata (folha modificada) que envolve a espádice central, onde ficam as flores minúsculas de verdade — a mesma estrutura da copo-de-leite, do antúrio e do lírio-da-paz.',
    ilustracao: 'zantedeschia',
    cor: '#f0b429',
  },
  {
    id: 'tibouchina',
    cientifico: 'Tibouchina granulosa',
    autor: '(Desr.) Cogn.',
    comum: 'Quaresmeira',
    familia: 'Melastomataceae',
    origem: 'Mata Atlântica brasileira, árvore ornamental nativa',
    luz: 'sol pleno',
    agua: 'rega regular até pegar, depois tolera estiagem curta',
    floracao: 'março a maio, coincidindo com a quaresma católica — daí o nome popular',
    cuidado: 'fácil',
    uso: 'arborização de jardim e calçada, projeto de paisagismo de grande porte',
    nota:
      'os estames têm dois tamanhos diferentes na mesma flor — os maiores, curvos e roxos, servem só pra atrair abelhas por engano (polinização por vibração), os menores é que de fato produzem o pólen fértil.',
    ilustracao: 'tibouchina',
    cor: '#7b4fd1',
  },
]
