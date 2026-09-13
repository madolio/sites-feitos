import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// Grade de ruas simplificada + duas rotas ativas — o "mapa" do painel. Um
// ponto percorre a rota principal em loop (waypoint a waypoint, mesma
// técnica de animação por trechos retos usada no TreatmentDiagram da
// Nascente, sem precisar de MotionPathPlugin).
const waypoints: [number, number][] = [
  [60, 300],
  [60, 180],
  [220, 180],
  [220, 80],
  [420, 80],
  [420, 220],
  [540, 220],
]

const rotaPrincipal = waypoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
const rotaSecundaria = 'M60,300 L300,300 L300,140 L540,140'

export default function MapaRotas() {
  const root = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const dot = root.current?.querySelector('[data-veiculo]')
        if (!dot) return

        const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } })
        gsap.set(dot, { x: waypoints[0][0], y: waypoints[0][1] })
        for (let i = 1; i < waypoints.length; i++) {
          const [x, y] = waypoints[i]
          const [px, py] = waypoints[i - 1]
          const dist = Math.hypot(x - px, y - py)
          tl.to(dot, { x, y, duration: dist / 140 })
        }
        tl.to({}, { duration: 0.6 })
      })
    },
    { scope: root },
  )

  return (
    <svg ref={root} viewBox="0 0 600 360" className="h-auto w-full" role="img" aria-label="Mapa com duas rotas de entrega ativas e um veículo em trânsito na rota principal">
      <g stroke="#e2e4e9" strokeWidth="1.5">
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="360" />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 90} x2="600" y2={i * 90} />
        ))}
      </g>

      <path d={rotaSecundaria} fill="none" stroke="#c9c4fb" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
      <path d={rotaPrincipal} fill="none" stroke="#5b4fe0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {waypoints
        .filter((_, i) => i === 0 || i === waypoints.length - 1)
        .map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill="#1b1d29" />
        ))}

      <circle data-veiculo r="7" fill="#5b4fe0" stroke="white" strokeWidth="2" />
    </svg>
  )
}
