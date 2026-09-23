import { useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(DrawSVGPlugin, useGSAP)

// Um pequeno desenho técnico por etapa do processo — no mesmo vocabulário do
// FloorPlan/ProjetoPlan (traço fino, grafite + ocre), não ícone de biblioteca.
// Cada um se desenha sozinho (DrawSVG) quando entra na tela, como se a
// prancha fosse sendo construída etapa por etapa junto com o scroll.
const icons = [
  // 0 — Escuta: lupa sobre o levantamento do terreno
  <>
    <rect className="pp-line" x="4" y="10" width="40" height="30" />
    <line className="pp-line" x1="24" y1="10" x2="24" y2="40" />
    <line className="pp-line" x1="4" y1="26" x2="24" y2="26" />
    <circle className="pp-line pp-accent" cx="42" cy="38" r="12" />
    <line className="pp-line pp-accent" x1="51" y1="47" x2="60" y2="56" strokeLinecap="round" />
  </>,
  // 1 — Estudo: duas plantas sobrepostas, opções diferentes em comparação
  <>
    <rect className="pp-line" x="4" y="6" width="38" height="28" />
    <line className="pp-line" x1="4" y1="20" x2="42" y2="20" />
    <rect className="pp-line pp-accent" x="20" y="18" width="40" height="30" />
    <line className="pp-line pp-accent" x1="38" y1="18" x2="38" y2="48" />
  </>,
  // 2 — Projeto executivo: detalhe de cota, a medida fechada
  <>
    <line className="pp-line" x1="8" y1="14" x2="8" y2="50" />
    <line className="pp-line" x1="56" y1="14" x2="56" y2="50" />
    <line className="pp-line pp-accent" x1="8" y1="32" x2="56" y2="32" />
    <path className="pp-line pp-accent" d="M8 32 l6 -3 M8 32 l6 3" />
    <path className="pp-line pp-accent" d="M56 32 l-6 -3 M56 32 l-6 3" />
    <text x="19" y="27" fontFamily="Work Sans, sans-serif" fontSize="8" fill="var(--color-ink)" stroke="none">
      3,40
    </text>
  </>,
  // 3 — Acompanhamento de obra: o carimbo de aprovação, check na entrega
  <>
    <circle className="pp-line" cx="32" cy="32" r="24" strokeDasharray="2.5 2.5" />
    <circle className="pp-line" cx="32" cy="32" r="17" />
    <path className="pp-line pp-accent" d="M22 32 L29 40 L44 22" strokeLinecap="round" strokeLinejoin="round" />
  </>,
]

export default function ProcessoPlan({ index, className = '' }: { index: number; className?: string }) {
  const root = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      const svg = root.current
      if (!svg) return

      const mm = window.matchMedia('(prefers-reduced-motion: no-preference)')
      if (!mm.matches) return // fica estático, já "desenhado", sem draw-in

      let disparado = false
      const observer = new IntersectionObserver(
        (entradas) => {
          for (const entrada of entradas) {
            if (entrada.isIntersecting && !disparado) {
              disparado = true
              gsap
                .timeline({ delay: index * 0.1 })
                .from(svg.querySelectorAll('.pp-line'), {
                  drawSVG: '0%',
                  duration: 0.9,
                  ease: 'power2.inOut',
                  stagger: 0.06,
                })
              observer.disconnect()
            }
          }
        },
        { threshold: 0.4 },
      )
      observer.observe(svg)
      return () => observer.disconnect()
    },
    { scope: root },
  )

  return (
    <svg ref={root} viewBox="0 0 64 64" className={`processo-plan ${className}`} role="img" aria-hidden="true">
      {icons[index % icons.length]}
    </svg>
  )
}
