import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// O hambúrguer é impresso como numa risografia: uma camada por tinta, cada uma
// só com as formas onde aquela tinta entra, sobrepostas com multiply.
//   alface  = azul + amarelo      → verde
//   tomate  = rosa + amarelo      → vermelho-laranja
//   carne   = as três             → marrom escuro
//   pão     = amarelo + retícula rosa → dourado
// Na entrada, as tintas "passam pela máquina" uma de cada vez e param com o
// registro levemente fora — o charme da risografia. Depois, o mouse mexe um
// pouco o registro de cada camada.

const Y = '#ffe800'
const P = '#ff48b0'
const B = '#3255a4'

const shapes = {
  bunTop: 'M70 196 C70 122 130 74 200 74 C270 74 330 122 330 196 Q330 206 320 206 L80 206 Q70 206 70 196 Z',
  lettuce:
    'M58 202 L342 202 L344 214 Q334 230 320 216 Q306 232 292 216 Q278 232 264 216 Q250 232 236 216 Q222 232 208 216 Q194 232 180 216 Q166 232 152 216 Q138 232 124 216 Q110 232 96 216 Q82 232 68 216 Q58 226 56 214 Z',
  cheese:
    'M74 222 L326 222 L326 236 L306 236 L296 258 L286 236 L220 236 L210 262 L200 236 L130 236 L120 254 L110 236 L74 236 Z',
  tomato: 'M82 236 L318 236 Q330 236 330 245 Q330 254 318 254 L82 254 Q70 254 70 245 Q70 236 82 236 Z',
  patty:
    'M86 252 L314 252 Q338 252 338 274 Q338 296 314 296 L86 296 Q62 296 62 274 Q62 252 86 252 Z',
  bunBottom: 'M78 296 L322 296 Q334 296 334 306 L334 318 Q334 334 316 334 L84 334 Q66 334 66 318 L66 306 Q66 296 78 296 Z',
}

const seeds = [
  [150, 118, -20],
  [196, 100, 5],
  [244, 116, 25],
  [120, 152, -35],
  [172, 140, -8],
  [222, 138, 12],
  [276, 150, 30],
  [150, 178, -15],
  [200, 170, 0],
  [254, 176, 18],
] as const

// Registro final de cada tinta (desalinhado de propósito).
const registration = {
  yellow: { x: 0, y: 0 },
  pink: { x: 5, y: -3 },
  blue: { x: -4, y: 4 },
}

export default function RisoBurger() {
  const root = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      const svg = root.current
      if (!svg) return

      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const order = ['yellow', 'pink', 'blue'] as const
        const tl = gsap.timeline({ delay: 0.2 })
        order.forEach((ink, i) => {
          tl.fromTo(
            `.ink-${ink}`,
            { x: -60, y: 0, opacity: 0 },
            { ...registration[ink], opacity: 1, duration: 0.55, ease: 'power4.out' },
            i * 0.32,
          )
        })

        const movers = order.map((ink) => ({
          x: gsap.quickTo(`.ink-${ink}`, 'x', { duration: 0.6, ease: 'power3.out' }),
          y: gsap.quickTo(`.ink-${ink}`, 'y', { duration: 0.6, ease: 'power3.out' }),
        }))
        const strength = { yellow: 0, pink: 6, blue: -6 }

        const onMove = (e: PointerEvent) => {
          if (tl.isActive()) return
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          order.forEach((ink, i) => {
            movers[i].x(registration[ink].x + nx * strength[ink])
            movers[i].y(registration[ink].y + ny * strength[ink])
          })
        }
        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
      })
    },
    { scope: root },
  )

  return (
    <svg
      ref={root}
      viewBox="0 0 400 380"
      className="h-auto w-full"
      style={{ isolation: 'isolate' }}
      role="img"
      aria-label="Ilustração de um hambúrguer impresso em risografia"
    >
      <defs>
        <pattern id="ht-pink" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(75)">
          <circle cx="3.5" cy="3.5" r="2.3" fill={P} />
        </pattern>
        <pattern id="ht-blue" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <circle cx="3" cy="3" r="1.5" fill={B} />
        </pattern>
      </defs>

      {/* sombra em retícula azul */}
      <ellipse cx="200" cy="350" rx="150" ry="14" fill="url(#ht-blue)" style={{ mixBlendMode: 'multiply' }} />

      <g className="ink-yellow" style={{ mixBlendMode: 'multiply' }} transform={`translate(${registration.yellow.x} ${registration.yellow.y})`}>
        <path d={shapes.bunTop} fill={Y} />
        <path d={shapes.lettuce} fill={Y} />
        <path d={shapes.cheese} fill={Y} />
        <path d={shapes.tomato} fill={Y} />
        <path d={shapes.patty} fill={Y} />
        <path d={shapes.bunBottom} fill={Y} />
      </g>

      <g className="ink-pink" style={{ mixBlendMode: 'multiply' }} transform={`translate(${registration.pink.x} ${registration.pink.y})`}>
        <path d={shapes.bunTop} fill="url(#ht-pink)" />
        <path d={shapes.tomato} fill={P} />
        <path d={shapes.patty} fill={P} />
        <path d={shapes.bunBottom} fill="url(#ht-pink)" />
      </g>

      <g className="ink-blue" style={{ mixBlendMode: 'multiply' }} transform={`translate(${registration.blue.x} ${registration.blue.y})`}>
        <path d={shapes.lettuce} fill={B} />
        <path d={shapes.patty} fill={B} />
        {/* traço-chave: contorno azul, como a matriz de linha de um cartaz */}
        <g fill="none" stroke={B} strokeWidth="3" strokeLinejoin="round">
          <path d={shapes.bunTop} />
          <path d={shapes.cheese} />
          <path d={shapes.bunBottom} />
        </g>
      </g>

      {/* gergelim: papel sem tinta */}
      <g fill="#fbfaf5">
        {seeds.map(([x, y, r]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="7" ry="3.6" transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </g>
    </svg>
  )
}
