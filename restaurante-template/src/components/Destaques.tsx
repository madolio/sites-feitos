import { destaques } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Destaques() {
  return (
    <section id="destaques" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{destaques.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={destaques.title} />
          </h2>
          <p className="mt-5 text-lg text-muted">{destaques.intro}</p>
        </Reveal>

        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {destaques.itens.map((p, i) => (
            <Reveal as="li" key={p.nome} delay={(i % 4) * 80} className={i % 2 === 1 ? 'lg:mt-12' : ''}>
              <img src={p.image.src} alt={p.image.alt} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" />
              <p className="mt-5 text-xs font-semibold tracking-[0.18em] text-accent uppercase">{p.categoria}</p>
              <h3 className="mt-2 text-2xl leading-snug">{p.nome}</h3>
              <p className="mt-2 text-muted">{p.descricao}</p>
              {p.preco && <p className="mt-3 font-display text-xl text-accent">{p.preco}</p>}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
