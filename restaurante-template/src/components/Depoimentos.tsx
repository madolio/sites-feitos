import { depoimentos } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Depoimentos() {
  const d = depoimentos
  return (
    <section id="relatos" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{d.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={d.title} />
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <figure className="h-full rounded-3xl border border-border bg-surface p-8 sm:p-10">
              <span aria-hidden="true" className="font-display text-6xl leading-none text-accent">
                “
              </span>
              <blockquote className="mt-2 font-display text-2xl leading-snug sm:text-3xl">{d.destaque.texto}</blockquote>
              <figcaption className="mt-6 text-sm text-muted">
                <span className="font-semibold text-foreground">{d.destaque.autor}</span>
                {d.destaque.detalhe && <> · {d.destaque.detalhe}</>}
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid gap-8 lg:col-span-5">
            {d.outros.map((o, i) => (
              <Reveal key={o.autor} delay={(i + 1) * 80}>
                <figure className="border-t border-border pt-6">
                  <blockquote className="text-lg">{o.texto}</blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-muted">{o.autor}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
