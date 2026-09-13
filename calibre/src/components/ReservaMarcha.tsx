import { useEffect, useRef } from 'react'
import { corda } from '../estado'

const PERIMETRO = 2 * Math.PI * 26

// Lê `corda.energia` direto no DOM a cada quadro, sem passar por estado
// React — mesmo motivo do Termômetro do Torno: essa barra muda muito rápido
// (a cada giro da coroa) pra valer a pena re-renderizar componentes em volta.
export default function ReservaMarcha() {
  const arco = useRef<SVGCircleElement>(null)
  const numero = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const pct = corda.energia
      if (arco.current) arco.current.style.strokeDashoffset = `${PERIMETRO * (1 - pct)}`
      if (numero.current) numero.current.textContent = `${Math.round(pct * 100)}%`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 60 60" className="h-10 w-10 -rotate-90">
        <circle cx={30} cy={30} r={26} fill="none" stroke="#3a2c18" strokeWidth={4} />
        <circle
          ref={arco}
          cx={30}
          cy={30}
          r={26}
          fill="none"
          stroke="#caa25e"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={PERIMETRO}
        />
      </svg>
      <div className="leading-tight">
        <p className="text-sm text-cream/80">Reserva de marcha</p>
        <span ref={numero} className="font-heading text-lg text-brass">
          8%
        </span>
      </div>
    </div>
  )
}
