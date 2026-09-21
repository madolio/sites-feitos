export type Madeira = {
  id: string
  nome: string
  densidadeKgM3: number
  amortecimento: number
  descricao: string
}

// Densidades reais de tonewoods (madeira seca, valores de referência de
// engenharia/lutheria). O amortecimento é uma aproximação didática: madeira
// mais densa reflete mais energia na junção corda/tampo/cavalete e sustenta
// o som por mais tempo (sustain maior); madeira mais leve/macia absorve mais
// e responde mais rápido, com decaimento mais curto — comportamento real e
// documentado em lutheria, aqui mapeado linearmente pro coeficiente de perda
// do filtro de Karplus-Strong (não é uma medição de amortecimento acústico
// de verdade, é uma aproximação para fins didáticos, deixada explícita).
export const MADEIRAS: Madeira[] = [
  {
    id: 'cedro',
    nome: 'Cedro (tampo)',
    densidadeKgM3: 380,
    amortecimento: 0.9935,
    descricao:
      'Tampo clássico de violões de náilon. Fibra mais macia, resposta imediata ao toque, tom quente — mas satura mais cedo em dinâmica forte.',
  },
  {
    id: 'abeto',
    nome: 'Abeto/spruce (tampo)',
    densidadeKgM3: 450,
    amortecimento: 0.9955,
    descricao:
      'O tampo mais comum em violões de aço. Fibra rígida e leve — converte mais energia da corda em som projetado, resposta brilhante.',
  },
  {
    id: 'bordo',
    nome: 'Bordo/maple (fundo e laterais)',
    densidadeKgM3: 650,
    amortecimento: 0.9975,
    descricao:
      'Pouco colorido tonalmente — deixa o ataque da corda passar quase sem filtrar, muito usado quando se quer projeção sem "encorpar" o tom.',
  },
  {
    id: 'mogno',
    nome: 'Mogno/mahogany (fundo e laterais)',
    densidadeKgM3: 600,
    amortecimento: 0.998,
    descricao:
      'Realça médios e dá sustain mais longo que o bordo, com menos brilho nos agudos — combinação clássica com tampo de abeto.',
  },
  {
    id: 'jacaranda',
    nome: 'Jacarandá-da-índia/rosewood (fundo e laterais)',
    densidadeKgM3: 830,
    amortecimento: 0.9992,
    descricao:
      'A mais densa do catálogo: agudos brilhantes, graves profundos e o sustain mais longo. O jacarandá-da-bahia (Dalbergia nigra) é protegido por CITES desde 1992 — hoje se usa jacarandá-da-índia (Dalbergia latifolia) ou substitutos legais.',
  },
]

export const ESCALA_MIN_MM = 340
export const ESCALA_MAX_MM = 660
export const ESCALA_PADRAO_MM = 650 // violão clássico (650 mm é o padrão real)

export const BITOLA_MIN_MM = 0.3
export const BITOLA_MAX_MM = 1.1
export const BITOLA_PADRAO_MM = 0.71 // ~3ª corda de náilon (sol), bitola real de catálogo

// Referências reais de comprimento de escala, pra contextualizar o slider.
export const ESCALAS_REFERENCIA = [
  { nome: 'Ukulele soprano', mm: 348 },
  { nome: 'Ukulele concerto', mm: 381 },
  { nome: 'Ukulele tenor', mm: 432 },
  { nome: 'Ukulele barítono', mm: 508 },
  { nome: 'Violão de aço (curto)', mm: 630 },
  { nome: 'Violão clássico', mm: 650 },
]
