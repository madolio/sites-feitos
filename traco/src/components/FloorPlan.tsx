import { useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(DrawSVGPlugin, useGSAP)

// A planta baixa de uma casa real (quarto, banheiro, cozinha, sala, varanda),
// desenhada como um projeto de arquitetura de verdade seria representado —
// paredes de traço duplo, portas com o arco de abertura, uma janela. Na
// entrada, o GSAP "desenha" as paredes com DrawSVG antes de preencher os
// ambientes — a mesma ideia do TreatmentDiagram do site da NBJ, aplicada a um
// desenho de arquitetura em vez de um esquema de engenharia.
export default function FloorPlan({ className = '' }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      const svg = root.current
      if (!svg) return

      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ delay: 0.3 })
        tl.from('.fp-wall', { drawSVG: '0%', duration: 1.6, ease: 'power2.inOut', stagger: 0.03 })
          .from('.fp-door', { drawSVG: '0%', duration: 0.6, ease: 'power1.out', stagger: 0.08 }, '-=0.4')
          .from('.fp-fill', { opacity: 0, duration: 0.8, stagger: 0.04 }, '-=0.5')
          .from('.fp-label', { opacity: 0, y: 4, duration: 0.5, stagger: 0.05 }, '-=0.6')
      })
    },
    { scope: root },
  )

  return (
    <svg
      ref={root}
      viewBox="0 0 400 320"
      className={`floor-plan ${className}`}
      role="img"
      aria-label="Planta baixa esquemática de uma casa, com sala, cozinha, dois quartos, banheiro e varanda"
    >
      {/* preenchimentos dos ambientes */}
      <rect className="fp-fill" x="20" y="20" width="180" height="140" />
      <rect className="fp-fill" x="200" y="20" width="90" height="140" />
      <rect className="fp-fill" x="290" y="20" width="90" height="140" />
      <rect className="fp-fill" x="20" y="160" width="150" height="140" />
      <rect className="fp-fill" x="170" y="160" width="70" height="140" />
      <rect className="fp-fill" x="240" y="160" width="140" height="140" />

      {/* paredes externas + internas, traço duplo simplificado em traço único */}
      <g className="fp-wall-group">
        <path className="fp-wall" d="M20 20 H380 V300 H20 Z" />
        <path className="fp-wall" d="M200 20 V160" />
        <path className="fp-wall" d="M290 20 V160" />
        <path className="fp-wall" d="M20 160 H380" />
        <path className="fp-wall" d="M170 160 V300" />
        <path className="fp-wall" d="M240 160 V300" />
      </g>

      {/* portas: arco de 90° indicando o giro da folha */}
      <g strokeDasharray="3 3">
        <path className="fp-door" d="M95 160 A40 40 0 0 0 135 120" />
        <path className="fp-door" d="M205 160 A30 30 0 0 0 235 190" />
        <path className="fp-door" d="M50 20 A30 30 0 0 1 20 50" />
      </g>

      {/* janela na fachada superior */}
      <path d="M240 20 V14 M270 20 V14 M240 14 H270" stroke="var(--color-blueline)" strokeWidth="1.4" fill="none" />

      <g className="fp-label" fontFamily="Work Sans, sans-serif" fontSize="11" fill="var(--color-ink)">
        <text x="30" y="35">
          Sala
        </text>
        <text x="210" y="35">
          Cozinha
        </text>
        <text x="300" y="35">
          Varanda
        </text>
        <text x="30" y="175">
          Suíte
        </text>
        <text x="180" y="175">
          WC
        </text>
        <text x="250" y="175">
          Quarto
        </text>
      </g>
    </svg>
  )
}
