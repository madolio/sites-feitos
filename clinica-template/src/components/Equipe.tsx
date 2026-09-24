import { equipe } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Equipe() {
  return (
    <section id="equipe" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{equipe.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={equipe.title} />
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-16">
          {equipe.pessoas.map((p, i) => (
            <Reveal key={p.nome} delay={i * 120}>
              <article className="grid gap-6 sm:grid-cols-[minmax(0,12rem)_1fr] sm:items-end md:grid-cols-1 lg:grid-cols-[minmax(0,14rem)_1fr]">
                <div className="arch aspect-[4/5] w-full max-w-[16rem] overflow-hidden bg-sage sm:max-w-none">
                  <img
                    src={p.image.src}
                    alt={p.image.alt}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="size-full object-cover object-[50%_25%]"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-clay uppercase">{p.papel}</p>
                  <h3 className="mt-2 text-3xl">{p.nome}</h3>
                  <p className="mt-1 text-sm text-muted">{p.registro}</p>
                  <p className="mt-4 border-t border-line pt-4 text-muted">{p.texto}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
