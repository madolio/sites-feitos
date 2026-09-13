import { useEffect, useRef } from 'react'
import { mergulho, ndl, temperatura } from '../estado'

// Computador de mergulho: profundidade, temperatura, limite de não
// descompressão e a situação (descendo/subindo/suba devagar/parada de
// segurança). Escreve direto nos nós a cada quadro — nada de estado React.
export default function Visor() {
  const prof = useRef<HTMLSpanElement>(null)
  const temp = useRef<HTMLSpanElement>(null)
  const lim = useRef<HTMLSpanElement>(null)
  const situacao = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    let raf = 0
    const fmt = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    const tick = () => {
      const d = Math.max(0, mergulho.atual)
      if (prof.current) prof.current.textContent = fmt.format(d)
      if (temp.current) temp.current.textContent = String(Math.round(temperatura(d)))
      const n = ndl(d)
      if (lim.current) lim.current.textContent = n === null ? '—' : String(n)

      const s = situacao.current
      if (s) {
        let texto = 'na superfície'
        let alerta = false
        if (mergulho.parada !== null) {
          // parada de 3 min, contada 60× mais rápido
          const resta = Math.ceil(mergulho.parada * 60)
          texto = `parada de segurança ${Math.floor(resta / 60)}:${String(resta % 60).padStart(2, '0')}`
        } else if (mergulho.velocidade < -2.4 && d > 1 && !mergulho.automatico) {
          texto = 'suba devagar'
          alerta = true
        } else if (mergulho.velocidade > 0.25) texto = 'descendo'
        else if (mergulho.velocidade < -0.25) texto = 'subindo'
        else if (d > 0.5) texto = 'estável'
        s.textContent = texto
        s.classList.toggle('piscando', alerta)
        s.classList.toggle('text-lanterna', alerta || mergulho.parada !== null)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      role="status"
      aria-label="Computador de mergulho"
      className="pointer-events-none fixed top-4 left-4 z-30 w-[11.5rem] rounded-[20px] border border-lanterna/25 bg-placa/90 px-4 py-3 font-visor text-espuma sm:top-5 sm:left-5 sm:w-52"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-[0.7rem] text-espuma/55">prof.</span>
        <span className="text-lanterna">
          <span ref={prof} className="text-2xl font-medium tabular-nums sm:text-3xl">
            0,0
          </span>
          <span className="text-xs"> m</span>
        </span>
      </div>
      <div className="mt-1 flex items-baseline justify-between text-sm">
        <span className="text-[0.7rem] text-espuma/55">temp.</span>
        <span>
          <span ref={temp} className="tabular-nums">27</span> °C
        </span>
      </div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="text-[0.7rem] text-espuma/55">ndl</span>
        <span>
          <span ref={lim} className="tabular-nums">—</span> min
        </span>
      </div>
      <p ref={situacao} className="mt-1.5 border-t border-espuma/15 pt-1.5 text-[0.7rem] text-espuma/75">
        na superfície
      </p>
    </div>
  )
}
