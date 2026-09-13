export type Esmalte = {
  id: string
  nome: string
  /** Cor depois da queima. */
  cor: string
  /** Texto legível sobre `cor` (validado ≥ 6:1 em todos). */
  onCor: string
  /** Aspereza da superfície queimada — shino é acetinado, tenmoku é quase espelho. */
  aspereza: number
  nota: string
}

export const esmaltes: Esmalte[] = [
  {
    id: 'cobalto',
    nome: 'Cobalto',
    cor: '#1f3c88',
    onCor: '#ffffff',
    aspereza: 0.12,
    nota: 'Azul profundo e brilhante — o clássico da cerâmica.',
  },
  {
    id: 'celadon',
    nome: 'Celadon',
    cor: '#7fa38c',
    onCor: '#1d1b18',
    aspereza: 0.14,
    nota: 'Verde translúcido que escurece onde o esmalte acumula.',
  },
  {
    id: 'tenmoku',
    nome: 'Tenmoku',
    cor: '#2b1a12',
    onCor: '#ffffff',
    aspereza: 0.07,
    nota: 'Quase preto, espelhado, com reflexo cor de ferrugem.',
  },
  {
    id: 'shino',
    nome: 'Shino',
    cor: '#e7d6bd',
    onCor: '#1d1b18',
    aspereza: 0.42,
    nota: 'Branco leitoso e acetinado, manchado de laranja pelo fogo.',
  },
  {
    id: 'oxido',
    nome: 'Óxido',
    cor: '#8b2e1a',
    onCor: '#ffffff',
    aspereza: 0.2,
    nota: 'Vermelho-ferro, que fica mais escuro nas bordas.',
  },
]

export type Turma = { id: string; nome: string; detalhe: string; preco: string }

export const turmas: Turma[] = [
  { id: 'iniciacao', nome: 'Iniciação ao torno', detalhe: '4 encontros de 3 h, aos sábados', preco: 'R$ 480' },
  { id: 'livre', nome: 'Torno livre', detalhe: 'Ateliê aberto 2× por semana, com orientação', preco: 'R$ 390/mês' },
  { id: 'esmaltacao', nome: 'Esmaltação e queima', detalhe: '1 encontro — traga sua peça crua', preco: 'R$ 260' },
]

export type Forma = 'barro' | 'vaso' | 'tigela' | 'caneca'

/** Perfil de cada forma pronta: altura (1 unidade = 10 cm) e raio externo em função da altura normalizada. */
export const formas: Record<Forma, { altura: number; raio: (t: number) => number }> = {
  barro: { altura: 1.15, raio: (t) => 0.74 * Math.sqrt(1 - 0.55 * t * t) },
  vaso: {
    altura: 2.2,
    raio: (t) =>
      0.45 +
      0.5 * Math.exp(-(((t - 0.38) / 0.22) ** 2)) -
      0.18 * Math.exp(-(((t - 0.82) / 0.08) ** 2)) +
      0.12 * suave(0.88, 1, t),
  },
  tigela: { altura: 0.95, raio: (t) => 0.42 + 0.85 * (1 - (1 - t) ** 2) },
  caneca: { altura: 1.3, raio: (t) => 0.62 - 0.03 * t + 0.025 * suave(0.93, 1, t) },
}

function suave(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
