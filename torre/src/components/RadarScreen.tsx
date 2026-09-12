import { blips, type Blip } from '../data'

// A tela de radar preenche o hero inteiro agora (não fica encolhida do lado
// da manchete) — a ideia é que a primeira coisa que aparece seja a própria
// tela do produto, como um console de verdade, e o texto flutua por cima.
// `active` é controlado pelo pai (Hero.tsx), que também usa o mesmo índice
// pro texto do blip em destaque — uma fonte só pros dois ficarem em sincronia.
export const kindColor: Record<Blip['kind'], string> = {
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

export default function RadarScreen({ active, className = '' }: { active: number; className?: string }) {
  return (
    <div className={`radar ${className}`}>
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
  )
}
