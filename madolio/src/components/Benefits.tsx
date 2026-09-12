import PercentCounter from './PercentCounter'
import Reveal from './Reveal'

// Nada de grade de cards com ícone em quadradinho (o "kit SaaS" mais comum
// por aí) — os benefícios viram uma lista corrida, estilo ficha técnica,
// com o dado (NumberFlow) embutido no próprio texto em vez de isolado num
// card grande separado.
const items = [
  {
    stat: <PercentCounter value={100} />,
    title: 'Responsivo',
    text: 'em qualquer tela, sem quebrar layout — celular, tablet ou computador.',
  },
  {
    stat: '5–15',
    title: 'dias',
    text: 'do briefing à publicação. Sem builder genérico atrasando o processo.',
  },
  {
    stat: '0',
    title: 'modelos prontos',
    text: 'identidade visual pensada do zero pro seu negócio, não um template reaproveitado.',
  },
  {
    stat: '1',
    title: 'pessoa só',
    text: 'você fala direto comigo, do orçamento à entrega — sem repassar briefing pra terceiros.',
  },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="scroll-mt-20 bg-surface-alt py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <h2 className="text-3xl font-semibold text-ink md:text-4xl">
            Tudo que seu site precisa ter
          </h2>
        </Reveal>

        <Reveal as="dl" stagger={0.08} className="mt-12 divide-y divide-line border-y border-line">
          {items.map((item) => (
            <div key={item.title} className="grid gap-2 py-7 sm:grid-cols-[7rem_1fr] sm:gap-8">
              <dt className="font-heading text-3xl font-semibold text-accent">{item.stat}</dt>
              <dd>
                <span className="text-lg font-semibold text-ink">{item.title}</span>{' '}
                <span className="text-ink/70">{item.text}</span>
              </dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
