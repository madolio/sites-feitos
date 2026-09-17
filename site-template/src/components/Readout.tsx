import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// Leitura de telemetria — cada dígito conta rapidamente até travar no valor
// final, como um contador ao vivo de um painel de controle de missão (não
// mais um painel de partidas de trem). Único motion "de dado", reservado pra
// número real de casos ativos.
export default function Readout({ value }: { value: string }) {
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
    <span ref={ref} className="flap readout">
      {value.split('').map((ch, i) => (
        <span key={i}>{ch}</span>
      ))}
    </span>
  )
}
