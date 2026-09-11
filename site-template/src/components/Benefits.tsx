import Reveal from './Reveal'

const iconProps = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: '#0f1c33',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const secondaryBenefits = [
  {
    title: 'Design próprio',
    description: 'Identidade visual pensada pro seu negócio, sem modelos genéricos.',
    icon: (
      <svg {...iconProps} className="h-9 w-9">
        <path d="M24 8c-9.4 0-17 6.6-17 15.5C7 32 12.5 38 20 38c1.3 0 2.3-1 2.3-2.3 0-.6-.2-1.2-.6-1.6-.4-.4-.6-1-.6-1.6 0-1.3 1-2.3 2.3-2.3h2.7c5.2 0 9.9-4.3 9.9-9.7C36 13.8 30.8 8 24 8Z" />
        <circle cx="16.5" cy="22" r="1.4" fill="#0f1c33" stroke="none" />
        <circle cx="21" cy="15.5" r="1.4" fill="#0f1c33" stroke="none" />
        <circle cx="29" cy="15.5" r="1.4" fill="#0f1c33" stroke="none" />
        <circle cx="32" cy="22" r="1.4" fill="#0f1c33" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Presença no Google',
    description: 'Estrutura pensada pra aparecer nas buscas de quem procura seu serviço.',
    icon: (
      <svg {...iconProps} className="h-9 w-9">
        <circle cx="21" cy="21" r="12" />
        <path d="M30 30l9 9" />
      </svg>
    ),
  },
  {
    title: 'Entrega rápida',
    description: 'Do briefing à publicação, seu site fica pronto em poucos dias.',
    icon: (
      <svg {...iconProps} className="h-9 w-9">
        <path d="M26 6 12 27h10l-2 15 18-24H24l2-12Z" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="scroll-mt-20 bg-surface-alt py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="text-3xl font-semibold text-ink md:text-4xl">
            Tudo que seu site precisa ter
          </h2>
          <p className="mt-4 max-w-md text-ink/65">
            Sem plugin, sem builder genérico — cada site é construído do zero
            pro seu negócio.
          </p>
        </Reveal>

        <Reveal stagger={0.1} className="mt-10 space-y-5">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-white px-8 py-12 text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg
                viewBox="0 0 140 80"
                className="pointer-events-none absolute -inset-x-6 -inset-y-4 h-[calc(100%+2rem)] w-[calc(100%+3rem)]"
                fill="none"
              >
                <ellipse
                  cx="70"
                  cy="40"
                  rx="66"
                  ry="34"
                  stroke="#1d4fd1"
                  strokeWidth="1.5"
                  opacity="0.4"
                  transform="rotate(-3 70 40)"
                />
              </svg>
              <span className="font-heading text-5xl font-semibold text-ink">100%</span>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-ink">Responsivo</h3>
            <p className="mt-2 max-w-sm text-ink/65">
              Layout que se adapta perfeitamente a celular, tablet e
              computador.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {secondaryBenefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl border border-line bg-white p-8">
                {benefit.icon}
                <h3 className="mt-5 text-lg font-semibold text-ink">{benefit.title}</h3>
                <p className="mt-2 text-ink/65">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
