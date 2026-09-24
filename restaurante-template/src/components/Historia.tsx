import { historia } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Historia() {
  return (
    <section id="historia" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <Reveal className="lg:col-span-6">
          <img src={historia.image.src} alt={historia.image.alt} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        </Reveal>
        <Reveal delay={100} className="lg:col-span-6">
          <p className="eyebrow">{historia.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={historia.title} />
          </h2>
          <div className="mt-6 space-y-4 text-lg text-muted">
            {historia.text.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
          {historia.citacao && (
            <figure className="mt-8 border-l-2 border-accent pl-6">
              <blockquote className="font-display text-2xl leading-snug italic">{historia.citacao}</blockquote>
              {historia.autorCitacao && <figcaption className="mt-3 text-sm text-muted">{historia.autorCitacao}</figcaption>}
            </figure>
          )}
        </Reveal>
      </div>
    </section>
  )
}
