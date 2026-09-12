import { anuncios, tipos } from '../data'
import TipoIcon from './TipoIcon'

export default function Classificados() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
          <h2 className="text-3xl">Imóveis desta semana</h2>
          <p className="text-sm text-ink/65">{anuncios.length} anúncios</p>
        </div>

        <div className="classificados mt-8">
          {anuncios.map((a) => (
            <article key={a.codigo} className="mb-8 border-b border-line pb-6">
              <div className="flex items-start gap-3">
                <TipoIcon tipo={a.tipo} className="mt-0.5 h-7 w-7 shrink-0 text-steel" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="text-lg leading-tight font-bold">{a.titulo}</h3>
                    {a.novo && (
                      <span className="rounded-sm bg-ink px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wide text-paper uppercase">
                        Novo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink/65">{a.bairro}</p>
                </div>
              </div>

              <p className="mt-2.5 text-ink/80">{a.descricao}</p>

              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-dotted border-line pt-2.5 text-sm">
                <span className="font-bold text-steel">{a.preco}</span>
                <span className="text-ink/65">
                  {a.area}
                  {a.quartos ? ` · ${a.quartos} quarto${a.quartos > 1 ? 's' : ''}` : ''} · Cód. {a.codigo}
                </span>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-2 text-xs text-ink/65">
          {tipos.map((t) => t.label).join(' · ')} — categorias deste classificado
        </p>
      </div>
    </section>
  )
}
