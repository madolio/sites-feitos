import { site, whatsappUrl } from '../config/site'
import { reserva } from '../data/conteudo'
import { IconPhone, IconWhatsapp, Reveal, Rich } from './ui'

export default function Reserva() {
  return (
    <section id="reservas" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="grid gap-10 rounded-3xl border border-border bg-background p-8 sm:p-12 lg:grid-cols-12 lg:gap-16 lg:p-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">{reserva.eyebrow}</p>
            <h2 className="h-section mt-5">
              <Rich text={reserva.title} />
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted">{reserva.text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappUrl(reserva.mensagem)} target="_blank" rel="noreferrer" className="btn btn-primary">
                <IconWhatsapp />
                {reserva.botao}
              </a>
              <a href={`tel:${site.phone.replace(/\D/g, '')}`} className="btn btn-ghost">
                <IconPhone />
                {site.phone}
              </a>
            </div>
          </div>
          <dl className="grid content-start gap-6 lg:col-span-5">
            {reserva.detalhes.map((d) => (
              <div key={d.rotulo} className="border-t border-border pt-4">
                <dt className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">{d.rotulo}</dt>
                <dd className="mt-1 text-lg">{d.texto}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
