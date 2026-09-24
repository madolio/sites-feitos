import { diferenciais } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Diferenciais() {
  return (
    <section id="experiencia" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{diferenciais.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={diferenciais.title} />
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {diferenciais.itens.map((d, i) => (
            <Reveal as="li" key={d.titulo} delay={(i % 4) * 80} className="border-t border-border pt-6">
              <span aria-hidden="true" className="font-display text-4xl text-accent tabular-nums">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-2xl leading-snug">{d.titulo}</h3>
              <p className="mt-3 text-muted">{d.texto}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
