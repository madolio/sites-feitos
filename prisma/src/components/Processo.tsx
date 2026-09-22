import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Reveal from './Reveal'

const etapas = [
  {
    titulo: 'Escolha da gema',
    texto: 'Você define pedra, corte e engaste conosco — sempre com a certificação da procedência.',
  },
  {
    titulo: 'Desenho técnico',
    texto: 'A peça é desenhada em CAD antes de qualquer metal ser fundido, com as medidas exatas da sua mão.',
  },
  {
    titulo: 'Fundição e engaste',
    texto: 'Ourives de verdade funde o metal e finaliza o engaste manualmente, pedra por pedra.',
  },
  {
    titulo: 'Entrega',
    texto: 'Peça pronta, com certificado de gemologia e garantia de ajuste.',
  },
]

/**
 * Diagrama técnico do processo de joalheria: registro de lapidação (gema),
 * desenho CAD com marcas de medida, corte de fundição/engaste e selo de
 * certificação — quatro estágios reais da fabricação sob medida.
 */
function DiagramaProcesso() {
  const svgRef = useRef<SVGSVGElement>(null)
  const eixoRef = useRef<SVGLineElement>(null)
  const pulsoRef = useRef<SVGLineElement>(null)
  const grupoRefs = useRef<(SVGGElement | null)[]>([])

  useEffect(() => {
    const el = svgRef.current
    const eixo = eixoRef.current
    const pulso = pulsoRef.current
    const grupos = grupoRefs.current.filter((g): g is SVGGElement => g !== null)
    if (!el || !eixo || !pulso) return

    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (!mm.matches) return // já nasce completo (eixo desenhado, pulso e estágios visíveis)

    // comprimento real da linha de eixo (x2 - x1 = 930 - 70)
    const comprimento = 860
    gsap.set(eixo, { strokeDasharray: comprimento, strokeDashoffset: comprimento })
    gsap.set(pulso, { opacity: 0 })
    gsap.set(grupos, { opacity: 0, y: 8 })

    let disparado = false
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting && !disparado) {
            disparado = true
            const tl = gsap.timeline()
            tl.to(eixo, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out' })
              .to(grupos, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.15 }, 0.15)
              .to(pulso, { opacity: 1, duration: 0.4 }, '-=0.3')
            observer.disconnect()
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 220"
      className="w-full"
      role="img"
      aria-label="Diagrama técnico do processo: da escolha e lapidação da gema, ao desenho CAD com medidas exatas, à fundição e engaste manual, até a entrega certificada."
    >
      <defs>
        <pattern id="grade-processo" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-fio)" strokeWidth="0.5" opacity="0.35" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="1000" height="220" fill="url(#grade-processo)" />

      {/* linha de eixo conectando os quatro estágios */}
      <line ref={eixoRef} x1="70" y1="110" x2="930" y2="110" stroke="var(--color-acento)" strokeWidth="1.5" />

      {/* pulso percorrendo o eixo: material/pedido avançando pelas etapas de produção */}
      <line
        ref={pulsoRef}
        x1="70"
        y1="110"
        x2="930"
        y2="110"
        stroke="var(--color-marfim)"
        strokeWidth="1.5"
        strokeDasharray="6 14"
        className="diagrama-pulso"
      />

      {/* 00 — gema: diagrama de facetas de lapidação redonda em brilhante */}
      <g ref={(node) => { grupoRefs.current[0] = node }} transform="translate(120,110)">
        <circle cx="0" cy="0" r="42" fill="none" stroke="var(--color-marfim)" strokeWidth="1.75" />
        <circle cx="0" cy="0" r="16" fill="none" stroke="var(--color-marfim)" strokeWidth="1.5" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          const x1 = Math.cos(a) * 16
          const y1 = Math.sin(a) * 16
          const x2 = Math.cos(a) * 42
          const y2 = Math.sin(a) * 42
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-marfim)" strokeWidth="1" opacity="0.8" />
          )
        })}
      </g>

      {/* 01 — desenho técnico: anel em wireframe CAD com marcas de medida */}
      <g ref={(node) => { grupoRefs.current[1] = node }} transform="translate(370,110)">
        <ellipse cx="0" cy="0" rx="38" ry="24" fill="none" stroke="var(--color-marfim)" strokeWidth="1.75" />
        <ellipse cx="0" cy="0" rx="26" ry="15" fill="none" stroke="var(--color-marfim)" strokeWidth="1.25" strokeDasharray="3 3" opacity="0.7" />
        {/* marcas de calibre (medida de aro) */}
        <line x1="-38" y1="-32" x2="-38" y2="-24" stroke="var(--color-acento)" strokeWidth="1.25" />
        <line x1="38" y1="-32" x2="38" y2="-24" stroke="var(--color-acento)" strokeWidth="1.25" />
        <line x1="-38" y1="-30" x2="38" y2="-30" stroke="var(--color-acento)" strokeWidth="1" />
        <text x="0" y="-36" textAnchor="middle" fontFamily="var(--font-display)" fontSize="9" fill="var(--color-acento)">
          Ø 17,3mm
        </text>
      </g>

      {/* 02 — fundição e engaste: corte transversal de garras fechando sobre a pedra */}
      <g ref={(node) => { grupoRefs.current[2] = node }} transform="translate(630,110)">
        <polygon points="0,-20 17,-6 10,18 -10,18 -17,-6" fill="none" stroke="var(--color-marfim)" strokeWidth="1.75" />
        {[
          [-24, -14],
          [24, -14],
          [-16, 26],
          [16, 26],
        ].map(([x, y], i) => (
          <path
            key={i}
            d={`M ${x} ${y * 0.4} L ${x * 0.55} ${y * 0.25}`}
            fill="none"
            stroke="var(--color-acento)"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        ))}
        <circle cx="0" cy="34" r="3" fill="var(--color-acento)" opacity="0.9" />
      </g>

      {/* 03 — entrega: selo de certificação/hallmark */}
      <g ref={(node) => { grupoRefs.current[3] = node }} transform="translate(880,110)">
        <circle cx="0" cy="0" r="30" fill="none" stroke="var(--color-marfim)" strokeWidth="1.75" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2
          const inner = 24
          const outer = 30
          return (
            <line
              key={i}
              x1={Math.cos(a) * inner}
              y1={Math.sin(a) * inner}
              x2={Math.cos(a) * outer}
              y2={Math.sin(a) * outer}
              stroke="var(--color-marfim)"
              strokeWidth="1"
              opacity="0.6"
            />
          )
        })}
        <path d="M -10 0 L -3 8 L 12 -10" fill="none" stroke="var(--color-acento)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* tags numeradas 00-03 */}
      {[
        { x: 120, label: '00' },
        { x: 370, label: '01' },
        { x: 630, label: '02' },
        { x: 880, label: '03' },
      ].map((t) => (
        <text
          key={t.label}
          x={t.x}
          y="182"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="14"
          fill="var(--color-acento)"
        >
          {t.label}
        </text>
      ))}
    </svg>
  )
}

export default function Processo() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <Reveal as="h2" className="font-display text-3xl sm:text-4xl">
        Do desenho à peça
      </Reveal>

      <Reveal className="mt-10 overflow-hidden rounded-2xl border border-fio bg-carvao/50 p-5 sm:p-8">
        <DiagramaProcesso />
      </Reveal>

      <Reveal stagger={0.08} className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {etapas.map((e, i) => (
          <div key={e.titulo} className="rounded-2xl border border-fio bg-carvao/50 p-5">
            <p className="font-display text-3xl text-acento">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-3 font-display text-xl">{e.titulo}</h3>
            <p className="mt-2 text-sm text-fumo">{e.texto}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
