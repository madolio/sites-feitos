import { useState } from 'react'

// Espelha prisma/src/data/gemas.ts (IOR e dispersão) e prisma/src/cena/Gema.tsx:
// ior={gema.ior} e chromaticAberration={gema.dispersao * 8}.
// A lei de Snell e o ângulo crítico abaixo NÃO estão no site: são física
// derivada do mesmo IOR, incluída aqui só pra mostrar o que o número significa.
const gemas = [
  { id: 'diamante', nome: 'Diamante', ior: 2.417, dispersao: 0.044, cor: '#eef4ff' },
  { id: 'rubi', nome: 'Rubi', ior: 1.762, dispersao: 0.018, cor: '#c3184f' },
  { id: 'safira', nome: 'Safira', ior: 1.762, dispersao: 0.018, cor: '#1f4fb8' },
  { id: 'esmeralda', nome: 'Esmeralda', ior: 1.577, dispersao: 0.014, cor: '#0f8a52' },
  { id: 'topazio', nome: 'Topázio Imperial', ior: 1.619, dispersao: 0.014, cor: '#e8873a' },
  { id: 'ametista', nome: 'Ametista', ior: 1.544, dispersao: 0.013, cor: '#7c4fd1' },
]
const foco = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hero'
const graus = (r: number) => (r * 180) / Math.PI

export default function PrismaDemo() {
  const [id, setId] = useState('diamante')
  const [inc, setInc] = useState(45)
  const g = gemas.find((x) => x.id === id) ?? gemas[0]
  const refr = graus(Math.asin(Math.sin((inc * Math.PI) / 180) / g.ior))
  const critico = graus(Math.asin(1 / g.ior))
  const aberracao = g.dispersao * 8
  const maxIor = 2.417

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="min-w-0 space-y-6">
        <div role="group" aria-labelledby="prisma-gema">
          <p id="prisma-gema" className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            Pedra
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {gemas.map((x) => (
              <button
                key={x.id}
                type="button"
                aria-pressed={x.id === id}
                onClick={() => setId(x.id)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${foco} ${
                  x.id === id ? 'border-accent-hero bg-accent-hero text-void' : 'border-paper/30 text-paper hover:border-paper/60'
                }`}
              >
                <span aria-hidden="true" className="h-3 w-3 rounded-full border border-paper/40" style={{ backgroundColor: x.cor }} />
                {x.nome}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="prisma-inc" className="flex justify-between text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            <span>Ângulo de entrada da luz</span>
            <span className="font-mono text-paper normal-case">{inc}°</span>
          </label>
          <input
            id="prisma-inc"
            type="range"
            min={5}
            max={85}
            step={5}
            value={inc}
            onChange={(e) => setInc(Number(e.target.value))}
            className={`mt-3 w-full accent-accent-hero ${foco}`}
          />
        </div>

        <ul className="space-y-2" aria-label="IOR de cada pedra">
          {gemas.map((x) => (
            <li key={x.id} className="grid grid-cols-[6.5rem_minmax(0,1fr)_3rem] items-center gap-3 text-sm text-fog">
              <span className={x.id === id ? 'text-paper' : ''}>{x.nome.split(' ')[0]}</span>
              <span className="h-2 rounded-full bg-paper/10">
                <span
                  className={`block h-2 rounded-full ${x.id === id ? 'bg-accent-hero' : 'bg-paper/40'}`}
                  style={{ width: `${(x.ior / maxIor) * 100}%` }}
                />
              </span>
              <span className="font-mono text-paper">{x.ior.toFixed(3)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div aria-live="polite" className="min-w-0 rounded-xl border border-paper/15 bg-paper/5 p-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">{g.nome}</p>
        <p className="mt-1 font-poster text-6xl leading-none text-white md:text-7xl" data-testid="prisma-ior">
          IOR {g.ior.toFixed(3)}
        </p>
        <p className="mt-2 text-sm text-fog">
          Dispersão {g.dispersao.toFixed(3)} · <code className="font-mono">chromaticAberration</code> ={' '}
          <span data-testid="prisma-ab">{aberracao.toFixed(3)}</span>
        </p>
        <pre className="mt-5 overflow-x-auto rounded-lg bg-void p-4 font-mono text-[13px] leading-relaxed text-accent-hero">
{`Snell: sen(θ₂) = sen(θ₁) ÷ n
       = sen(${inc}°) ÷ ${g.ior.toFixed(3)}
θ₂     = ${refr.toFixed(1)}°   (dentro da pedra)
crítico = arcsen(1 ÷ ${g.ior.toFixed(3)}) = ${critico.toFixed(1)}°`}
        </pre>
        <p className="mt-3 text-sm text-fog">
          Quanto maior o IOR, mais a luz se dobra ao entrar e menor o ângulo crítico, o que prende mais luz dentro da
          pedra.
        </p>
      </div>
    </div>
  )
}
