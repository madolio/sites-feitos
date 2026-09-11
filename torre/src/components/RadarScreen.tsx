import { useEffect, useState } from 'react'
import { blips, type Blip } from '../data'

// A tela de radar: cada agendamento é um blip posicionado por ângulo/raio
// polar. Os blips "novos" pulsam (CSS puro, sem JS), e um deles por vez fica
// em destaque com o rótulo visível — como o retorno de eco de um radar de
// verdade, que só mostra o alvo que acabou de ser varrido.

const kindColor: Record<Blip['kind'], string> = {
  novo: 'var(--color-amber)',
  confirmado: 'var(--color-cyan)',
  risco: '#e2554a',
}

function toXY(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  const x = 50 + Math.cos(rad) * radius * 46
  const y = 50 + Math.sin(rad) * radius * 46
  return { x, y }
}

export default function RadarScreen() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % blips.length), 2600)
    return () => window.clearInterval(id)
  }, [])

  const current = blips[active]

  return (
    <div>
      <div className="radar mx-auto aspect-square w-full max-w-md">
        <div className="radar-ring" style={{ inset: '0%' }} />
        <div className="radar-ring" style={{ inset: '16.5%' }} />
        <div className="radar-ring" style={{ inset: '33%' }} />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <line x1="50" y1="4" x2="50" y2="96" stroke="rgba(53,214,201,0.12)" strokeWidth="0.4" />
          <line x1="4" y1="50" x2="96" y2="50" stroke="rgba(53,214,201,0.12)" strokeWidth="0.4" />
          {blips.map((b, i) => {
            const { x, y } = toXY(b.angle, b.radius)
            const isActive = i === active
            return (
              <g key={b.id}>
                {b.kind === 'novo' && (
                  <circle cx={x} cy={y} r="2" fill="none" stroke={kindColor[b.kind]} strokeWidth="0.5" className="blip-pulse" />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isActive ? 2.2 : 1.4}
                  fill={kindColor[b.kind]}
                  className="transition-[r] duration-300"
                />
              </g>
            )
          })}
        </svg>
      </div>

      <div aria-live="polite" className="panel mono mx-auto mt-6 max-w-md px-5 py-4 text-sm">
        <div className="flex items-center justify-between gap-3">
          <span style={{ color: kindColor[current.kind] }} className="font-semibold uppercase">
            {current.kind === 'novo' ? 'novo' : current.kind === 'risco' ? 'confirmar' : 'confirmado'}
          </span>
          <span className="text-ink-dim">{current.time}</span>
        </div>
        <p className="mt-1.5 text-ink">{current.label}</p>
      </div>
    </div>
  )
}
