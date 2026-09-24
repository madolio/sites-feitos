import { apresentacao } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Apresentacao() {
  return (
    <section id="sobre" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow">{apresentacao.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={apresentacao.title} />
          </h2>
          <div className="mt-6 space-y-4 text-lg text-muted">
            {apresentacao.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          {apresentacao.numeros.length > 0 && (
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {apresentacao.numeros.map((n) => (
                <div key={n.rotulo} className="flex flex-col-reverse justify-end gap-1">
                  <dt className="text-sm leading-snug text-muted">{n.rotulo}</dt>
                  <dd className="font-display text-3xl leading-none font-bold text-accent sm:text-5xl">{n.valor}</dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
        <Reveal delay={100} className="lg:col-span-6">
          <img
            src={apresentacao.image.src}
            alt={apresentacao.image.alt}
            loading="lazy"
            width={1000}
            height={667}
            className="aspect-[4/3] w-full object-cover"
          />
        </Reveal>
      </div>
    </section>
  )
}
