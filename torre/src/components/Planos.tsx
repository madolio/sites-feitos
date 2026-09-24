import { plans } from '../data'
import Reveal from './Reveal'

// Todos os recursos de todos os planos, na ordem em que aparecem no plano
// mais completo — usado como as linhas da tabela comparativa.
const allFeatures = Array.from(new Set(plans.flatMap((p) => p.features)))

// Antes: 3 cards lado a lado — o formato de pricing mais comum que existe.
// Virou uma tabela de comparação (linhas = recursos, colunas = planos), no
// mesmo espírito de painel/instrumento do resto do site — mais fácil de
// comparar o que muda de um plano pro outro, sem reler 3 listas separadas.
export default function Planos() {
  return (
    <section id="planos" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <Reveal>
          <h2 className="text-4xl font-medium tracking-tight md:text-5xl">Planos</h2>
          <p className="mt-4 max-w-md text-lg text-ink-dim">
            14 dias grátis em qualquer plano, sem cartão. Cancele quando quiser.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:hidden">
          {plans.map((plan) => (
            <Reveal key={plan.name} className="rounded-lg border border-line p-5">
              <span className={`block text-lg font-medium ${plan.highlight ? 'text-amber' : 'text-ink'}`}>
                {plan.name}
              </span>
              <span className="mono mt-2 block text-2xl text-ink">
                {plan.price > 0 ? (
                  <>
                    R$ {plan.price}
                    <span className="text-sm text-ink-dim">{plan.unit}</span>
                  </>
                ) : (
                  <span className="text-lg">Sob consulta</span>
                )}
              </span>
              <span className="mt-1 block text-sm text-ink-dim">{plan.description}</span>
              <ul className="mono mt-5 space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-label="Incluído">
                      <path
                        d="M2 8.5 6 12.5 14 3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="#contato" className={`${plan.highlight ? 'btn-amber' : 'btn-line'} mt-6 w-full`}>
                {plan.price > 0 ? 'Começar teste' : 'Falar com vendas'}
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[36rem] border-collapse">
            <caption className="sr-only">Comparação de planos da Torre</caption>
            <thead>
              <tr>
                <th scope="col" className="w-1/3" />
                {plans.map((plan) => (
                  <th key={plan.name} scope="col" className="border-b border-line px-4 pb-6 text-left align-bottom">
                    <span className={`block text-lg font-medium ${plan.highlight ? 'text-amber' : 'text-ink'}`}>
                      {plan.name}
                    </span>
                    <span className="mono mt-2 block text-2xl text-ink">
                      {plan.price > 0 ? (
                        <>
                          R$ {plan.price}
                          <span className="text-sm text-ink-dim">{plan.unit}</span>
                        </>
                      ) : (
                        <span className="text-lg">Sob consulta</span>
                      )}
                    </span>
                    <span className="mt-1 block text-sm font-normal text-ink-dim">{plan.description}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="mono text-sm">
              {allFeatures.map((feature) => (
                <tr key={feature} className="border-b border-line">
                  <th scope="row" className="py-4 pr-4 text-left font-normal text-ink-dim">
                    {feature}
                  </th>
                  {plans.map((plan) => (
                    <td key={plan.name} className="px-4 py-4 text-center">
                      {plan.features.includes(feature) ? (
                        <svg viewBox="0 0 16 16" className="mx-auto h-4 w-4 text-cyan" aria-label="Incluído">
                          <path
                            d="M2 8.5 6 12.5 14 3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <span aria-label="Não incluído" className="text-ink-dim/80">
                          —
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td />
                {plans.map((plan) => (
                  <td key={plan.name} className="px-4 pt-6 text-center">
                    <a href="#contato" className={plan.highlight ? 'btn-amber' : 'btn-line'}>
                      {plan.price > 0 ? 'Começar teste' : 'Falar com vendas'}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}
