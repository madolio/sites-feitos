import { useEffect, useRef, useState } from 'react'
import NumberFlow from '@number-flow/react'

// Contador animado — usa a lib NumberFlow (number-flow.barvian.me) em vez de
// reinventar a animação de dígito na mão. Conta de 0 até `value` quando entra
// na tela; NumberFlow já respeita prefers-reduced-motion internamente.
export default function StatCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDisplay(value)
          observer.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      <NumberFlow value={display} />
      {suffix}
    </span>
  )
}
