import { site, whatsappUrl } from '../config/site'
import { contato, rotulos } from '../data/conteudo'

export default function Contato() {
  const r = rotulos.contato
  return (
    <section id="contato" className="px-6 py-20 sm:px-10 lg:pl-16">
      <div className="mx-auto max-w-6xl">
        <div className="ficha textura-papel grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="rotulo-mao !text-accent">{contato.rotulo}</p>
            <h2 className="mt-2 text-3xl text-ink sm:text-4xl">{contato.title}</h2>
            <p className="mt-3 max-w-md text-ink-muted">{contato.text}</p>

            <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn-tinta mt-7">
              {contato.botao}
            </a>
          </div>

          <div className="min-w-0 border-t border-ink/15 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <dl className="space-y-4 text-sm text-ink-muted">
              <div>
                <dt className="text-xs tracking-wide text-ink-muted uppercase">{r.whatsapp}</dt>
                <dd className="mt-1">{site.whatsappLabel}</dd>
              </div>
              {site.phone && (
                <div>
                  <dt className="text-xs tracking-wide text-ink-muted uppercase">{r.telefone}</dt>
                  <dd className="mt-1">{site.phone}</dd>
                </div>
              )}
              {site.email && (
                <div>
                  <dt className="text-xs tracking-wide text-ink-muted uppercase">{r.email}</dt>
                  <dd className="mt-1 break-words">
                    <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-xs tracking-wide text-ink-muted uppercase">{r.endereco}</dt>
                <dd className="mt-1">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-ink-muted uppercase">{r.horario}</dt>
                <dd className="mt-1">
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}, {h.time}
                    </span>
                  ))}
                </dd>
              </div>
              {contato.extras.map((e) => (
                <div key={e.rotulo}>
                  <dt className="text-xs tracking-wide text-ink-muted uppercase">{e.rotulo}</dt>
                  <dd className="mt-1">{e.texto}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
