import { useEffect, useState } from 'react'
import { sendToWhatsApp } from '../demo'

// O único momento de movimento não pedido pelo visitante: ao carregar, a
// espiga desliza e trava no furo — o gesto que resume a marcenaria inteira,
// acontecendo uma vez só. Sem prefers-reduced-motion, a peça já nasce
// encaixada.
export default function Hero() {
  const [encaixado, setEncaixado] = useState(false)

  useEffect(() => {
    const reduzida = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduzida) {
      setEncaixado(true)
      return
    }
    const t = window.setTimeout(() => setEncaixado(true), 500)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <section className="border-b border-line px-6 pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-8 lg:pl-12">
        <div>
          <h1 className="font-heading text-[2.75rem] leading-[1.05] font-medium text-ink sm:text-6xl">
            Móvel que se sustenta pelo encaixe, não pelo parafuso
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink/75">
            Marcenaria sob medida em Itu (SP). Cada mesa, banco e estante sai
            da bancada com o encaixe certo pro esforço que vai receber —
            rabo-de-andorinha, espiga-e-furo, meia-madeira. Sem cantoneira
            escondida.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => sendToWhatsApp('Olá! Quero conversar sobre uma peça sob medida com a Encaixe.')}
              className="btn-primary"
            >
              Pedir um orçamento
            </button>
            <a href="#catalogo" className="btn-outline">
              Ver o catálogo
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xs md:max-w-none">
          <svg viewBox="0 0 300 200" className="h-auto w-full overflow-visible" aria-hidden="true">
            <path
              d="M20,40 H160 V80 H140 V120 H160 V160 H20 Z"
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <g
              style={{
                transform: `translateX(${encaixado ? -60 : 0}px)`,
                transition: 'transform 1.15s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <path
                d="M220,70 H280 V130 H220 V120 H200 V80 H220 Z"
                fill="var(--color-wood)"
                stroke="var(--color-wood-dark)"
                strokeWidth={2}
                strokeLinejoin="round"
              />
            </g>
            <line x1={20} y1={176} x2={160} y2={176} stroke="var(--color-accent)" strokeWidth={0.75} />
            <text x={90} y={190} textAnchor="middle" fill="var(--color-accent)" fontSize={9} fontFamily="var(--font-ui)">
              espiga-e-furo
            </text>
          </svg>
        </div>
      </div>
    </section>
  )
}
