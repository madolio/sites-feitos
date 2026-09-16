import { processo } from '../data'
import Reveal from './Reveal'

export default function Processo() {
  return (
    <section id="processo" className="scroll-mt-16 border-t border-line bg-indigo py-20 text-paper md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal as="h2" className="text-4xl text-paper md:text-5xl">
          Como funciona
        </Reveal>

        <Reveal as="ol" className="mt-14 grid gap-10 sm:grid-cols-3" stagger={0.08}>
          {processo.map((step, i) => (
            <li key={step.title}>
              <span className="mono text-sm text-brass">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-2xl text-paper">{step.title}</h3>
              <p className="mt-2 text-paper/75">{step.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
