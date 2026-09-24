import { modalidades } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Modalidades() {
  return (
    <section id="modalidades" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{modalidades.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={modalidades.title} />
          </h2>
          <p className="mt-5 text-lg text-muted">{modalidades.intro}</p>
        </Reveal>

        <ul className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {modalidades.itens.map((m, i) => (
            <li key={m.nome} className="bg-surface">
              <Reveal delay={i * 70} className="group relative flex h-full flex-col">
                <div className="overflow-hidden">
                  <img
                    src={m.image.src}
                    alt={m.image.alt}
                    loading="lazy"
                    width={900}
                    height={600}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-display text-sm font-bold tracking-[0.18em] text-accent tabular-nums">0{i + 1}</p>
                  <h3 className="mt-2 text-4xl leading-none">{m.nome}</h3>
                  <p className="mt-4 text-muted">{m.descricao}</p>
                  {m.detalhe && <p className="mt-auto pt-5 text-sm font-semibold text-foreground">{m.detalhe}</p>}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
