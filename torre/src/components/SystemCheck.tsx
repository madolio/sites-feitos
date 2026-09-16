import { features } from '../data'
import Reveal from './Reveal'

// Antes: grid 2x2 de cards com título+texto — o "kit SaaS" de sempre. Agora é
// um log de verificação de sistema, como o boot de um instrumento de
// verdade: cada recurso é uma linha com um indicador "ONLINE", não um card.
export default function SystemCheck() {
  return (
    <section id="produto" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <Reveal>
          <div className="mono mb-3 flex items-center gap-2 text-sm text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
            verificação de sistema
          </div>
          <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
            Tudo o que precisa acontecer sozinho, acontece sozinho.
          </h2>
          <p className="mt-5 text-lg text-ink-dim">
            Você olha a torre uma vez de manhã. O resto ela resolve.
          </p>
        </Reveal>

        <Reveal as="ul" stagger={0.08} className="mono mt-14 divide-y divide-line border-y border-line text-sm">
          {features.map((f, i) => (
            <li key={f.title} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6">
              <span className="flex shrink-0 items-center gap-3 text-ink-dim">
                <span className="text-ink-dim">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-base font-medium text-ink">{f.title}</span>
              </span>
              <span className="flex-1 font-sans text-base text-ink-dim">{f.text}</span>
              <span className="shrink-0 font-semibold text-cyan">ONLINE</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
