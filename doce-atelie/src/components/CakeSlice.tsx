import { massas, recheios, tamanhos } from '../data'
import { formatDate, type Order } from '../order'

// Corte transversal do bolo: massa / recheio / massa / recheio / massa, com a
// cobertura em volta. As cores são as mesmas das tiras da cartela — o sabor
// escolhido vira literalmente a camada — e a largura acompanha o tamanho.

const EMPTY = 'rgba(255, 252, 247, 0.06)'
const EMPTY_STROKE = 'rgba(255, 252, 247, 0.35)'

// Migalhas fixas (pseudo-aleatórias, mas iguais em todo render).
const crumbs = Array.from({ length: 46 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1
  return { x: 28 + r(1) * 284, layer: i % 3, y: r(2), size: 1 + r(3) * 1.6 }
})

export default function CakeSlice({ order }: { order: Order }) {
  const size = tamanhos.find((t) => t.id === order.size)
  const massa = massas.find((m) => m.id === order.massa)
  const chosen = order.recheios.map((id) => recheios.find((r) => r.id === id)).filter((r) => r !== undefined)
  const first = chosen[0]
  const second = chosen[1] ?? chosen[0]
  const scale = size ? size.diameter / 26 : 0.86

  // De baixo pra cima.
  const layers = [
    { kind: 'massa', h: 40, color: massa?.color },
    { kind: 'recheio', h: 15, color: first?.color },
    { kind: 'massa', h: 40, color: massa?.color },
    { kind: 'recheio', h: 15, color: second?.color },
    { kind: 'massa', h: 40, color: massa?.color },
  ] as const

  const bottom = 196
  let y = bottom
  const placed = layers.map((layer) => {
    y -= layer.h
    return { ...layer, y }
  })
  const top = y

  return (
    <figure className="mx-auto max-w-md lg:max-w-none">
      <svg viewBox="0 0 340 240" className="w-full" role="img" aria-label="Prévia do corte do bolo com as camadas escolhidas">
        <defs>
          <linearGradient id="cake-shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.14" />
          </linearGradient>
          <radialGradient id="cake-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* sombra de contato no prato */}
        <ellipse cx="170" cy={bottom + 10} rx="150" ry="10" fill="url(#cake-shadow)" />

        <g className="cake-body" style={{ transform: `scaleX(${scale})` }}>
          {/* cobertura em volta (parede do bolo), com leve gradiente pra dar volume */}
          <rect
            x="16"
            y={top - 12}
            width="308"
            height={bottom - top + 14}
            rx="12"
            fill="#fbf1e3"
            opacity={massa ? 1 : 0.1}
            className="cake-layer"
          />
          <rect
            x="16"
            y={top - 12}
            width="308"
            height={bottom - top + 14}
            rx="12"
            fill="url(#cake-shade)"
            opacity={massa ? 1 : 0}
            className="cake-layer"
          />
          {placed.map((layer, i) => (
            <g key={i}>
              <rect
                x="24"
                y={layer.y}
                width="292"
                height={layer.h}
                rx={layer.kind === 'recheio' ? 7 : 3}
                fill={layer.color ?? EMPTY}
                stroke={layer.color ? 'transparent' : EMPTY_STROKE}
                strokeDasharray={layer.color ? undefined : '5 5'}
                className="cake-layer"
              />
              {layer.color && (
                <rect
                  x="24"
                  y={layer.y}
                  width="292"
                  height={Math.max(2, layer.h * 0.22)}
                  rx={layer.kind === 'recheio' ? 7 : 3}
                  fill="#fff"
                  opacity={layer.kind === 'recheio' ? 0.14 : 0.09}
                  className="cake-layer"
                />
              )}
            </g>
          ))}
          {massa &&
            crumbs.map((c, i) => {
              const layer = placed.filter((l) => l.kind === 'massa')[c.layer]
              return (
                <circle
                  key={i}
                  cx={c.x}
                  cy={layer.y + 6 + c.y * (layer.h - 12)}
                  r={c.size}
                  fill="rgba(0,0,0,0.12)"
                />
              )
            })}
          {/* fita de cobertura ondulada no topo — só aparece com massa escolhida */}
          {massa && (
            <path
              d={`M16 ${top - 12} Q 46 ${top - 22}, 76 ${top - 12} T 136 ${top - 12} T 196 ${top - 12} T 256 ${top - 12} T 324 ${top - 12} V ${top - 2} H16 Z`}
              fill="#fbf1e3"
              className="cake-layer"
            />
          )}
        </g>
        {/* prato */}
        <rect x="6" y={bottom + 2} width="328" height="7" rx="3.5" fill="#fffcf7" opacity="0.9" />
        <path d={`M150 ${bottom + 9} h40 l10 26 h-60 z`} fill="#fffcf7" opacity="0.5" />
      </svg>

      <figcaption className="mt-6 grid gap-3 text-card sm:grid-cols-2">
        <Line label="Tamanho" value={size ? `${size.diameter} cm, serve ${size.serves}` : null} />
        <Line label="Massa" value={massa?.name} swatch={massa?.color} />
        <Line
          label="Recheio"
          value={chosen.length ? chosen.map((r) => r.name).join(' e ') : null}
          swatch={first?.color}
        />
        <Line label="Data" value={order.date ? formatDate(order.date) : null} />
      </figcaption>
    </figure>
  )
}

function Line({ label, value, swatch }: { label: string; value?: string | null; swatch?: string }) {
  return (
    <div className="border-t border-card/15 pt-3">
      <p className="text-sm text-card/60">{label}</p>
      <p className="mt-0.5 flex items-center gap-2 font-semibold">
        {swatch && <span className="h-3.5 w-3.5 shrink-0 rounded-[3px]" style={{ background: swatch }} />}
        {value ?? <span className="font-normal text-card/60">a escolher</span>}
      </p>
    </div>
  )
}
