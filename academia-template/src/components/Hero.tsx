import { whatsappUrl } from '../config/site'
import { cta, hero } from '../data/conteudo'
import { Rich } from './ui'

export default function Hero() {
  return (
    <section id="topo" className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden lg:min-h-[44rem]">
      <img
        src={hero.image.src}
        alt={hero.image.alt}
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover object-[65%_center]"
      />
      {/* Escurece a foto para o texto manter contraste em qualquer imagem */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/85 to-background/50" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-background/80 to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-5 pt-32 pb-14 lg:px-8 lg:pb-24">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-[3.25rem] leading-[0.92] sm:text-7xl lg:text-8xl">
          <Rich text={hero.title} />
        </h1>
        <p className="mt-6 max-w-xl text-lg text-foreground/85">{hero.text}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={whatsappUrl(cta.mensagem)} target="_blank" rel="noreferrer" className="btn btn-primary">
            {hero.primary}
          </a>
          <a href="#planos" className="btn btn-ghost">
            {hero.secondary}
          </a>
        </div>
        {hero.note && <p className="mt-6 text-sm text-foreground/75">{hero.note}</p>}
      </div>
    </section>
  )
}
