import { useMemo, useState } from 'react'

// Espelha torno/src/data.ts (formas prontas e esmaltes), torno/src/estado.ts
// (N = 64 amostras, medidas(): altura, diâmetro e tipo) e a mistura do esmalte
// cru de torno/src/cena/Atelie.tsx (cor misturada 58% com branco).
const N = 64
type Forma = 'barro' | 'vaso' | 'tigela' | 'caneca'
const suave = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const formas: Record<Forma, { nome: string; altura: number; raio: (t: number) => number }> = {
  barro: { nome: 'Barro', altura: 1.15, raio: (t) => 0.74 * Math.sqrt(1 - 0.55 * t * t) },
  vaso: {
    nome: 'Vaso',
    altura: 2.2,
    raio: (t) =>
      0.45 + 0.5 * Math.exp(-(((t - 0.38) / 0.22) ** 2)) - 0.18 * Math.exp(-(((t - 0.82) / 0.08) ** 2)) + 0.12 * suave(0.88, 1, t),
  },
  tigela: { nome: 'Tigela', altura: 0.95, raio: (t) => 0.42 + 0.85 * (1 - (1 - t) ** 2) },
  caneca: { nome: 'Caneca', altura: 1.3, raio: (t) => 0.62 - 0.03 * t + 0.025 * suave(0.93, 1, t) },
}
const esmaltes = [
  { id: 'cobalto', nome: 'Cobalto', cor: '#1f3c88', onCor: '#ffffff' },
  { id: 'celadon', nome: 'Celadon', cor: '#7fa38c', onCor: '#1d1b18' },
  { id: 'tenmoku', nome: 'Tenmoku', cor: '#2b1a12', onCor: '#ffffff' },
  { id: 'shino', nome: 'Shino', cor: '#e7d6bd', onCor: '#1d1b18' },
  { id: 'oxido', nome: 'Óxido', cor: '#8b2e1a', onCor: '#ffffff' },
]

const rgbDe = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
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
const cru = (hex: string) =>
  '#' + rgbDe(hex).map((v) => Math.round(v + (255 - v) * 0.58).toString(16).padStart(2, '0')).join('')

export default function TornoDemo() {
  const [forma, setForma] = useState<Forma>('vaso')
  const [esmalte, setEsmalte] = useState('cobalto')
  const foco = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hero'
  const g = esmaltes.find((e) => e.id === esmalte) ?? esmaltes[0]

  const p = useMemo(() => {
    const f = formas[forma]
    const raio = Array.from({ length: N }, (_, i) => Math.fround(f.raio(i / (N - 1))))
    const maior = Math.max(...raio)
    let menorNoTopo = Infinity
    for (let i = Math.floor(N * 0.6); i < N; i++) menorNoTopo = Math.min(menorNoTopo, raio[i])
    const altura = Math.round(f.altura * 10)
    const diametro = Math.round(maior * 20)
    const razao = altura / diametro
    const tipo = razao < 0.62 ? 'Tigela' : menorNoTopo < maior * 0.72 || razao > 1.4 ? 'Vaso' : razao >= 0.9 ? 'Copo' : 'Pote'
    const k = 60
    const pts = raio.map((r, i) => [r * k, 150 - (i / (N - 1)) * f.altura * k])
    const d =
      'M' +
      pts.map(([x, y]) => `${(100 + x).toFixed(1)},${y.toFixed(1)}`).join(' L') +
      ' L' +
      [...pts].reverse().map(([x, y]) => `${(100 - x).toFixed(1)},${y.toFixed(1)}`).join(' L') +
      ' Z'
    return { altura, diametro, tipo, d }
  }, [forma])

  const botao = (ativo: boolean) =>
    `rounded-lg border px-2 py-3 text-sm transition-colors ${foco} ${
      ativo ? 'border-accent-hero bg-accent-hero text-void' : 'border-paper/30 text-paper hover:border-paper/60'
    }`

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="min-w-0 space-y-6">
        <div role="group" aria-labelledby="torno-forma">
          <p id="torno-forma" className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            Forma pronta
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(Object.keys(formas) as Forma[]).map((k) => (
              <button key={k} type="button" aria-pressed={forma === k} onClick={() => setForma(k)} className={botao(forma === k)}>
                {formas[k].nome}
              </button>
            ))}
          </div>
        </div>
        <div role="group" aria-labelledby="torno-esmalte">
          <p id="torno-esmalte" className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            Esmalte
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {esmaltes.map((e) => (
              <button key={e.id} type="button" aria-pressed={esmalte === e.id} onClick={() => setEsmalte(e.id)} className={botao(esmalte === e.id)}>
                {e.nome}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div aria-live="polite" className="min-w-0 rounded-xl border border-paper/15 bg-paper/5 p-6">
        <div className="flex items-end gap-6">
          <svg
            viewBox="0 0 200 160"
            role="img"
            aria-label={`Silhueta de ${formas[forma].nome.toLowerCase()} em esmalte ${g.nome}`}
            className="h-40 w-auto shrink-0"
          >
            <path d={p.d} fill={g.cor} stroke="#ffffff" strokeOpacity="0.6" />
          </svg>
          <div aria-hidden="true" className="rounded-lg px-3 py-2 font-mono text-xs" style={{ background: g.cor, color: g.onCor }}>
            {g.cor}
            <br />
            texto {g.onCor}
          </div>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm">
          <dt className="text-fog">altura</dt>
          <dd className="text-right text-paper">{p.altura} cm</dd>
          <dt className="text-fog">diâmetro</dt>
          <dd className="text-right text-paper">{p.diametro} cm</dd>
          <dt className="text-fog">o site chama de</dt>
          <dd className="text-right text-paper">{p.tipo}</dd>
          <dt className="text-fog">esmalte cru (antes do forno)</dt>
          <dd className="text-right text-paper">{cru(g.cor)}</dd>
          <dt className="text-fog">contraste do texto sobre o esmalte</dt>
          <dd className="text-right text-paper">
            {contraste(g.cor, g.onCor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}:1
          </dd>
        </dl>
      </div>
    </div>
  )
}
