import type { Lugar } from '../places'
import { telefoneParaWhatsApp } from '../places'

export function CartaoLugar({ lugar }: { lugar: Lugar }) {
  const temSite = Boolean(lugar.site)

  return (
    <article className="rounded-lg border border-cinza bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display font-semibold text-tinta">{lugar.nome}</h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
            temSite ? 'bg-cinza/40 text-cinza' : 'bg-acento/15 text-acento'
          }`}
        >
          {temSite ? 'tem site' : 'sem site'}
        </span>
      </div>

      {lugar.endereco && <p className="mt-1 text-sm text-cinza">{lugar.endereco}</p>}

      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {lugar.telefone && (
          <>
            <a href={`tel:${lugar.telefone}`} className="rounded-md border border-cinza px-3 py-1.5 text-tinta">
              Ligar
            </a>
            <a
              href={`https://wa.me/${telefoneParaWhatsApp(lugar.telefone)}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-cinza px-3 py-1.5 text-tinta"
            >
              WhatsApp
            </a>
          </>
        )}
        {lugar.mapsUri && (
          <a href={lugar.mapsUri} target="_blank" rel="noreferrer" className="rounded-md border border-cinza px-3 py-1.5 text-tinta">
            Ver no Maps
          </a>
        )}
        {lugar.site && (
          <a href={lugar.site} target="_blank" rel="noreferrer" className="rounded-md border border-cinza px-3 py-1.5 text-cinza">
            Site existente
          </a>
        )}
      </div>
    </article>
  )
}
