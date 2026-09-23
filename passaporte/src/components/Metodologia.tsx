import { depoimentos, idiomas } from '../data'
import Reveal from './Reveal'

export default function Metodologia() {
  return (
    <section className="border-t border-line bg-ink py-20 text-paper md:py-20">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl text-paper sm:text-4xl">Idiomas</h2>
        <Reveal as="ul" className="stamp-number mt-6 flex flex-wrap gap-3 text-sm" stagger={0.08}>
          {idiomas.map((i) => (
            <li key={i} className="rounded-full border border-paper/50 px-4 py-2 text-paper/90">
              {i}
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-14 space-y-8 border-t border-paper/25 pt-10" stagger={0.08}>
          {depoimentos.map((d) => (
            <div key={d.autor}>
              <p className="text-xl leading-relaxed text-paper/90">"{d.texto}"</p>
              <p className="mt-2 text-sm text-paper/70">{d.autor}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
