import { site, whatsappUrl } from '../config/site'
import { cta } from '../data/conteudo'
import { IconPhone, IconWhatsapp, Reveal, Rich } from './ui'

export default function CtaFinal() {
  return (
    <section id="experimental" className="relative isolate overflow-hidden py-20 lg:py-28">
      <img src={cta.image.src} alt={cta.image.alt} loading="lazy" width={1400} height={933} className="absolute inset-0 -z-20 size-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-background/90" />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">{cta.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={cta.title} />
          </h2>
          <p className="mt-5 max-w-xl text-lg text-foreground/85">{cta.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappUrl(cta.mensagem)} target="_blank" rel="noreferrer" className="btn btn-primary">
              <IconWhatsapp />
              {cta.botao}
            </a>
            <a href={`tel:${site.phone.replace(/\D/g, '')}`} className="btn btn-ghost">
              <IconPhone />
              {site.phone}
            </a>
          </div>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-5">
          <dl className="grid content-start gap-6">
            {cta.detalhes.map((d) => (
              <div key={d.rotulo} className="border-t border-foreground/25 pt-4">
                <dt className="text-xs font-bold tracking-[0.16em] text-accent uppercase">{d.rotulo}</dt>
                <dd className="mt-1 text-lg">{d.texto}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
