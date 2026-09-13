import { Color } from 'three'
import { PARADAS } from '../cores'

const cores = PARADAS.map(([d, hex]) => [d, new Color(hex)] as const)

export function corDaAgua(d: number, saida: Color) {
  let i = 1
  while (i < cores.length - 1 && d > cores[i][0]) i++
  const [d0, c0] = cores[i - 1]
  const [d1, c1] = cores[i]
  const t = Math.min(1, Math.max(0, (d - d0) / (d1 - d0)))
  return saida.copy(c0).lerp(c1, t)
}

export const suave = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
