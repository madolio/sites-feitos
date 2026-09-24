import { depoimentos } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Depoimentos() {
  const d = depoimentos.destaque
  return (
    <section id="alunos" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{depoimentos.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={depoimentos.title} />
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <figure className="border-l-4 border-accent pl-6 sm:pl-8">
              <blockquote className="font-display text-3xl leading-tight font-semibold uppercase sm:text-5xl">“{d.texto}”</blockquote>
              <figcaption className="mt-6 text-muted">
                <span className="font-semibold text-foreground">{d.autor}</span>
                {d.detalhe && <span> · {d.detalhe}</span>}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5">
            <ul className="space-y-8">
              {depoimentos.outros.map((o) => (
                <li key={o.autor} className="border-t border-border pt-6">
                  <figure>
                    <blockquote className="text-lg">“{o.texto}”</blockquote>
                    <figcaption className="mt-3 font-semibold">{o.autor}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
