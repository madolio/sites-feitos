import BentoCard from './BentoCard'
import Reveal from './Reveal'
import StatCounter from './StatCounter'

// Bento grid com brilho + inclinação 3D no hover (Card Spotlight da
// Aceternity UI + Tilted Card do React Bits, ver .bento-card no index.css) —
// não é mais a lista corrida nem o grid de cards com ícone genérico das
// versões anteriores.
export default function Benefits() {
  return (
    <section id="beneficios" className="scroll-mt-20 bg-surface-alt py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <h2 className="text-3xl font-semibold text-ink md:text-4xl">
            Tudo que seu site precisa ter
          </h2>
        </Reveal>

        <Reveal stagger={0.1} className="mt-12 grid gap-5 sm:grid-cols-3">
          <BentoCard className="sm:col-span-3">
            <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
              <div className="shrink-0">
                <span className="font-heading text-7xl font-semibold text-accent sm:text-8xl">
                  <StatCounter value={100} suffix="%" />
                </span>
              </div>
              <div className="max-w-sm">
                <h3 className="text-xl font-semibold text-ink">Responsivo</h3>
                <p className="mt-2 text-ink/70">
                  Layout que se adapta perfeitamente a celular, tablet e
                  computador — testado nos três antes da entrega.
                </p>
              </div>
            </div>
          </BentoCard>

          <BentoCard>
            <span className="font-heading text-4xl font-semibold text-accent">
              <StatCounter value={5} />–<StatCounter value={15} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-ink">dias</h3>
            <p className="mt-1.5 text-ink/70">
              Do briefing à publicação. Sem builder genérico atrasando o
              processo.
            </p>
          </BentoCard>

          <BentoCard>
            <span className="font-heading text-4xl font-semibold text-accent">
              <StatCounter value={0} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-ink">modelos prontos</h3>
            <p className="mt-1.5 text-ink/70">
              Identidade visual pensada do zero pro seu negócio, não um
              template reaproveitado.
            </p>
          </BentoCard>

          <BentoCard>
            <span className="font-heading text-4xl font-semibold text-accent">
              <StatCounter value={1} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-ink">pessoa só</h3>
            <p className="mt-1.5 text-ink/70">
              Você fala direto comigo, do orçamento à entrega — sem repassar
              briefing pra terceiros.
            </p>
          </BentoCard>
        </Reveal>
      </div>
    </section>
  )
}
