import { apresentacao } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Apresentacao() {
  return (
    <section id="restaurante" className="py-20 lg:py-28">
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
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
            {apresentacao.numeros.map((n) => (
              <div key={n.rotulo}>
                <dt className="font-display text-4xl text-accent sm:text-5xl">{n.valor}</dt>
                <dd className="mt-1 text-sm text-muted">{n.rotulo}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-6">
          <img
            src={apresentacao.image.src}
            alt={apresentacao.image.alt}
            loading="lazy"
            className="aspect-[4/5] w-full rounded-t-[999px] object-cover sm:aspect-[5/4] sm:rounded-t-[2rem] lg:aspect-[4/5]"
          />
        </Reveal>
      </div>
    </section>
  )
}
