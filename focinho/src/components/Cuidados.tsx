import { cuidados } from '../data'
import Reveal from './Reveal'

export default function Cuidados() {
  return (
    <section id="cuidados" className="scroll-mt-24 border-t border-line bg-white py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">Anotações de cuidado</h2>
          <p className="mt-3 max-w-md text-ink/70">
            Como se fossem as instruções escritas à mão na sua carteirinha.
          </p>
        </Reveal>

        <Reveal as="div" stagger={0.08} className="mt-12 space-y-8">
          {cuidados.map((c) => (
            <div key={c.title} className="rounded-xl border border-dashed border-line p-6">
              <h3 className="font-display text-lg text-sage">{c.title}</h3>
              <p className="mt-2 text-ink/75">{c.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
