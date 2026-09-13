// Rampa da cor da água por profundidade. O vermelho some primeiro, depois o
// laranja e o amarelo — sobra azul, e depois nem ele. Sem three.js aqui de
// propósito: este arquivo entra no bundle principal (fundo CSS enquanto a
// cena 3D carrega, ou se não houver WebGL); a cena usa `cena/agua.ts`.
export const PARADAS: [number, string][] = [
  [0, '#8fdde3'],
  [6, '#4db4cd'],
  [14, '#1f7ea6'],
  [22, '#11557d'],
  [30, '#0a3453'],
  [40, '#04121f'],
]

const rgb = PARADAS.map(([d, hex]) => [d, [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))] as const)

export function hexDaAgua(d: number) {
  let i = 1
  while (i < rgb.length - 1 && d > rgb[i][0]) i++
  const [d0, c0] = rgb[i - 1]
  const [d1, c1] = rgb[i]
  const t = Math.min(1, Math.max(0, (d - d0) / (d1 - d0)))
  return '#' + c0.map((v, k) => Math.round(v + (c1[k] - v) * t).toString(16).padStart(2, '0')).join('')
}
