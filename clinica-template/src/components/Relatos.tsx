import { depoimentos } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Relatos() {
  const d = depoimentos
  return (
    <section className="bg-sage/60 py-20 lg:py-28" aria-labelledby="relatos-titulo">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{d.eyebrow}</p>
          <h2 id="relatos-titulo" className="h-section mt-5">
            <Rich text={d.title} />
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-forest p-7 text-bone sm:p-12 lg:col-span-7">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 right-4 font-display text-[10rem] leading-none text-clay-light/20 italic sm:text-[14rem]"
            >
              ”
            </span>
            <figure className="relative">
              <blockquote className="font-display text-2xl leading-snug sm:text-[2rem]">“{d.destaque.texto}”</blockquote>
              <figcaption className="mt-8 flex items-center gap-3 text-sm">
                <span aria-hidden="true" className="h-px w-8 bg-clay-light" />
                <span className="font-semibold">{d.destaque.autor}</span>
                <span className="text-bone/70">{d.destaque.detalhe}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid gap-6 lg:col-span-5">
            {d.outros.map((o, i) => (
              <Reveal key={o.autor} delay={(i + 1) * 100}>
                <figure className="h-full rounded-[1.5rem] border border-line bg-bone p-6 sm:p-7">
                  <blockquote className="text-lg leading-relaxed">“{o.texto}”</blockquote>
                  <figcaption className="mt-5 text-sm font-semibold text-clay">{o.autor}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
