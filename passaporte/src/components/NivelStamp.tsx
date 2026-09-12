import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import type { Nivel } from '../data'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Cada nível "carimba" na página quando entra na tela — um golpe rápido de
// escala+rotação que se assenta, como um carimbo de verdade batendo no
// papel, em vez de um fade-in genérico.
export default function NivelStamp({ nivel, index }: { nivel: Nivel; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const stampRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          stampRef.current,
          { scale: 2.4, opacity: 0, rotate: index % 2 === 0 ? -14 : 10 },
          {
            scale: 1,
            opacity: 1,
            rotate: index % 2 === 0 ? -6 : 4,
            duration: 0.35,
            ease: 'power4.out',
            scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
          },
        )
      })
    },
    { scope: ref, dependencies: [index] },
  )

  return (
    <div ref={ref} className="flex gap-6 border-t border-line py-7 sm:gap-10">
      <span
        ref={stampRef}
        className="stamp-number flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[3px] border-teal text-lg font-bold text-teal"
        style={{ transform: `rotate(${index % 2 === 0 ? -6 : 4}deg)` }}
        aria-hidden="true"
      >
        {nivel.sigla}
      </span>
      <div>
        <p className="stamp-number text-xs tracking-widest text-ink/70 uppercase">{nivel.pais}</p>
        <h3 className="mt-1 text-2xl">{nivel.nome}</h3>
        <p className="mt-1.5 text-ink/80">{nivel.texto}</p>
      </div>
    </div>
  )
}
