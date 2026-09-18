import { useMemo, useState } from 'react'

// Espelha lumen/src/components/Calculadora.tsx (N = ceil(E×A ÷ (F×UF×MF))),
// lumen/src/data/ambientes.ts, lumen/src/data/luminarias.ts e a conversão
// Kelvin→RGB de lumen/src/cor.ts (aproximação de Tanner Helland).
const UF = 0.7
const MF = 0.8
const ambientes = [
  { id: 'estar', nome: 'Sala de estar', lux: 150 },
  { id: 'cozinha', nome: 'Cozinha', lux: 300 },
  { id: 'escritorio', nome: 'Escritório / leitura', lux: 500 },
  { id: 'precisao', nome: 'Trabalho de precisão', lux: 750 },
]
const luminarias = [
  { id: 'trilho', nome: 'Spot de trilho', watts: 12, lumens: 900, angulo: 24, kelvin: 3000 },
  { id: 'pendente', nome: 'Pendente', watts: 15, lumens: 1350, angulo: 110, kelvin: 2700 },
  { id: 'embutido', nome: 'Embutido de teto', watts: 18, lumens: 1800, angulo: 100, kelvin: 4000 },
  { id: 'arandela', nome: 'Arandela', watts: 8, lumens: 500, angulo: 160, kelvin: 2700 },
  { id: 'fita', nome: 'Fita LED', watts: 9.6, lumens: 720, angulo: 180, kelvin: 6000 },
]

function kelvinParaRgb(kelvin: number) {
  const k = kelvin / 100
  let r: number
  let g: number
  let b: number
  if (k <= 66) {
    r = 255
    g = 99.4708025861 * Math.log(k) - 161.1195681661
  } else {
    r = 329.698727446 * Math.pow(k - 60, -0.1332047592)
    g = 288.1221695283 * Math.pow(k - 60, -0.0755148492)
  }
  if (k >= 66) b = 255
  else if (k <= 19) b = 0
  else b = 138.5177312231 * Math.log(k - 10) - 305.0447927307
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v)))
  return { r: c(r), g: c(g), b: c(b) }
}

const num = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 })
const foco = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hero'

export default function LumenDemo() {
  const [largura, setLargura] = useState(4)
  const [comprimento, setComprimento] = useState(5)
  const [ambId, setAmbId] = useState('estar')
  const [lumId, setLumId] = useState('pendente')

  const amb = ambientes.find((a) => a.id === ambId) ?? ambientes[0]
  const lum = luminarias.find((l) => l.id === lumId) ?? luminarias[0]

  const c = useMemo(() => {
    const area = largura * comprimento
    const bruto = (amb.lux * area) / (lum.lumens * UF * MF)
    const n = Math.max(1, Math.ceil(bruto))
    const rgb = kelvinParaRgb(lum.kelvin)
    const meio = Math.tan((lum.angulo / 2) * (Math.PI / 180))
    return { area, bruto, n, potencia: n * lum.watts, rgb, meio }
  }, [largura, comprimento, amb, lum])

  const cor = `rgb(${c.rgb.r} ${c.rgb.g} ${c.rgb.b})`
  // cone: altura fixa 100, meia-largura = altura × tan(ângulo/2), limitada à caixa do SVG
  const h = 100
  const meiaW = Math.min(100, h * c.meio)

  const campos = [
    { id: 'lumen-l', rot: 'Largura (m)', v: largura, set: setLargura },
    { id: 'lumen-c', rot: 'Comprimento (m)', v: comprimento, set: setComprimento },
  ]

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="min-w-0 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {campos.map((f) => (
            <div key={f.id} className="min-w-0">
              <label htmlFor={f.id} className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
                {f.rot}
              </label>
              <input
                id={f.id}
                type="number"
                min={1}
                max={20}
                step={0.5}
                value={f.v}
                onChange={(e) => f.set(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
                className={`mt-2 w-full rounded-lg border border-paper/30 bg-void px-4 py-3 font-mono text-paper ${foco}`}
              />
            </div>
          ))}
        </div>

        <div role="group" aria-labelledby="lumen-amb">
          <p id="lumen-amb" className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            Ambiente (lux de referência)
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ambientes.map((a) => (
              <button
                key={a.id}
                type="button"
                aria-pressed={a.id === ambId}
                onClick={() => setAmbId(a.id)}
                className={`rounded-lg border px-3 py-2 text-sm transition-colors ${foco} ${
                  a.id === ambId ? 'border-accent-hero bg-accent-hero text-void' : 'border-paper/30 text-paper hover:border-paper/60'
                }`}
              >
                {a.nome} · {a.lux} lx
              </button>
            ))}
          </div>
        </div>

        <div role="group" aria-labelledby="lumen-lum">
          <p id="lumen-lum" className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            Luminária
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {luminarias.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={l.id === lumId}
                onClick={() => setLumId(l.id)}
                className={`rounded-lg border px-3 py-2 text-sm transition-colors ${foco} ${
                  l.id === lumId ? 'border-accent-hero bg-accent-hero text-void' : 'border-paper/30 text-paper hover:border-paper/60'
                }`}
              >
                {l.nome} · {l.lumens} lm
              </button>
            ))}
          </div>
        </div>
      </div>

      <div aria-live="polite" className="min-w-0 rounded-xl border border-paper/15 bg-paper/5 p-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">Luminárias necessárias</p>
        <p className="mt-1 font-poster text-6xl leading-none text-white md:text-7xl" data-testid="lumen-n">
          {c.n}
        </p>
        <p className="mt-2 text-sm text-fog">
          Área {num.format(c.area)} m² · potência total {num.format(c.potencia)} W
        </p>

        <pre className="mt-5 overflow-x-auto rounded-lg bg-void p-4 font-mono text-[13px] leading-relaxed text-accent-hero">
{`N = E × A ÷ (F × UF × MF)
  = ${amb.lux} × ${num.format(c.area)} ÷ (${lum.lumens} × ${UF} × ${MF})
  = ${num.format(c.bruto)}  →  arredonda pra cima: ${c.n}`}
        </pre>

        <div className="mt-5 flex items-center gap-5">
          <svg viewBox="-100 0 200 100" width="120" height="60" role="img" aria-label={`Cone de luz de ${lum.angulo} graus`} className="shrink-0">
            <polygon points={`0,0 ${-meiaW},${h} ${meiaW},${h}`} fill={cor} fillOpacity="0.85" />
          </svg>
          <p className="min-w-0 text-sm text-fog">
            Feixe de {lum.angulo}° (largura = altura × tan({lum.angulo / 2}°)). {lum.kelvin} K vira{' '}
            <span className="font-mono text-paper">
              rgb({c.rgb.r} {c.rgb.g} {c.rgb.b})
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
