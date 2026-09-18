import { useState } from 'react'

// Espelha cardume/src/cores.ts (rampa PARADAS + hexDaAgua), cardume/src/estado.ts
// (temperatura e ndl) e a pressão/Boyle de cardume/src/cena/Oceano.tsx
// (pressao = 1 + prof/10; raio proporcional à raiz cúbica da razão de pressões).
const PARADAS: [number, string][] = [
  [0, '#8fdde3'],
  [6, '#4db4cd'],
  [14, '#1f7ea6'],
  [22, '#11557d'],
  [30, '#0a3453'],
  [40, '#04121f'],
]
const PROF_MAX = 40
const TABELA_NDL: [number, number][] = [
  [10, 219], [12, 147], [14, 98], [16, 72], [18, 56], [20, 45],
  [22, 37], [25, 29], [30, 20], [35, 14], [40, 9],
]
const CASCO = '#06283d'

const rgbDe = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
const rampa = PARADAS.map(([d, hex]) => [d, rgbDe(hex)] as const)

function hexDaAgua(d: number) {
  let i = 1
  while (i < rampa.length - 1 && d > rampa[i][0]) i++
  const [d0, c0] = rampa[i - 1]
  const [d1, c1] = rampa[i]
  const t = Math.min(1, Math.max(0, (d - d0) / (d1 - d0)))
  return '#' + c0.map((v, k) => Math.round(v + (c1[k] - v) * t).toString(16).padStart(2, '0')).join('')
}
function temperatura(d: number) {
  const t = Math.min(1, Math.max(0, (d - 10) / 10))
  return 27 - 6 * t * t * (3 - 2 * t) - 2 * (d / PROF_MAX)
}
function ndl(d: number) {
  if (d < 10) return null
  for (let i = 1; i < TABELA_NDL.length; i++) {
    const [d0, n0] = TABELA_NDL[i - 1]
    const [d1, n1] = TABELA_NDL[i]
    if (d <= d1) return Math.round(n0 + ((d - d0) / (d1 - d0)) * (n1 - n0))
  }
  return 9
}
const lin = (c: number) => {
  c /= 255
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}
const lum = (hex: string) => {
  const [r, g, b] = rgbDe(hex)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
const contraste = (a: string, b: string) => {
  const x = lum(a)
  const y = lum(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}
const nf = (n: number, d = 2) => n.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d })

export default function CardumeDemo() {
  const [prof, setProf] = useState(0)
  const foco = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hero'
  const hex = hexDaAgua(prof)
  const pressao = 1 + prof / 10
  const boyle = Math.cbrt(pressao / 1)
  const n = ndl(prof)
  const c = contraste(CASCO, hex)

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="min-w-0 space-y-6">
        <div>
          <label htmlFor="cardume-prof" className="flex justify-between text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            <span>Profundidade</span>
            <span className="font-mono text-paper normal-case">{prof} m</span>
          </label>
          <input
            id="cardume-prof"
            type="range"
            min={0}
            max={PROF_MAX}
            step={1}
            value={prof}
            onChange={(e) => setProf(Number(e.target.value))}
            className={`mt-3 w-full accent-accent-hero ${foco}`}
          />
        </div>
        <div className="flex items-center gap-4">
          <div aria-hidden="true" className="h-24 w-24 shrink-0 rounded-xl border border-paper/30" style={{ background: hex }} />
          <p className="font-mono text-sm text-paper">
            cor da água
            <br />
            <span className="text-2xl">{hex}</span>
          </p>
        </div>
        <p className="text-sm text-fog">
          A rampa tem 6 paradas (0, 6, 14, 22, 30 e 40 m); o resto é interpolação linear entre elas.
        </p>
      </div>

      <div aria-live="polite" className="min-w-0 rounded-xl border border-paper/15 bg-paper/5 p-6">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-sm">
          <dt className="text-fog">temperatura</dt>
          <dd className="text-right text-paper">{nf(temperatura(prof), 1)} °C</dd>
          <dt className="text-fog">limite sem parada (ndl)</dt>
          <dd className="text-right text-paper">{n === null ? '— (só a partir de 10 m)' : `${n} min`}</dd>
          <dt className="text-fog">pressão</dt>
          <dd className="text-right text-paper">{nf(pressao, 1)} atm</dd>
          <dt className="text-fog">bolha nascida aqui, ao chegar em 0 m</dt>
          <dd className="text-right text-paper">raio ×{nf(boyle)}</dd>
          <dt className="text-fog">texto {CASCO} sobre a água</dt>
          <dd className="text-right text-paper">
            {nf(c)}:1 {c >= 4.5 ? '(legível)' : '(ilegível)'}
          </dd>
        </dl>
        <p className="mt-4 text-sm text-fog">
          Por isso o texto escuro só existe perto da superfície: as pranchetas dos cursos são sólidas e escuras
          (#051a2a), legíveis em qualquer profundidade.
        </p>
      </div>
    </div>
  )
}
