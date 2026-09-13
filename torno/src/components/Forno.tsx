import { useEffect, useRef } from 'react'
import { forno } from '../estado'

// Termômetro do forno, pro painel. Lê o mesmo objeto `forno` que a cena 3D
// (animado pelo GSAP em App.tsx), escrevendo direto no DOM a cada quadro em
// vez de passar por estado React. O escurecimento do "forno" é feito dentro
// da própria cena (Iluminacao em Atelie.tsx) — um overlay DOM com
// mix-blend-mode por cima do canvas WebGL obrigava o navegador a recompor a
// tela inteira a cada quadro.
export function Termometro() {
  const numero = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    let raf = 0
    const fmt = new Intl.NumberFormat('pt-BR')
    const tick = () => {
      if (numero.current) numero.current.textContent = `${fmt.format(Math.round(forno.temperatura))} °C`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <p ref={numero} className="mt-4 font-display text-6xl tabular-nums">
      20 °C
    </p>
  )
}
