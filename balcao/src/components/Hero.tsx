import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// A identidade que faltava: o hambúrguer se monta na tela, camada por
// camada, na mesma ordem em que sai na chapa. Cada etapa acende uma legenda
// (Pão → Carne na chapa → Queijo derretendo → Montagem → Pronto), então quem
// não vê a animação (prefers-reduced-motion, ou só chegou tarde) ainda lê a
// história em texto. O SVG nasce todo visível — a timeline só anima o que já
// está no DOM, nunca esconde informação atrás de movimento.
const ETAPAS = [
  { legenda: 'Pão' },
  { legenda: 'Carne na chapa' },
  { legenda: 'Queijo derretendo' },
  { legenda: 'Montagem' },
  { legenda: 'Pronto em ~8 min' },
]

export default function Hero() {
  const painelRef = useRef<SVGSVGElement>(null)
  const painResRef = useRef<HTMLDivElement>(null)
  const [etapa, setEtapa] = useState(ETAPAS.length - 1)

  useEffect(() => {
    const svg = painelRef.current
    if (!svg) return

    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (!mm.matches) return // já nasce montado, sem passar pelas etapas

    const bunBottom = svg.querySelector<SVGPathElement>('#bun-bottom')
    const patty = svg.querySelector<SVGGElement>('#patty')
    const grill = svg.querySelectorAll<SVGLineElement>('.grill-mark')
    const cheese = svg.querySelector<SVGPathElement>('#cheese')
    const drip1 = svg.querySelector<SVGPathElement>('#drip-1')
    const drip2 = svg.querySelector<SVGPathElement>('#drip-2')
    const veggies = svg.querySelector<SVGGElement>('#veggies')
    const bunTop = svg.querySelector<SVGGElement>('#bun-top')
    const sesame = svg.querySelectorAll<SVGCircleElement>('.sesame')
    const plate = svg.querySelector<SVGEllipseElement>('#plate')

    gsap.set([bunBottom, patty, cheese, drip1, drip2, veggies, bunTop], { opacity: 0 })
    gsap.set(plate, { opacity: 0, scale: 0.85, transformOrigin: '50% 50%' })
    gsap.set(bunBottom, { y: 30 })
    gsap.set(patty, { y: 24 })
    gsap.set(grill, { opacity: 0 })
    gsap.set(cheese, { scaleY: 0, transformOrigin: '50% 0%' })
    gsap.set([drip1, drip2], { scaleY: 0, transformOrigin: '50% 0%' })
    gsap.set(veggies, { y: -16 })
    gsap.set(bunTop, { y: -40, rotate: -6, transformOrigin: '50% 100%' })
    gsap.set(sesame, { opacity: 0 })

    let disparado = false
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting && !disparado) {
            disparado = true
            const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

            tl.to(plate, { opacity: 1, scale: 1, duration: 0.5 })
              .to(bunBottom, { opacity: 1, y: 0, duration: 0.45 }, '-=0.1')
              .call(() => setEtapa(0))
              .to(patty, { opacity: 1, y: 0, duration: 0.4 }, '+=0.15')
              .call(() => setEtapa(1))
              .to(grill, { opacity: 1, duration: 0.3, stagger: 0.05 }, '-=0.1')
              .to(cheese, { opacity: 1, scaleY: 1, duration: 0.45, ease: 'power1.out' }, '+=0.2')
              .call(() => setEtapa(2))
              .to([drip1, drip2], { scaleY: 1, duration: 0.55, ease: 'power1.in', stagger: 0.12 }, '-=0.15')
              .to(veggies, { opacity: 1, y: 0, duration: 0.4 }, '+=0.1')
              .call(() => setEtapa(3))
              .to(
                bunTop,
                { opacity: 1, y: 0, rotate: 0, duration: 0.5, ease: 'back.out(1.6)' },
                '+=0.05',
              )
              .to(sesame, { opacity: 1, duration: 0.3, stagger: 0.03 }, '-=0.15')
              .call(() => setEtapa(4))
              .to(svg, { y: -4, duration: 0.18, yoyo: true, repeat: 1, ease: 'power1.inOut' })

            observer.disconnect()
          }
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="border-b border-line bg-cream">
      <div className="mx-auto grid max-w-4xl items-center gap-8 px-5 py-10 sm:px-8 sm:py-14 md:grid-cols-2 md:gap-10">
        <div>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-leaf">
            <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden="true" />
            Feito na hora, na sua frente
          </span>
          <h2 className="mt-3 text-[2.5rem] leading-[1.05] text-ink sm:text-5xl">
            O lanche se monta<br />enquanto você espera.
          </h2>
          <p className="mt-4 max-w-sm text-ink/70">
            Pão, carne na chapa, queijo derretendo e o resto por cima — do jeito
            que sai pra sua mesa, sem atalho de fast-food.
          </p>

          <div
            ref={painResRef}
            className="mt-6 flex flex-wrap gap-2"
            role="status"
            aria-live="polite"
          >
            {ETAPAS.map((e, i) => (
              <span
                key={e.legenda}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-300 ${
                  i <= etapa
                    ? 'border-leaf bg-leaf/10 text-leaf'
                    : 'border-line text-ink/35'
                }`}
              >
                {e.legenda}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a href="#cardapio" className="btn-primary">
              Ver cardápio
            </a>
            <span className="text-sm text-ink/60">A partir de R$ 14,00 · pronto em ~8 min</span>
          </div>
        </div>

        <BurgerSVG ref={painelRef} />
      </div>
    </section>
  )
}

function BurgerSVG({ ref }: { ref: React.Ref<SVGSVGElement> }) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 320 300"
      className="mx-auto h-auto w-full max-w-[300px] md:max-w-none"
      role="img"
      aria-label="Ilustração de um hambúrguer sendo montado: pão, carne, queijo derretendo, alface e tomate, coberto pelo pão de cima com gergelim."
    >
      <ellipse id="plate" cx="160" cy="248" rx="118" ry="16" fill="#efe1c2" />

      <path
        id="bun-bottom"
        d="M56 210c0-20 18-32 104-32s104 12 104 32z"
        fill="#e8a93b"
      />

      <g id="patty">
        <rect x="52" y="182" width="216" height="26" rx="10" fill="#7a4a2b" />
        <line className="grill-mark" x1="72" y1="188" x2="72" y2="202" stroke="#5c3620" strokeWidth="3" strokeLinecap="round" />
        <line className="grill-mark" x1="104" y1="188" x2="104" y2="202" stroke="#5c3620" strokeWidth="3" strokeLinecap="round" />
        <line className="grill-mark" x1="136" y1="188" x2="136" y2="202" stroke="#5c3620" strokeWidth="3" strokeLinecap="round" />
        <line className="grill-mark" x1="168" y1="188" x2="168" y2="202" stroke="#5c3620" strokeWidth="3" strokeLinecap="round" />
        <line className="grill-mark" x1="200" y1="188" x2="200" y2="202" stroke="#5c3620" strokeWidth="3" strokeLinecap="round" />
        <line className="grill-mark" x1="232" y1="188" x2="232" y2="202" stroke="#5c3620" strokeWidth="3" strokeLinecap="round" />
        <line className="grill-mark" x1="248" y1="188" x2="248" y2="202" stroke="#5c3620" strokeWidth="3" strokeLinecap="round" />
      </g>

      <path id="cheese" d="M46 176h228l-20 18H66z" fill="#f0c23a" />
      <path id="drip-1" d="M84 194c-2 10-2 18 3 18s5-8 3-18z" fill="#f0c23a" />
      <path id="drip-2" d="M226 194c-2 12-2 22 4 22s6-10 4-22z" fill="#f0c23a" />

      <g id="veggies">
        <path
          d="M54 170c30-14 182-14 212 0l-8 10H62z"
          fill="#5f9a4a"
        />
        <circle cx="110" cy="168" r="9" fill="#c14a34" />
        <circle cx="168" cy="164" r="9" fill="#c14a34" />
        <circle cx="222" cy="168" r="9" fill="#c14a34" />
      </g>

      <g id="bun-top">
        <path
          d="M52 158c0-40 34-64 108-64s108 24 108 64z"
          fill="#e8a93b"
        />
        <path
          d="M60 156c4-34 34-54 100-54s96 20 100 54"
          fill="none"
          stroke="#c98a2a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle className="sesame" cx="110" cy="120" r="4" fill="#fff6e1" />
        <circle className="sesame" cx="140" cy="104" r="4" fill="#fff6e1" />
        <circle className="sesame" cx="172" cy="98" r="4" fill="#fff6e1" />
        <circle className="sesame" cx="204" cy="106" r="4" fill="#fff6e1" />
        <circle className="sesame" cx="230" cy="122" r="4" fill="#fff6e1" />
        <circle className="sesame" cx="160" cy="118" r="4" fill="#fff6e1" />
      </g>
    </svg>
  )
}
