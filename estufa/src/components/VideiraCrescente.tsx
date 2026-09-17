import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Assinatura de movimento do site: uma videira que "cresce" (se desenha)
// acompanhando o scroll da seção de espécies, com folhas que desenrolam
// (rotam de fechadas pra abertas) conforme o traço passa por elas — em vez
// de um fade genérico, a metáfora de crescimento é literal no mecanismo.
export default function VideiraCrescente({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useGSAP(
    () => {
      const wrap = wrapRef.current
      const path = pathRef.current
      if (!wrap || !path) return

      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

      const leaves = gsap.utils.toArray<SVGGElement>(wrap.querySelectorAll('.folha'))
      gsap.set(leaves, { scale: 0.2, transformOrigin: '0% 100%', opacity: 0 })

      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 0.6,
          },
        })

        tl.to(path, { strokeDashoffset: 0, ease: 'none' }, 0)
        leaves.forEach((leaf, i) => {
          tl.to(leaf, { scale: 1, opacity: 1, ease: 'back.out(2)', duration: 0.3 }, i * 0.18)
        })
      })

      // Sem preferência de redução de movimento: mostra o traço completo,
      // estático, em vez de um SVG vazio.
      gsap.matchMedia().add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(path, { strokeDashoffset: 0 })
        gsap.set(leaves, { scale: 1, opacity: 1 })
      })
    },
    { scope: wrapRef },
  )

  return (
    <div ref={wrapRef} className={className}>
      <svg viewBox="0 0 40 600" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        <path
          ref={pathRef}
          d="M20 0
             C 5 40, 35 80, 20 120
             C 5 160, 35 200, 20 240
             C 5 280, 35 320, 20 360
             C 5 400, 35 440, 20 480
             C 5 520, 35 560, 20 600"
          fill="none"
          stroke="var(--color-musgo)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {[70, 190, 310, 430, 550].map((y, i) => (
          <g key={y} className="folha" transform={`translate(${i % 2 === 0 ? 20 : 20} ${y})`}>
            <path
              d={
                i % 2 === 0
                  ? 'M0 0 C 14 -4, 22 6, 18 16 C 8 14, -2 8, 0 0Z'
                  : 'M0 0 C -14 -4, -22 6, -18 16 C -8 14, 2 8, 0 0Z'
              }
              fill="var(--color-musgo)"
              opacity="0.85"
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
