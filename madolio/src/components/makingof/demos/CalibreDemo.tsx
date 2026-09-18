import { useEffect, useState } from 'react'

// Espelha calibre/src/components/RelogioNav.tsx: mesmos ângulos dos ponteiros
// (horas = (h%12 + min/60)*30, minutos = (min + seg/60)*6, segundos = seg*6),
// mesma função ponto() e as mesmas três marcas clicáveis em 0°, 120° e 240°
// (12, 4 e 8 no mostrador). Aqui as marcas só mostram pra onde levariam.
const secoes = [
  { id: 'catalogo', label: 'Modelos', angulo: 0, numero: 12 },
  { id: 'processo', label: 'Como nasce', angulo: 120, numero: 4 },
  { id: 'contato', label: 'Encomendar', angulo: 240, numero: 8 },
]

function ponto(angulo: number, raio: number) {
  const rad = ((angulo - 90) * Math.PI) / 180
  return { x: 100 + Math.cos(rad) * raio, y: 100 + Math.sin(rad) * raio }
}

const dois = (n: number) => String(n).padStart(2, '0')

export default function CalibreDemo() {
  const [agora, setAgora] = useState(() => new Date())
  const [manual, setManual] = useState('')
  const [escolhida, setEscolhida] = useState('catalogo')
  const [reduzido] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (reduzido || manual) return
    const id = window.setInterval(() => setAgora(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [reduzido, manual])

  let h = agora.getHours()
  let m = agora.getMinutes()
  let s = agora.getSeconds()
  if (manual) {
    const [hh, mm] = manual.split(':').map(Number)
    h = hh
    m = mm
    s = 0
  }

  const anguloH = ((h % 12) + m / 60) * 30
  const anguloM = (m + s / 60) * 6
  const anguloS = s * 6
  const ph = ponto(anguloH, 46)
  const pm = ponto(anguloM, 66)
  const ps = ponto(anguloS, 74)
  const marcas = Array.from({ length: 12 }, (_, i) => ({
    a: ponto(i * 30, i % 3 === 0 ? 74 : 82),
    b: ponto(i * 30, 90),
    forte: i % 3 === 0,
  }))
  const foco = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hero'
  const sel = secoes.find((x) => x.id === escolhida) ?? secoes[0]

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
      <div className="mx-auto w-full max-w-[20rem]">
        <svg
          viewBox="0 0 200 200"
          className="h-auto w-full"
          role="img"
          aria-label={`Mostrador analógico marcando ${dois(h)}:${dois(m)}`}
        >
          <circle cx={100} cy={100} r={90} fill="#120d08" stroke="#caa25e" strokeWidth={1.5} />
          {marcas.map((mk, i) => (
            <line
              key={i}
              x1={mk.a.x}
              y1={mk.a.y}
              x2={mk.b.x}
              y2={mk.b.y}
              stroke="#ede3d0"
              strokeOpacity={0.5}
              strokeWidth={mk.forte ? 2.5 : 1}
              strokeLinecap="round"
            />
          ))}
          {secoes.map((x) => {
            const p = ponto(x.angulo, 78)
            const on = escolhida === x.id
            return <circle key={x.id} cx={p.x} cy={p.y} r={on ? 7 : 5} fill={on ? '#caa25e' : '#ede3d0'} />
          })}
          <line x1={100} y1={100} x2={ph.x} y2={ph.y} stroke="#caa25e" strokeWidth={4} strokeLinecap="round" />
          <line x1={100} y1={100} x2={pm.x} y2={pm.y} stroke="#caa25e" strokeWidth={2.75} strokeLinecap="round" />
          <line x1={100} y1={100} x2={ps.x} y2={ps.y} stroke="#6f9bb8" strokeWidth={1} strokeLinecap="round" />
          <circle cx={100} cy={100} r={3.5} fill="#caa25e" />
        </svg>
      </div>

      <div className="min-w-0 space-y-6">
        <div>
          <label htmlFor="calibre-hora" className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            Ajustar a hora (vazio = a sua hora real)
          </label>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <input
              id="calibre-hora"
              type="time"
              value={manual}
              onChange={(e) => setManual(e.target.value)}
              className={`rounded-lg border border-paper/30 bg-void px-4 py-3 text-paper [color-scheme:dark] ${foco}`}
            />
            <button
              type="button"
              onClick={() => {
                setManual('')
                setAgora(new Date())
              }}
              className={`rounded-lg border border-paper/30 px-4 py-3 text-paper ${foco}`}
            >
              Voltar à hora real
            </button>
          </div>
          {reduzido && <p className="mt-2 text-sm text-fog">Movimento reduzido ativo: os ponteiros ficam parados.</p>}
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">Números que navegam</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {secoes.map((x) => (
              <button
                key={x.id}
                type="button"
                aria-pressed={escolhida === x.id}
                onClick={() => setEscolhida(x.id)}
                className={`rounded-full border px-4 py-2 text-sm ${escolhida === x.id ? 'border-accent-hero bg-accent-hero text-void' : 'border-paper/30 text-paper'} ${foco}`}
              >
                {x.numero} · {x.label}
              </button>
            ))}
          </div>
        </div>

        <dl
          aria-live="polite"
          className="grid grid-cols-2 gap-x-6 gap-y-2 border-t border-paper/15 pt-5 font-mono text-sm text-fog"
        >
          <dt>Hora</dt>
          <dd data-testid="hora" className="text-paper">
            {dois(h)}:{dois(m)}
          </dd>
          <dt>Ponteiro das horas</dt>
          <dd data-testid="ang-h" className="text-paper">
            {anguloH.toFixed(1)}°
          </dd>
          <dt>Ponteiro dos minutos</dt>
          <dd data-testid="ang-m" className="text-paper">
            {anguloM.toFixed(1)}°
          </dd>
          <dt>Marca {sel.numero}</dt>
          <dd data-testid="marca" className="text-paper">
            {sel.angulo}° → #{sel.id}
          </dd>
        </dl>
      </div>
    </div>
  )
}
