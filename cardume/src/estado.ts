// Estado do mergulho compartilhado entre o motor (App.tsx, rAF), a cena 3D e
// o computador de mergulho. Mutável e fora do React: muda todo quadro.

export const PROF_MAX = 40 // metros

export const mergulho = {
  /** Profundidade que o scroll pede. */
  alvo: 0,
  /** Profundidade suavizada — é essa que a cena e o visor mostram. */
  atual: 0,
  /** m/s (positivo = descendo). */
  velocidade: 0,
  /** Ponteiro em coordenadas normalizadas (-1..1). */
  ponteiro: { x: 0, y: -0.15 },
  /** Contagem da parada de segurança (s), ou null. */
  parada: null as null | number,
  /** Subida conduzida pelo botão "Voltar à superfície" — o visor não reclama da velocidade. */
  automatico: false,
}

export function profundidadeDoScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  return max > 0 ? (window.scrollY / max) * PROF_MAX : 0
}

export function scrollDaProfundidade(d: number) {
  const max = document.documentElement.scrollHeight - window.innerHeight
  return (d / PROF_MAX) * max
}

// Temperatura: superfície tropical, termoclina entre 10 e 20 m.
export function temperatura(d: number) {
  const t = Math.min(1, Math.max(0, (d - 10) / 10))
  return 27 - 6 * t * t * (3 - 2 * t) - 2 * (d / PROF_MAX)
}

// Limite de não descompressão (min) por profundidade — aproximação de tabela
// recreativa, só pro visor ter um número plausível.
const TABELA_NDL: [number, number][] = [
  [10, 219], [12, 147], [14, 98], [16, 72], [18, 56], [20, 45],
  [22, 37], [25, 29], [30, 20], [35, 14], [40, 9],
]

export function ndl(d: number) {
  if (d < 10) return null
  for (let i = 1; i < TABELA_NDL.length; i++) {
    const [d0, n0] = TABELA_NDL[i - 1]
    const [d1, n1] = TABELA_NDL[i]
    if (d <= d1) return Math.round(n0 + ((d - d0) / (d1 - d0)) * (n1 - n0))
  }
  return 9
}
