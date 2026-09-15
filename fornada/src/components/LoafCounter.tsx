import { useEffect, useRef, useState } from 'react'

// Contador de pães — conta de 0 até o alvo quando entra na tela, feito na
// mão com requestAnimationFrame (sem lib), mesma técnica do RepCounter
// (Pulso) e do PlateCounter (Ferro).
export default function LoafCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setValue(target), { threshold: 0.6 })
      io.observe(el)
      return () => io.disconnect()
    }

    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const duration = 1800
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration)
          const eased = 1 - (1 - p) * (1 - p)
          setValue(Math.round(eased * target))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target])

  return (
    <span ref={ref} className="tally">
      {value.toLocaleString('pt-BR')}
    </span>
  )
}
