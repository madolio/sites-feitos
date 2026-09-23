import { processo } from '../data'
import Reveal from './Reveal'
import ProcessoPlan from './ProcessoPlan'

export default function Processo() {
  return (
    <section id="processo" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal as="h2" className="text-4xl md:text-5xl">
          Como o projeto acontece
        </Reveal>

        <Reveal
          as="ol"
          stagger={0.1}
          className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          {processo.map((step, i) => (
            <li key={step.title} className="relative">
              <ProcessoPlan index={i} className="h-16 w-16" />

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-2xl text-ochre">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-lg">{step.title}</h3>
              </div>
              <p className="mt-2 text-ink/75">{step.text}</p>

              {i < processo.length - 1 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-8 left-full hidden w-10 border-t border-dashed border-blueline/50 lg:block"
                />
              )}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
