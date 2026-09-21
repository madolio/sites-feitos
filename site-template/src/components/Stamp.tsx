import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

// Selo de cera girando e assentando, uma vez, ao carregar — o "momento de
// carimbo" pedido pro motion de entrada: pesado e definitivo, não frenético.
// `.lamp-glow` por trás fica respirando bem devagar depois disso, pra página
// não ficar totalmente parada.
export default function Stamp() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(ref.current, {
          opacity: 0,
          scale: 1.6,
          rotate: -18,
          duration: 0.9,
          delay: 0.2,
          ease: 'back.out(1.4)',
        })
      })
    },
    { scope: ref },
  )

  return (
    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center sm:h-28 sm:w-28">
      <div
        className="lamp-glow absolute inset-0 rounded-full bg-accent/25 blur-xl"
        aria-hidden="true"
      />
      <div
        ref={ref}
        className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-stamp text-stamp"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="h-[72%] w-[72%]" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="50" cy="50" r="40" strokeDasharray="4 5" />
          <text
            x="50"
            y="46"
            textAnchor="middle"
            fontFamily="Spectral, serif"
            fontSize="13"
            fill="currentColor"
            stroke="none"
          >
            BASTOS
          </text>
          <text
            x="50"
            y="62"
            textAnchor="middle"
            fontFamily="Spectral, serif"
            fontSize="9"
            letterSpacing="2"
            fill="currentColor"
            stroke="none"
          >
            ADVOCACIA
          </text>
        </svg>
      </div>
    </div>
  )
}
