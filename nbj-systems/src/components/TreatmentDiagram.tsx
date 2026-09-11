import { useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, useGSAP)

// Cada estágio fica centralizado numa das 5 colunas (x = 100, 300, 500, 700, 900
// no viewBox de 1000), para que a legenda em grid de 5 colunas fique alinhada
// embaixo do equipamento correspondente em qualquer largura de tela.
const stages = [
  { name: 'Entrada', text: 'Água da rede, com tudo o que ela carrega.' },
  { name: 'Polipropileno', text: 'Retém areia e sedimentos.', dot: 'sediment' },
  { name: 'Carvão ativado', text: 'Remove cloro, odor e sabor.', dot: 'chlorine' },
  {
    name: 'Osmose reversa',
    text: 'A membrana separa os sais dissolvidos, que saem pelo descarte.',
    dot: 'salt',
  },
  { name: 'Água desmineralizada', text: 'Pronta para laboratório, hospital e indústria.' },
] as const

const dotColor = {
  sediment: '#b5812f',
  chlorine: '#6b7d45',
  salt: '#0f2430',
}

// Trajeto de cada tipo de impureza: segue o cano (y = 120) até o estágio que a
// retém (stopX) e assenta ali (endY).
const contaminants = {
  sediment: { stopX: 300, endY: 186, r: 4.5, count: 5 },
  chlorine: { stopX: 500, endY: 150, r: 3.2, count: 5 },
  salt: { stopX: 760, endY: 214, r: 2.4, count: 7 },
}

const SPEED = 120 // unidades do viewBox por segundo

export default function TreatmentDiagram() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root)

        const flow = gsap.timeline({ paused: true })
        flow.to(
          q('[data-water]'),
          { strokeDashoffset: -24, duration: 24 / SPEED, ease: 'none', repeat: -1 },
          0,
        )

        root.current?.querySelectorAll<SVGCircleElement>('[data-particle]').forEach((el) => {
          const kind = el.dataset.particle as keyof typeof contaminants
          const { stopX, endY } = contaminants[kind]
          const jitter = gsap.utils.random(-3, 3)
          const p = gsap.timeline({
            repeat: -1,
            repeatDelay: gsap.utils.random(0.4, 2.4),
            delay: gsap.utils.random(0, 4),
          })

          p.set(el, { x: 0, y: 120 + jitter, opacity: 1 })
          p.to(el, { x: stopX, duration: stopX / SPEED, ease: 'none' })

          if (kind === 'salt') {
            // Sai pela linha de concentrado: desce e segue até o descarte.
            p.to(el, { y: endY, duration: (endY - 120) / SPEED, ease: 'none' })
            p.to(el, { x: 840, duration: 80 / SPEED, ease: 'none' })
            p.to(el, { opacity: 0, duration: 0.3 })
          } else {
            // Fica retida no elemento filtrante.
            p.to(el, {
              x: stopX + gsap.utils.random(-14, 14),
              y: endY + gsap.utils.random(-6, 6),
              duration: 0.6,
              ease: 'power2.out',
            })
            p.to(el, { opacity: 0, duration: 0.5 }, '+=0.3')
          }

          flow.add(p, 0)
        })

        const intro = gsap.timeline({ defaults: { ease: 'power2.out' } })
        intro
          .from(q('[data-pipe]'), {
            drawSVG: '0%',
            duration: 0.3,
            stagger: 0.22,
            ease: 'none',
          })
          .from(
            q('[data-unit]'),
            { opacity: 0, y: 10, duration: 0.45, stagger: 0.22 },
            0.05,
          )
          .from(
            q('[data-label]'),
            { opacity: 0, y: 8, duration: 0.45, stagger: 0.22 },
            0.15,
          )
          .from(
            q('[data-tank-fill]'),
            { scaleY: 0, transformOrigin: '50% 100%', duration: 1.4 },
            '-=0.35',
          )
          .from(q('[data-water]'), { opacity: 0, duration: 0.4 }, '<')
          .add(() => {
            flow.play()
          }, '<')

        // Pausa o fluxo contínuo quando o esquema sai da tela.
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            if (intro.progress() < 1) return
            if (self.isActive) flow.play()
            else flow.pause()
          },
        })
      })
    },
    { scope: root },
  )

  return (
    <figure ref={root} className="mt-16 md:mt-20">
      <svg
        viewBox="0 0 1000 250"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Esquema de um sistema de osmose reversa: a água passa pelo filtro de polipropileno, pelo carvão ativado e pela membrana de osmose, e chega ao reservatório desmineralizada."
      >
        <defs>
          <pattern id="granules" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.7" fill="#0f2430" fillOpacity="0.75" />
            <circle cx="6" cy="6" r="1.3" fill="#0f2430" fillOpacity="0.55" />
          </pattern>
          <clipPath id="membrane-clip">
            <rect x="616" y="98" width="168" height="44" rx="6" />
          </clipPath>
          <clipPath id="tank-clip">
            <rect x="865" y="43" width="70" height="158" rx="4" />
          </clipPath>
        </defs>

        {/* Piso */}
        <line x1="30" y1="232" x2="970" y2="232" stroke="#c8d5d9" strokeWidth="2" />

        {/* Canos (externo) e água (tracejado interno), com a cor clareando a cada etapa */}
        <g fill="none" strokeLinecap="butt">
          <path data-pipe d="M0,120 H84" stroke="#c8d5d9" strokeWidth="12" />
          <path data-pipe d="M116,120 H272" stroke="#c8d5d9" strokeWidth="12" />
          <path data-pipe d="M328,120 H472" stroke="#c8d5d9" strokeWidth="12" />
          <path data-pipe d="M528,120 H604" stroke="#c8d5d9" strokeWidth="12" />
          <path data-pipe d="M796,120 H862" stroke="#c8d5d9" strokeWidth="12" />
          <path data-pipe d="M760,152 V214 H846" stroke="#c8d5d9" strokeWidth="8" />

          <g strokeWidth="4" strokeDasharray="10 14">
            <path data-water d="M0,120 H84" stroke="#8a9a8f" />
            <path data-water d="M116,120 H272" stroke="#8a9a8f" />
            <path data-water d="M328,120 H472" stroke="#6a9fab" />
            <path data-water d="M528,120 H604" stroke="#4ea3bf" />
            <path data-water d="M796,120 H862" stroke="#2ba7cc" />
          </g>
        </g>

        {/* 1. Registro de entrada */}
        <g data-unit fill="#fff" stroke="#0f2430" strokeWidth="2.5" strokeLinejoin="round">
          <polygon points="84,106 100,120 84,134" />
          <polygon points="116,106 100,120 116,134" />
          <path d="M100,120 V94 M88,94 H112" fill="none" strokeLinecap="round" />
        </g>

        {/* 2. Cartucho de polipropileno (plissado) */}
        <g data-unit>
          <rect x="264" y="40" width="72" height="16" rx="3" fill="#0f2430" />
          <rect x="272" y="56" width="56" height="148" rx="8" fill="#fff" stroke="#0f2430" strokeWidth="2.5" />
          <g stroke="#c8d5d9" strokeWidth="2">
            {[284, 292, 300, 308, 316].map((x) => (
              <line key={x} x1={x} y1="68" x2={x} y2="176" />
            ))}
          </g>
          <g fill="#b5812f">
            <circle cx="286" cy="194" r="4" />
            <circle cx="295" cy="191" r="3.5" />
            <circle cx="305" cy="195" r="4.5" />
            <circle cx="314" cy="192" r="3.5" />
          </g>
        </g>

        {/* 3. Cartucho de carvão ativado (granulado) */}
        <g data-unit>
          <rect x="464" y="40" width="72" height="16" rx="3" fill="#0f2430" />
          <rect x="472" y="56" width="56" height="148" rx="8" fill="#fff" stroke="#0f2430" strokeWidth="2.5" />
          <rect x="479" y="64" width="42" height="132" rx="4" fill="url(#granules)" />
        </g>

        {/* 4. Vaso de pressão com membrana de osmose (enrolada em espiral) */}
        <g data-unit>
          <rect x="610" y="92" width="180" height="56" rx="10" fill="#fff" stroke="#0f2430" strokeWidth="2.5" />
          <g clipPath="url(#membrane-clip)" stroke="#c8d5d9" strokeWidth="2">
            {Array.from({ length: 14 }, (_, i) => 606 + i * 14).map((x) => (
              <line key={x} x1={x} y1="98" x2={x + 22} y2="142" />
            ))}
          </g>
          <rect x="602" y="86" width="12" height="68" rx="2" fill="#0f2430" />
          <rect x="786" y="86" width="12" height="68" rx="2" fill="#0f2430" />
          <path d="M840,206 L852,214 L840,222" fill="none" stroke="#0f2430" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* 5. Reservatório de água tratada */}
        <g data-unit>
          <g clipPath="url(#tank-clip)">
            <rect data-tank-fill x="862" y="92" width="76" height="112" fill="#2ba7cc" fillOpacity="0.28" />
            <line data-tank-fill x1="862" y1="92" x2="938" y2="92" stroke="#2ba7cc" strokeWidth="2.5" />
          </g>
          <rect x="862" y="40" width="76" height="164" rx="6" fill="none" stroke="#0f2430" strokeWidth="2.5" />
          <path d="M876,204 V232 M924,204 V232" stroke="#0f2430" strokeWidth="2.5" />
        </g>

        {/* Impurezas em trânsito (só aparecem com a animação ligada) */}
        {(Object.keys(contaminants) as (keyof typeof contaminants)[]).map((kind) =>
          Array.from({ length: contaminants[kind].count }, (_, i) => (
            <circle
              key={`${kind}-${i}`}
              data-particle={kind}
              r={contaminants[kind].r}
              fill={dotColor[kind]}
              opacity="0"
            />
          )),
        )}
      </svg>

      <figcaption className="sr-only">
        Etapas de um sistema compacto de osmose reversa NBJ-OR.
      </figcaption>

      <ol className="mt-6 grid gap-x-4 gap-y-5 sm:mt-8 sm:grid-cols-5 sm:text-center">
        {stages.map((stage, i) => (
          <li key={stage.name} data-label className="flex gap-3 sm:block">
            <span className="w-5 shrink-0 font-semibold text-ink/40 tabular-nums sm:block sm:w-auto">
              {i + 1}
            </span>
            <span>
              <span className="flex items-center gap-2 font-semibold text-ink sm:justify-center">
                {'dot' in stage && (
                  <span
                    aria-hidden
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: dotColor[stage.dot] }}
                  />
                )}
                {stage.name}
              </span>
              <span className="mt-1 block text-[0.9375rem] leading-snug text-ink/65">
                {stage.text}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
