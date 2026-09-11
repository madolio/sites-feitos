import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// O painel de embarque mecânico — motion assinatura da página. Cada dígito
// "roda" (como um painel de horários de trem/aeroporto) antes de travar no
// valor final. Único motion não pedido; o resto usa apenas Reveal.
export default function SplitFlap({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const chars = ref.current ? Array.from(ref.current.children) : []
        chars.forEach((el, i) => {
          const target = value[i]
          if (!/[0-9]/.test(target)) return
          const obj = { v: 0 }
          gsap.to(obj, {
            v: 9,
            duration: 0.5,
            delay: 0.2 + i * 0.08,
            ease: 'power1.out',
            snap: { v: 1 },
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v))
            },
            onComplete: () => {
              el.textContent = target
            },
          })
        })
      })
    },
    { scope: ref, dependencies: [value] },
  )

  return (
    <span ref={ref} className="flap">
      {value.split('').map((ch, i) => (
        <span key={i}>{ch}</span>
      ))}
    </span>
  )
}
