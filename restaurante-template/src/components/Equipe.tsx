import { equipe } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Equipe() {
  return (
    <section id="equipe" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{equipe.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={equipe.title} />
          </h2>
        </Reveal>

        {/* auto-fit: com 1, 2 ou 3 pessoas o grid se ajusta sozinho */}
        <ul className="mt-12 grid gap-10 sm:grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),24rem))]">
          {equipe.pessoas.map((p, i) => (
            <Reveal as="li" key={p.nome} delay={i * 80}>
              <img src={p.image.src} alt={p.image.alt} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover" />
              <h3 className="mt-5 text-2xl">{p.nome}</h3>
              <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-accent uppercase">{p.papel}</p>
              <p className="mt-3 text-muted">{p.texto}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
