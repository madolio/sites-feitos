import { plans } from '../data'

export default function Planos() {
  return (
    <section id="planos" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="text-4xl font-medium tracking-tight md:text-5xl">Planos</h2>
        <p className="mt-4 max-w-md text-lg text-ink-dim">
          14 dias grátis em qualquer plano, sem cartão. Cancele quando quiser.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`panel flex flex-col p-7 ${plan.highlight ? 'border-amber' : ''}`}
            >
              <h3 className="text-lg font-medium text-ink-dim">{plan.name}</h3>
              <p className="mono mt-3 text-4xl text-ink">
                {plan.price > 0 ? `R$ ${plan.price}` : 'Sob consulta'}
                {plan.price > 0 && <span className="text-lg text-ink-dim">{plan.unit}</span>}
              </p>
              <p className="mt-1 text-ink-dim">{plan.description}</p>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 shrink-0 text-cyan" aria-hidden="true">
                      <path d="M2 8.5 6 12.5 14 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#contato" className={plan.highlight ? 'btn-amber mt-8' : 'btn-line mt-8'}>
                {plan.price > 0 ? 'Começar teste grátis' : 'Falar com vendas'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
