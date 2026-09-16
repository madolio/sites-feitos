import { servicos } from '../data'
import Reveal from './Reveal'

export default function Servicos() {
  return (
    <section id="servicos" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal as="h2" className="text-3xl sm:text-4xl">
          O que fazemos
        </Reveal>

        <Reveal as="div" stagger={0.08} className="mt-12 grid gap-8 sm:grid-cols-2">
          {servicos.map((s) => (
            <div key={s.id} className="flex gap-5 border-t border-line pt-6">
              <span className="stamp flex h-14 w-14 shrink-0 items-center justify-center text-center text-[0.6rem] leading-tight font-bold text-accent uppercase">
                {s.name}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-lg font-semibold">{s.name}</h3>
                  <span className="text-sm font-semibold text-accent">{s.price}</span>
                </div>
                <p className="mt-1.5 text-ink/70">{s.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
