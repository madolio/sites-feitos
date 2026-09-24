import { nav, site, whatsappUrl } from '../config/site'
import { rotulos } from '../data/conteudo'
import { IconInstagram, IconWhatsapp, Logo } from './ui'

export default function Footer() {
  return (
    <footer className="on-dark bg-ink text-bone/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-5">
          <Logo light />
          <p className="mt-5 max-w-xs text-sm">{site.tagline}</p>
          <div className="mt-6 flex gap-3">
            {site.social.instagram.url && (
              <a
                href={site.social.instagram.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram ${site.social.instagram.handle}`}
                className="grid size-11 place-items-center rounded-full border border-bone/25 hover:border-clay-light hover:text-clay-light"
              >
                <IconInstagram />
              </a>
            )}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              aria-label={rotulos.contato.whatsapp}
              className="grid size-11 place-items-center rounded-full border border-bone/25 hover:border-clay-light hover:text-clay-light"
            >
              <IconWhatsapp />
            </a>
          </div>
        </div>

        <nav aria-label={rotulos.rodape.navegacao} className="md:col-span-3">
          <p className="text-xs font-semibold tracking-[0.18em] text-clay-light uppercase">{rotulos.rodape.navegacao}</p>
          <ul className="mt-4 space-y-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="inline-flex min-h-9 items-center text-sm hover:text-bone">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm md:col-span-4">
          <p className="text-xs font-semibold tracking-[0.18em] text-clay-light uppercase">{rotulos.rodape.contato}</p>
          <address className="mt-4 space-y-1 not-italic">
            <p>{site.address.line1}</p>
            <p>{site.address.line2}</p>
            <p className="pt-2">{site.phone}</p>
            <p className="break-words">{site.email}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-bone/60 lg:px-8">
          © {new Date().getFullYear()} {site.name}.{site.footerNote && ` ${site.footerNote}`}
        </p>
      </div>
    </footer>
  )
}
