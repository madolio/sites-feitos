import { whatsappUrl } from '../config/site'
import { planos, rotulos } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Planos() {
  return (
    <section id="planos" className="tema-claro py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{planos.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={planos.title} />
          </h2>
          <p className="mt-5 text-lg text-muted">{planos.intro}</p>
        </Reveal>

        <ul className="mt-12 grid items-stretch gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,17rem),1fr))]">
          {planos.itens.map((p, i) => {
            const d = p.destaque
            return (
              <li key={p.nome} className="flex">
                <Reveal
                  delay={i * 80}
                  className={`flex w-full flex-col p-7 sm:p-8 ${d ? 'bg-accent text-accent-foreground' : 'border-2 border-border bg-surface'}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
                    <h3 className="text-4xl leading-none">{p.nome}</h3>
                    {d && (
                      <span className="shrink-0 bg-accent-foreground px-2.5 py-1 text-xs font-bold tracking-[0.12em] text-accent uppercase">
                        {rotulos.planos.recomendado}
                      </span>
                    )}
                  </div>
                  <p className={`mt-3 ${d ? 'text-accent-foreground/90' : 'text-muted'}`}>{p.descricao}</p>
                  <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
                    {p.preco && <span className="font-display text-6xl leading-none font-bold">{p.preco}</span>}
                    <span className={`text-sm font-semibold ${d ? 'text-accent-foreground/90' : 'text-muted'}`}>{p.periodo}</span>
                  </p>
                  <ul className="mt-6 mb-8 space-y-3 border-t border-current/25 pt-6">
                    {p.beneficios.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span aria-hidden="true" className={`mt-2.5 size-2 shrink-0 rotate-45 ${d ? 'bg-accent-foreground' : 'bg-accent'}`} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappUrl(`${planos.mensagem} ${p.nome}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className={`btn mt-auto ${d ? 'bg-accent-foreground text-accent hover:opacity-90' : 'btn-primary'}`}
                  >
                    {p.botao}
                    <span className="sr-only"> ({p.nome})</span>
                  </a>
                </Reveal>
              </li>
            )
          })}
        </ul>
        {planos.observacao && <p className="mt-8 text-sm text-muted">{planos.observacao}</p>}
      </div>
    </section>
  )
}
