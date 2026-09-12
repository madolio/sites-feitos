import { useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(DrawSVGPlugin, useGSAP)

// A assinatura no fim do hero é o único motion "não pedido" da página —
// desenha-se uma vez, como o gesto de fechar um acordo. O traço é um
// floreio abstrato (não tenta formar letras reais), só a cadência de uma
// caligrafia cursiva.
export default function Signature({ className = 'h-14 w-auto text-accent' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-stroke]', {
          drawSVG: '0%',
          duration: 1.4,
          delay: 0.3,
          ease: 'power2.inOut',
        })
      })
    },
    { scope: ref },
  )

  return (
    <svg
      ref={ref}
      viewBox="0 0 220 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path
        data-stroke
        d="M6 44c5-20 12-30 18-30 5 0 5 14 3 24-2 9 1 12 6 6 6-8 10-18 15-18 4 0 2 10 5 12 4 3 10-4 15-10 4-5 7-7 9-4 3 4-2 11 2 13 5 2 12-8 17-13 3-3 5-2 5 2 0 5-3 10 1 11 6 2 15-9 21-15 3-3 5-1 4 3-1 5-4 9 0 10 5 2 14-7 20-13"
      />
      <path
        data-stroke
        d="M170 20c3-6 8-9 10-6 2 4-3 9-6 9-2 0 1-9 8-9 6 0 9 5 8 9"
      />
    </svg>
  )
}
