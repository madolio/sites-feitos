import { site } from '../config/site'
import { rotulos } from '../data/conteudo'

export default function Footer() {
  const redes = Object.entries(site.social).filter(([, r]) => r.url)

  return (
    <footer className="border-t border-foreground/10 px-6 py-10 pb-28 text-sm text-muted sm:px-10 lg:pr-16 lg:pb-10 lg:pl-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p>
            © {new Date().getFullYear()} {site.name}. {site.footerNote}
          </p>
          {redes.length > 0 && (
            <ul className="mt-1 flex flex-wrap gap-x-4">
              {redes.map(([nome, r]) => (
                <li key={nome}>
                  <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline hover:text-foreground">
                    {rotulos.seguir} {nome}: {r.handle}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="rotulo-mao !text-lg text-muted">{site.tagline}</p>
      </div>
    </footer>
  )
}
