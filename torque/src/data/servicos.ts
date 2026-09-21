// Intervalos de manutenção por quilometragem: faixas típicas para carros de
// passeio no Brasil, do jeito que aparecem em manual do proprietário e em
// tabela de revisão de oficina. São faixas gerais (o manual do carro
// específico sempre manda mais), não uma regra fixa, por isso cada item
// carrega uma faixa (kmMin a kmMax) em vez de um número único. O painel usa
// o menor valor da faixa (kmMin) como referência de alerta, por ser o mais
// conservador.
export type StatusItem = 'em-dia' | 'proximo' | 'vencido'

export type ItemRevisao = {
  id: string
  nome: string
  kmMin: number
  kmMax: number
  observacao: string
}

export const itensRevisao: ItemRevisao[] = [
  {
    id: 'oleo',
    nome: 'Óleo e filtro de óleo',
    kmMin: 10000,
    kmMax: 10000,
    observacao: 'Troca a cada 10.000 km ou 12 meses, o que vier primeiro.',
  },
  {
    id: 'filtro-ar',
    nome: 'Filtro de ar do motor',
    kmMin: 10000,
    kmMax: 15000,
    observacao: 'Antecipa em uso muito urbano ou estrada de terra.',
  },
  {
    id: 'filtro-cabine',
    nome: 'Filtro de cabine (ar-condicionado)',
    kmMin: 10000,
    kmMax: 15000,
    observacao: 'Trocar junto com o filtro de ar evita esquecer.',
  },
  {
    id: 'velas',
    nome: 'Velas de ignição',
    kmMin: 20000,
    kmMax: 40000,
    observacao: 'Vela comum. Modelo de irídio estende bem além disso.',
  },
  {
    id: 'freio',
    nome: 'Pastilhas de freio',
    kmMin: 20000,
    kmMax: 40000,
    observacao: 'Varia muito com o estilo de condução. Checar por desgaste, não só por km.',
  },
  {
    id: 'fluido-freio',
    nome: 'Fluido de freio',
    kmMin: 20000,
    kmMax: 20000,
    observacao: 'Troca a cada 20.000 km ou 2 anos, porque ele absorve umidade com o tempo.',
  },
  {
    id: 'correia',
    nome: 'Correia dentada',
    kmMin: 60000,
    kmMax: 60000,
    observacao: 'Item crítico: rompeu, motor pode fundir. Não vale esticar o prazo.',
  },
  {
    id: 'arrefecimento',
    nome: 'Fluido de arrefecimento',
    kmMin: 40000,
    kmMax: 60000,
    observacao: 'Manter o nível certo evita superaquecimento no verão.',
  },
]

/** km desde a última troca prevista, considerando revisão a cada `kmMin`. */
export function kmDesdeUltimaTroca(kmAtual: number, kmMin: number): number {
  return kmAtual % kmMin
}

export function statusItem(kmAtual: number, item: ItemRevisao): StatusItem {
  const percorrido = kmDesdeUltimaTroca(kmAtual, item.kmMin)
  const fracao = percorrido / item.kmMin
  if (fracao >= 0.9) return 'vencido'
  if (fracao >= 0.7) return 'proximo'
  return 'em-dia'
}
