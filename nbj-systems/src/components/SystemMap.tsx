import { useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ProductGlyph from './ProductGlyph'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, useGSAP)

// Visão geral da linha de produtos, no mesmo esquema técnico do
// TreatmentDiagram (Hero da Home): em vez das etapas de UM sistema de osmose,
// aqui são as 4 FAMÍLIAS de equipamento ligadas por um cano central — o
// "mapa" do catálogo, pra abrir a página de Produtos. Reaproveita os mesmos
// glifos do SpecList (ProductGlyph), só que grandes e no cano.
const nodes = [
  { x: 130, glyph: 'filtrante', name: 'Elementos filtrantes', href: '#' },
  { x: 350, glyph: 'tanque', name: 'Tanques em PRFV', href: '#' },
  { x: 570, glyph: 'bancada', name: 'Bancada reprocessadora', href: '#' },
  { x: 790, glyph: 'cristal', name: 'Osmose reversa', href: '#osmose' },
] as const

export default function SystemMap() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)
        gsap
          .timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: { trigger: root.current, start: 'top 80%', once: true },
          })
          .from(q('[data-pipe]'), { drawSVG: '0%', duration: 0.5, ease: 'none' })
          .from(q('[data-node]'), { opacity: 0, y: 12, duration: 0.5, stagger: 0.15 }, 0.1)
          .from(q('[data-label]'), { opacity: 0, y: 8, duration: 0.4, stagger: 0.15 }, 0.2)
      })
    },
    { scope: root },
  )

  return (
    <figure ref={root} className="mt-14 md:mt-16">
      <svg
        viewBox="0 0 920 190"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Mapa da linha de produtos: elementos filtrantes, tanques em PRFV, bancada reprocessadora e osmose reversa, ligados pela mesma linha de tratamento de água."
      >
        <path data-pipe d="M40,150 H880" stroke="#c8d5d9" strokeWidth="10" fill="none" />
        <path
          data-pipe
          d="M40,150 H880"
          stroke="#8a9a8f"
          strokeWidth="2"
          strokeDasharray="10 14"
          fill="none"
        />

        {nodes.map((node) => (
          <g key={node.name} data-node transform={`translate(${node.x - 42} 20)`}>
            <rect width="84" height="84" rx="12" fill="#fff" stroke="#0f2430" strokeWidth="2.5" />
            {/* <svg> aninhado precisa de width/height próprios — sem eles o
                navegador usa o padrão de 300×150 e o glifo escapa da caixa. */}
            <svg x="10" y="20" width="64" height="45" viewBox="0 0 96 68" preserveAspectRatio="xMidYMid meet">
              <ProductGlyph kind={node.glyph} />
            </svg>
            <line x1="42" y1="84" x2="42" y2="130" stroke="#0f2430" strokeWidth="2.5" />
          </g>
        ))}
      </svg>

      <ol className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-4 sm:text-center">
        {nodes.map((node, i) => (
          <li key={node.name} data-label>
            <a href={node.href} className="group block">
              <span className="flex items-center justify-center gap-2 font-semibold text-ink transition-colors group-hover:text-accent-hover sm:justify-center">
                <span className="text-ink/40 tabular-nums">{i + 1}</span>
                {node.name}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </figure>
  )
}
