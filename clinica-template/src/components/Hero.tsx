import { images } from '../config/images'
import { site, whatsappUrl } from '../config/site'
import { equipe, hero } from '../data/conteudo'
import { IconArrow, Reveal, Rich } from './ui'

export default function Hero() {
  const lead = equipe.pessoas[0]
  return (
    <section id="topo" className="relative overflow-hidden">
      {/* Linhas concêntricas decorativas atrás da imagem */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 600"
        className="pointer-events-none absolute -top-24 -right-40 hidden size-[42rem] text-forest/10 lg:block"
        fill="none"
        stroke="currentColor"
      >
        {[100, 160, 220, 280].map((r) => (
          <circle key={r} cx="300" cy="300" r={r} />
        ))}
      </svg>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-10 pb-16 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">{hero.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-[2.5rem] leading-[1.04] sm:text-6xl lg:text-[4.5rem]">
              <Rich text={hero.title} />
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg text-muted">{hero.text}</p>
          </Reveal>
          <Reveal delay={240} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn btn-primary">
              {hero.primary}
              <IconArrow />
            </a>
            <a href="#cuidados" className="btn btn-ghost">
              {hero.secondary}
            </a>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-10 flex items-center gap-3 border-t border-line pt-5 text-sm text-muted">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-clay" />
              {hero.note}
            </p>
          </Reveal>
        </div>

        {/* Imagem em arco, com bloco deslocado, selo giratório e cartão */}
        <Reveal className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none" delay={120}>
          <div aria-hidden="true" className="arch absolute top-6 left-6 h-full w-full bg-sage" />
          <div className="arch relative aspect-[4/5] overflow-hidden bg-sage">
            <img
              src={images.hero.src}
              alt={images.hero.alt}
              width={1000}
              height={1250}
              fetchPriority="high"
              className="size-full object-cover object-[50%_20%]"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute -top-3 -left-3 grid size-24 place-items-center rounded-full bg-bone shadow-[0_0_0_1px_var(--color-line)] sm:-left-6 sm:size-28"
          >
            <svg viewBox="0 0 100 100" className="girar absolute inset-0 size-full text-clay">
              <defs>
                <path id="circulo" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
              </defs>
              <text fontSize="10.5" letterSpacing="3.2" fill="currentColor" fontWeight="600">
                <textPath href="#circulo">{hero.selo}</textPath>
              </text>
            </svg>
            <span className="font-display text-3xl text-forest italic">{site.initial}</span>
          </div>

          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-bone p-3 pr-5 shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--color-ink)_35%,transparent)] ring-1 ring-line sm:-left-6">
            <span
              aria-hidden="true"
              className="grid size-11 place-items-center rounded-full bg-forest font-display text-lg text-clay-light italic"
            >
              {lead.nome.replace(/^(Dra?|Dr\.?a?)\.?\s*/i, '').charAt(0)}
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base">{lead.nome}</span>
              <span className="block text-xs tracking-wide text-muted">{lead.papel}</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
