import { site, whatsappUrl } from '../config/site'
import { cta } from '../data/conteudo'
import { IconWhatsapp, Reveal, Rich } from './ui'

export default function Cta() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink py-24 text-center text-bone lg:py-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[26rem] leading-none text-bone/[0.04] italic select-none sm:text-[38rem]"
      >
        {site.initial}
      </span>
      <Reveal className="relative mx-auto max-w-3xl px-5">
        <p className="eyebrow">{cta.eyebrow}</p>
        <h2 className="mt-6 text-[2.25rem] leading-[1.08] sm:text-6xl">
          <Rich text={cta.title} />
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-bone/75">{cta.text}</p>
        <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn btn-light mt-10">
          <IconWhatsapp />
          {cta.botao}
        </a>
      </Reveal>
    </section>
  )
}
