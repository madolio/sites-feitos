import { equipe } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Equipe() {
  return (
    <section id="professores" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{equipe.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={equipe.title} />
          </h2>
          {equipe.intro && <p className="mt-5 text-lg text-muted">{equipe.intro}</p>}
        </Reveal>

        {/* Quantidade livre: o grid se ajusta ao número de professores */}
        <ul className="mt-12 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,16rem),1fr))]">
          {equipe.pessoas.map((p, i) => (
            <li key={p.nome}>
              <Reveal delay={i * 80}>
                <img src={p.image.src} alt={p.image.alt} loading="lazy" width={800} height={800} className="aspect-[4/5] w-full object-cover object-top" />
                <h3 className="mt-5 text-3xl leading-none">{p.nome}</h3>
                <p className="mt-2 text-sm font-bold tracking-[0.14em] text-accent uppercase">{p.funcao}</p>
                <p className="mt-3 text-muted">{p.bio}</p>
                {p.registro && <p className="mt-3 text-sm text-muted">{p.registro}</p>}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
