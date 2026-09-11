import type { ReactNode } from 'react'
import type { DocinhoKind } from '../data'

// Docinho visto de cima, dentro da forminha plissada. Cobertura (granulado,
// coco, açúcar, pistache) gerada com um aleatório de semente fixa, pra sair
// sempre igual.

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function scallop(r: number, depth: number, bumps: number) {
  const steps = bumps * 10
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const rr = r - depth * (1 - Math.abs(Math.sin((t * bumps) / 2)))
    d += `${i === 0 ? 'M' : 'L'}${(60 + Math.cos(t) * rr).toFixed(2)} ${(60 + Math.sin(t) * rr).toFixed(2)}`
  }
  return `${d}Z`
}

const CUP = scallop(55, 4, 26)
const CUP_INNER = scallop(46, 2.5, 26)

type Scatter = { x: number; y: number; rot: number; i: number }

function scatter(seed: number, count: number, radius: number, cx = 60, cy = 60): Scatter[] {
  const rnd = seeded(seed)
  return Array.from({ length: count }, (_, i) => {
    const a = rnd() * Math.PI * 2
    const d = Math.sqrt(rnd()) * radius
    return { x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d, rot: rnd() * 180, i }
  })
}

const recipes: Record<
  DocinhoKind,
  { cup: string; base: string; light: string; topping: (id: string) => ReactNode }
> = {
  brigadeiro: {
    cup: '#d8c2a3',
    base: '#4b2519',
    light: '#7a4a36',
    topping: () =>
      scatter(7, 80, 29).map((s) => (
        <rect
          key={s.i}
          x={s.x - 2.3}
          y={s.y - 0.9}
          width="4.6"
          height="1.8"
          rx="0.9"
          fill={['#2a130b', '#5c3322', '#3a1c12'][s.i % 3]}
          transform={`rotate(${s.rot} ${s.x} ${s.y})`}
        />
      )),
  },
  beijinho: {
    cup: '#fbf6ee',
    base: '#efe5d3',
    light: '#fffaf2',
    topping: () => (
      <>
        {scatter(11, 70, 29).map((s) => (
          <rect
            key={s.i}
            x={s.x - 1.8}
            y={s.y - 0.4}
            width="3.6"
            height="0.8"
            rx="0.4"
            fill={s.i % 2 ? '#fffdf8' : '#d9c8ab'}
            transform={`rotate(${s.rot} ${s.x} ${s.y})`}
          />
        ))}
        <Clove x={60} y={58} />
      </>
    ),
  },
  'bicho-de-pe': {
    cup: '#f7d3da',
    base: '#e98aa2',
    light: '#f6b9c8',
    topping: () =>
      scatter(23, 90, 30).map((s) => (
        <rect
          key={s.i}
          x={s.x - 0.8}
          y={s.y - 0.8}
          width="1.6"
          height="1.6"
          fill={s.i % 3 ? '#fff6f8' : '#ffffff'}
          opacity="0.85"
          transform={`rotate(${s.rot} ${s.x} ${s.y})`}
        />
      )),
  },
  casadinho: {
    cup: '#efe4d6',
    base: '#4b2519',
    light: '#7a4a36',
    topping: (id) => (
      <>
        <path d="M60 28 A32 32 0 0 1 60 92 Z" fill={`url(#${id}-cream)`} />
        {scatter(5, 40, 28)
          .filter((s) => s.x < 57)
          .map((s) => (
            <rect
              key={s.i}
              x={s.x - 2.2}
              y={s.y - 0.9}
              width="4.4"
              height="1.8"
              rx="0.9"
              fill="#2a130b"
              transform={`rotate(${s.rot} ${s.x} ${s.y})`}
            />
          ))}
      </>
    ),
  },
  pistache: {
    cup: '#e3ecd2',
    base: '#97b262',
    light: '#bfd28f',
    topping: () =>
      scatter(31, 24, 25).map((s) => (
        <path
          key={s.i}
          d={`M${s.x - 2.6} ${s.y} l2 -2.4 l3 0.8 l-0.6 2.8 l-3 0.6 z`}
          fill={['#6e8c3a', '#cfe0a5', '#8f6c94'][s.i % 3]}
          transform={`rotate(${s.rot} ${s.x} ${s.y})`}
        />
      )),
  },
  'olho-de-sogra': {
    cup: '#f5e6b8',
    base: '#eecd6d',
    light: '#f7e4a6',
    topping: () => (
      <>
        <ellipse cx="60" cy="60" rx="23" ry="15" fill="#3b1d2e" />
        <ellipse cx="60" cy="58" rx="20" ry="11" fill="#55293f" opacity="0.6" />
        <ellipse cx="60" cy="60" rx="14" ry="6.5" fill="#f7ecd0" />
        <Clove x={60} y={60} />
      </>
    ),
  },
}

function Clove({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {[45, 135, 225, 315].map((a) => (
        <ellipse
          key={a}
          cx={x + Math.cos((a * Math.PI) / 180) * 2.6}
          cy={y + Math.sin((a * Math.PI) / 180) * 2.6}
          rx="1.9"
          ry="1.2"
          fill="#4a2a17"
          transform={`rotate(${a} ${x + Math.cos((a * Math.PI) / 180) * 2.6} ${y + Math.sin((a * Math.PI) / 180) * 2.6})`}
        />
      ))}
      <circle cx={x} cy={y} r="2.3" fill="#2e180c" />
    </g>
  )
}

export default function Docinho({ kind, className = '' }: { kind: DocinhoKind; className?: string }) {
  const recipe = recipes[kind]
  const id = `doce-${kind}`

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-shade`} cx="38%" cy="34%" r="70%">
          <stop offset="0%" stopColor={recipe.light} />
          <stop offset="100%" stopColor={recipe.base} />
        </radialGradient>
        <radialGradient id={`${id}-cream`} cx="60%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#fffaf2" />
          <stop offset="100%" stopColor="#efe5d3" />
        </radialGradient>
      </defs>
      <path d={CUP} fill={recipe.cup} stroke="rgba(51,25,15,0.14)" strokeWidth="0.8" />
      <path d={CUP_INNER} fill="rgba(51,25,15,0.06)" />
      <circle cx="60" cy="63" r="33" fill="rgba(51,25,15,0.18)" />
      <circle cx="60" cy="60" r="32" fill={`url(#${id}-shade)`} />
      {recipe.topping(id)}
    </svg>
  )
}
