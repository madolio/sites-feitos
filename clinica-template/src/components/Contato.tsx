import { site, whatsappUrl } from '../config/site'
import { contato } from '../data/conteudo'
import { IconClock, IconMail, IconPhone, IconPin, IconWhatsapp, Reveal, Rich } from './ui'

const enderecoBusca = `${site.address.line1}, ${site.address.line2}`

export default function Contato() {
  const itens = [
    { icone: <IconWhatsapp />, rotulo: 'WhatsApp', valor: site.whatsappLabel, href: whatsappUrl() },
    { icone: <IconPhone />, rotulo: 'Telefone', valor: site.phone, href: `tel:${site.phone.replace(/\D/g, '')}` },
    { icone: <IconMail />, rotulo: 'E-mail', valor: site.email, href: `mailto:${site.email}` },
  ]

  return (
    <section id="contato" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{contato.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={contato.title} />
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-6">
            <ul className="divide-y divide-line border-y border-line">
              {itens.map((i) => (
                <li key={i.rotulo}>
                  <a href={i.href} className="group flex min-h-20 items-center gap-4 py-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sage text-forest transition-colors [@media(hover:hover)]:group-hover:bg-forest [@media(hover:hover)]:group-hover:text-bone">
                      {i.icone}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold tracking-[0.16em] text-muted uppercase">{i.rotulo}</span>
                      <span className={`block font-display break-words sm:text-2xl ${i.rotulo === 'E-mail' ? 'text-base' : 'text-xl'}`}>{i.valor}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-4 py-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sage text-forest">
                  <IconClock />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-[0.16em] text-muted uppercase">Horários</span>
                  {site.hours.map((h) => (
                    <span key={h.days} className="mt-1 flex flex-wrap gap-x-3 text-lg">
                      <span>{h.days}</span>
                      <span className="text-muted">{h.time}</span>
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </Reveal>

          {/* Mapa estilizado (sem iframe, sem dado real): troque pelo embed do cliente */}
          <Reveal delay={100} className="min-w-0 lg:col-span-6">
            <div className="relative flex h-full min-h-[25rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-sage p-6 sm:p-8">
              <svg aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full text-forest/15" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M-10 220 C 90 180, 140 260, 240 200 S 380 120, 420 150" />
                <path d="M60 -10 C 90 80, 40 140, 120 320" />
                <path d="M250 -10 C 230 90, 300 140, 280 320" />
                <path d="M-10 90 L 420 60" />
                <path d="M-10 270 L 420 240" />
              </svg>
              <span aria-hidden="true" className="absolute top-[24%] left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-forest text-clay-light shadow-[0_0_0_10px_rgb(29_58_50/0.12)]">
                <IconPin className="size-6" />
              </span>
              <div className="relative">
                <p className="text-xs font-semibold tracking-[0.16em] text-clay uppercase">Endereço</p>
                <p className="mt-2 font-display text-2xl">{site.address.line1}</p>
                <p className="text-muted">
                  {site.address.line2} · CEP {site.address.zip}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoBusca)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary mt-5"
                >
                  Abrir no mapa
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
