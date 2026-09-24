import { whatsappUrl } from '../config/site'
import { rotulos, servicos } from '../data/conteudo'
import { IconArrow, Reveal, Rich } from './ui'

export default function Servicos() {
  return (
    <section id="cuidados" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">{servicos.eyebrow}</p>
            <h2 className="h-section mt-5">
              <Rich text={servicos.title} />
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5">
            <p className="text-lg text-muted">{servicos.intro}</p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-3">
          {servicos.itens.map((s, i) => (
            <Reveal as="li" key={s.numero} delay={i * 90} className={i === 1 ? 'md:mt-12' : ''}>
              <article className="group flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sage">
                  <img
                    src={s.image.src}
                    alt={s.image.alt}
                    width={900}
                    height={675}
                    loading="lazy"
                    className="size-full object-cover transition duration-700 [@media(hover:hover)]:group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-bone px-3 py-1 font-display text-sm text-clay italic">
                    {s.numero}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl">{s.titulo}</h3>
                <p className="mt-3 text-muted">{s.texto}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="rounded-full border border-line px-3 py-1 text-xs font-medium tracking-wide text-muted">
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl(rotulos.mensagemServico.replace('{servico}', s.titulo))}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-sm font-semibold text-clay hover:text-clay-hover"
                >
                  {rotulos.saberMais}
                  <IconArrow className="size-4 transition-transform [@media(hover:hover)]:group-hover:translate-x-1" />
                </a>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-line py-5">
          <span className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">{rotulos.tambem}</span>
          {servicos.extras.map((e) => (
            <span key={e} className="rounded-full bg-sage px-4 py-1.5 text-sm text-forest">
              {e}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
