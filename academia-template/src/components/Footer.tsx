import { nav, site } from '../config/site'
import { rotulos } from '../data/conteudo'
import { IconInstagram, Logo } from './ui'

export default function Footer() {
  const redes = Object.entries(site.social).filter(([, r]) => r.url)

  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-5 max-w-xs text-muted">{site.tagline}</p>
        </div>

        <nav aria-label={rotulos.rodape.navegacao} className="lg:col-span-3">
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">{rotulos.rodape.navegacao}</p>
          <ul className="mt-4 space-y-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="inline-flex min-h-11 items-center text-muted hover:text-foreground">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">{rotulos.rodape.contato}</p>
          <address className="mt-4 space-y-1 text-muted not-italic">
            <p>{site.address.line1}</p>
            <p>{site.address.line2}</p>
            <p>
              <a href={`tel:${site.phone.replace(/\D/g, '')}`} className="inline-flex min-h-11 items-center hover:text-foreground">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all hover:text-foreground">
                {site.email}
              </a>
            </p>
          </address>
          {redes.length > 0 && (
            <ul className="mt-3 flex gap-2">
              {redes.map(([nome, r]) => (
                <li key={nome}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${nome}: ${r.handle}`}
                    className="grid size-11 place-items-center border border-foreground/25 hover:border-accent hover:text-accent"
                  >
                    <IconInstagram />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-border px-5 pt-6 text-sm text-muted lg:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}. {site.footerNote}
        </p>
      </div>
    </footer>
  )
}
