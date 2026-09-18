import { useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, useGSAP)

// Esquema P&ID (piping & instrumentation diagram) — a notação com que o
// ofício da água é desenhado de verdade. Cada etapa fica centralizada numa
// das 5 colunas (x = 100, 300, 500, 700, 900 no viewBox de 1000) pra que a
// legenda em grid de 5 colunas caia alinhada embaixo do equipamento.
const etapas = [
  { nome: 'Entrada', texto: 'A água como ela chega, com tudo o que traz.' },
  { nome: 'Polipropileno', texto: 'Retém areia e sedimentos.', ponto: 'sedimento' },
  { nome: 'Carvão ativado', texto: 'Remove cloro, odor e sabor.', ponto: 'cloro' },
  {
    nome: 'Osmose reversa',
    texto: 'A membrana separa os sais dissolvidos, que saem pelo descarte.',
    ponto: 'sais',
  },
  { nome: 'Alta pureza', texto: 'O padrão que tratamento de hemodiálise exige.' },
] as const

// Espelham os tokens do index.css: linha, grafite e água.
const TUBO = '#c8d5d9'
const TRACO = '#0f2430'
const AGUA = '#0a6b87'

// A água vai clareando de cinza pra azul a cada etapa vencida.
const percurso = ['#8b96a0', '#8b96a0', '#5a8fa3', '#2b7b95', AGUA]

// Tons propositalmente dessaturados: nenhuma impureza pode ser confundida
// com o âmbar do ofício elétrico.
const corImpureza = {
  sedimento: '#8a7f6b',
  cloro: '#5f7d5e',
  sais: '#2f4356',
}

// Trajeto de cada impureza: segue o cano (y = 120) até a etapa que a retém
// (paraEm) e assenta ali (fimY).
const impurezas = {
  sedimento: { paraEm: 300, fimY: 186, r: 4.5, quantas: 5 },
  cloro: { paraEm: 500, fimY: 150, r: 3.2, quantas: 5 },
  sais: { paraEm: 760, fimY: 214, r: 2.4, quantas: 7 },
}

const VELOCIDADE = 120 // unidades do viewBox por segundo

export default function EsquemaAgua() {
  const raiz = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Tudo que se move vive aqui dentro. Com `prefers-reduced-motion`, o
      // esquema já nasce desenhado, cheio e parado — nenhum timeline roda.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(raiz)

        const fluxo = gsap.timeline({ paused: true })
        fluxo.to(
          q('[data-agua]'),
          { strokeDashoffset: -24, duration: 24 / VELOCIDADE, ease: 'none', repeat: -1 },
          0,
        )

        raiz.current?.querySelectorAll<SVGCircleElement>('[data-particula]').forEach((el) => {
          const tipo = el.dataset.particula as keyof typeof impurezas
          const { paraEm, fimY } = impurezas[tipo]
          const desvio = gsap.utils.random(-3, 3)
          const p = gsap.timeline({
            repeat: -1,
            repeatDelay: gsap.utils.random(0.4, 2.4),
            delay: gsap.utils.random(0, 4),
          })

          p.set(el, { x: 0, y: 120 + desvio, opacity: 1 })
          p.to(el, { x: paraEm, duration: paraEm / VELOCIDADE, ease: 'none' })

          if (tipo === 'sais') {
            // Saem pela linha de concentrado: descem e seguem pro descarte.
            p.to(el, { y: fimY, duration: (fimY - 120) / VELOCIDADE, ease: 'none' })
            p.to(el, { x: 840, duration: 80 / VELOCIDADE, ease: 'none' })
            p.to(el, { opacity: 0, duration: 0.3 })
          } else {
            // Ficam retidas no elemento filtrante.
            p.to(el, {
              x: paraEm + gsap.utils.random(-14, 14),
              y: fimY + gsap.utils.random(-6, 6),
              duration: 0.6,
              ease: 'power2.out',
            })
            p.to(el, { opacity: 0, duration: 0.5 }, '+=0.3')
          }

          fluxo.add(p, 0)
        })

        const entrada = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: { trigger: raiz.current, start: 'top 80%', once: true },
        })
        entrada
          .from(q('[data-cano]'), { drawSVG: '0%', duration: 0.3, stagger: 0.22, ease: 'none' })
          .from(q('[data-equipamento]'), { opacity: 0, y: 10, duration: 0.45, stagger: 0.22 }, 0.05)
          .from(q('[data-etapa]'), { opacity: 0, y: 8, duration: 0.45, stagger: 0.22 }, 0.15)
          .from(
            q('[data-reservatorio]'),
            { scaleY: 0, transformOrigin: '50% 100%', duration: 1.4 },
            '-=0.35',
          )
          .from(q('[data-agua]'), { opacity: 0, duration: 0.4 }, '<')
          .add(() => {
            fluxo.play()
          }, '<')

        // O fluxo contínuo só roda enquanto o esquema está na tela.
        ScrollTrigger.create({
          trigger: raiz.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            if (entrada.progress() < 1) return
            if (self.isActive) fluxo.play()
            else fluxo.pause()
          },
        })
      })
    },
    { scope: raiz },
  )

  return (
    <figure ref={raiz}>
      <figcaption className="mb-4 text-[0.9375rem] text-fumo">
        <span className="font-semibold text-grafite">Esquema P&amp;ID</span> — a
        notação com que um sistema de tratamento de água é desenhado, da entrada
        até o ponto de uso.
      </figcaption>

      <div className="prancha px-4 py-6 sm:px-8 sm:py-10">
        <svg
          viewBox="0 0 1000 250"
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label="Esquema de um sistema de tratamento de água: a água entra pelo registro, passa pelo filtro de polipropileno, pelo carvão ativado e pela membrana de osmose reversa, e chega ao reservatório como água de alta pureza."
        >
          <defs>
            <pattern id="granulos" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.7" fill={TRACO} fillOpacity="0.75" />
              <circle cx="6" cy="6" r="1.3" fill={TRACO} fillOpacity="0.55" />
            </pattern>
            <clipPath id="corte-membrana">
              <rect x="616" y="98" width="168" height="44" rx="6" />
            </clipPath>
            <clipPath id="corte-reservatorio">
              <rect x="865" y="43" width="70" height="158" rx="4" />
            </clipPath>
          </defs>

          <line x1="30" y1="232" x2="970" y2="232" stroke={TUBO} strokeWidth="2" />

          {/* Canos (parede) e água correndo dentro (tracejado interno) */}
          <g fill="none" strokeLinecap="butt">
            <path data-cano d="M0,120 H84" stroke={TUBO} strokeWidth="12" />
            <path data-cano d="M116,120 H272" stroke={TUBO} strokeWidth="12" />
            <path data-cano d="M328,120 H472" stroke={TUBO} strokeWidth="12" />
            <path data-cano d="M528,120 H604" stroke={TUBO} strokeWidth="12" />
            <path data-cano d="M796,120 H862" stroke={TUBO} strokeWidth="12" />
            <path data-cano d="M760,152 V214 H846" stroke={TUBO} strokeWidth="8" />

            <g strokeWidth="4" strokeDasharray="10 14">
              <path data-agua d="M0,120 H84" stroke={percurso[0]} />
              <path data-agua d="M116,120 H272" stroke={percurso[1]} />
              <path data-agua d="M328,120 H472" stroke={percurso[2]} />
              <path data-agua d="M528,120 H604" stroke={percurso[3]} />
              <path data-agua d="M796,120 H862" stroke={percurso[4]} />
            </g>
          </g>

          {/* 1. Registro de entrada */}
          <g data-equipamento fill="#fff" stroke={TRACO} strokeWidth="2.5" strokeLinejoin="round">
            <polygon points="84,106 100,120 84,134" />
            <polygon points="116,106 100,120 116,134" />
            <path d="M100,120 V94 M88,94 H112" fill="none" strokeLinecap="round" />
          </g>

          {/* 2. Cartucho de polipropileno (plissado) */}
          <g data-equipamento>
            <rect x="264" y="40" width="72" height="16" rx="3" fill={TRACO} />
            <rect x="272" y="56" width="56" height="148" rx="8" fill="#fff" stroke={TRACO} strokeWidth="2.5" />
            <g stroke={TUBO} strokeWidth="2">
              {[284, 292, 300, 308, 316].map((x) => (
                <line key={x} x1={x} y1="68" x2={x} y2="176" />
              ))}
            </g>
            <g fill={corImpureza.sedimento}>
              <circle cx="286" cy="194" r="4" />
              <circle cx="295" cy="191" r="3.5" />
              <circle cx="305" cy="195" r="4.5" />
              <circle cx="314" cy="192" r="3.5" />
            </g>
          </g>

          {/* 3. Cartucho de carvão ativado (granulado) */}
          <g data-equipamento>
            <rect x="464" y="40" width="72" height="16" rx="3" fill={TRACO} />
            <rect x="472" y="56" width="56" height="148" rx="8" fill="#fff" stroke={TRACO} strokeWidth="2.5" />
            <rect x="479" y="64" width="42" height="132" rx="4" fill="url(#granulos)" />
          </g>

          {/* 4. Vaso de pressão com a membrana de osmose enrolada em espiral */}
          <g data-equipamento>
            <rect x="610" y="92" width="180" height="56" rx="10" fill="#fff" stroke={TRACO} strokeWidth="2.5" />
            <g clipPath="url(#corte-membrana)" stroke={TUBO} strokeWidth="2">
              {Array.from({ length: 14 }, (_, i) => 606 + i * 14).map((x) => (
                <line key={x} x1={x} y1="98" x2={x + 22} y2="142" />
              ))}
            </g>
            <rect x="602" y="86" width="12" height="68" rx="2" fill={TRACO} />
            <rect x="786" y="86" width="12" height="68" rx="2" fill={TRACO} />
            <path
              d="M840,206 L852,214 L840,222"
              fill="none"
              stroke={TRACO}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* 5. Reservatório de água tratada */}
          <g data-equipamento>
            <g clipPath="url(#corte-reservatorio)">
              <rect data-reservatorio x="862" y="92" width="76" height="112" fill={AGUA} fillOpacity="0.25" />
              <line data-reservatorio x1="862" y1="92" x2="938" y2="92" stroke={AGUA} strokeWidth="2.5" />
            </g>
            <rect x="862" y="40" width="76" height="164" rx="6" fill="none" stroke={TRACO} strokeWidth="2.5" />
            <path d="M876,204 V232 M924,204 V232" stroke={TRACO} strokeWidth="2.5" />
          </g>

          {/* Impurezas em trânsito — só aparecem com a animação ligada. */}
          {(Object.keys(impurezas) as (keyof typeof impurezas)[]).map((tipo) =>
            Array.from({ length: impurezas[tipo].quantas }, (_, i) => (
              <circle
                key={`${tipo}-${i}`}
                data-particula={tipo}
                r={impurezas[tipo].r}
                fill={corImpureza[tipo]}
                opacity="0"
              />
            )),
          )}
        </svg>
      </div>

      <ol className="mt-7 grid gap-x-5 gap-y-5 sm:grid-cols-5 sm:text-center">
        {etapas.map((etapa, i) => (
          <li key={etapa.nome} data-etapa className="flex gap-3 sm:block">
            <span className="w-5 shrink-0 font-semibold tabular-nums text-grafite/45 sm:block sm:w-auto">
              {i + 1}
            </span>
            <span>
              <span className="flex items-center gap-2 font-semibold text-grafite sm:justify-center">
                {'ponto' in etapa && (
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: corImpureza[etapa.ponto] }}
                  />
                )}
                {etapa.nome}
              </span>
              <span className="mt-1 block text-[0.9375rem] leading-snug text-fumo">
                {etapa.texto}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
