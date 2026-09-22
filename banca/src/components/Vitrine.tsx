import { useState } from 'react'
import { buques, ocasioes, type Ocasiao } from '../data'
import { sendToWhatsApp } from '../demo'

// Cada buquê é a própria etiqueta de preço da banca: presa por um furo e
// barbante, com a "receita" (ingredientes) listada como numa ficha de
// feira, não um card de SaaS com ícone em caixinha.
export default function Vitrine() {
  const [filtro, setFiltro] = useState<Ocasiao | 'Todos'>('Todos')

  const visiveis = filtro === 'Todos' ? buques : buques.filter((b) => b.ocasiao === filtro)

  return (
    <section id="vitrine" className="scroll-mt-24 px-6 py-20 lg:scroll-mt-28 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-xl">
          <p className="font-display text-sm font-semibold tracking-wide text-magenta">A vitrine</p>
          <h2 className="mt-2 text-4xl font-bold text-ink sm:text-5xl">O que está no balde essa semana</h2>
          <p className="mt-4 text-ink/70">
            Preço, ocasião e a receita completa — os ingredientes exatos que
            vão no embrulho. Sem surpresa na entrega.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar por ocasião">
          {(['Todos', ...ocasioes] as const).map((o) => (
            <button
              key={o}
              onClick={() => setFiltro(o)}
              aria-pressed={filtro === o}
              className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                filtro === o
                  ? 'border-ink bg-ink text-bg'
                  : 'border-ink/25 text-ink/70 hover:border-ink/50'
              }`}
            >
              {o}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visiveis.map((b) => (
            <Etiqueta key={b.id} buque={b} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Etiqueta({ buque }: { buque: (typeof buques)[number] }) {
  return (
    <div className="relative pt-5">
      {/* barbante + furo da etiqueta */}
      <svg width="100%" height="22" viewBox="0 0 200 22" preserveAspectRatio="none" className="absolute -top-1 left-0" aria-hidden="true">
        <path d="M20,0 Q40,20 100,20 Q160,20 180,0" fill="none" stroke="var(--color-kraft-escuro)" strokeWidth="1.4" opacity="0.55" />
      </svg>
      <div className="relative z-10 mx-auto flex h-4 w-4 items-center justify-center rounded-full border-2 border-ink/40 bg-bg">
        <div className="h-1 w-1 rounded-full bg-ink/40" />
      </div>

      <div
        className="relative -mt-1 rounded-b-xl rounded-tr-xl border-2 border-ink/20 bg-paper p-5 shadow-[0_10px_24px_-16px_rgba(22,35,28,0.45)]"
        style={{ borderTopColor: buque.cor as string }}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-ink">{buque.nome}</h3>
          <span className="whitespace-nowrap font-display text-xl font-bold text-ink">
            R$ {buque.preco}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-xs font-semibold text-ink"
            style={{ backgroundColor: `color-mix(in oklab, ${buque.cor} 35%, white)` }}
          >
            {buque.ocasiao}
          </span>
          <span className="rounded-full bg-folha/10 px-2.5 py-1 text-xs font-semibold text-folha-escuro">
            {buque.estacao}
          </span>
        </div>

        <dl className="mt-4 space-y-1 border-t border-dashed border-ink/20 pt-3 text-sm text-ink/75">
          {buque.ingredientes.map((ing) => (
            <div key={ing} className="flex gap-2">
              <span className="text-ink/40">·</span>
              <span>{ing}</span>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-ink/70">Embrulho: {buque.embrulho}</p>

        <button
          onClick={() =>
            sendToWhatsApp(`Olá! Quero encomendar o buquê "${buque.nome}" (R$ ${buque.preco}).`)
          }
          className="mt-5 w-full rounded-full border-2 border-ink/25 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
        >
          Encomendar este
        </button>
      </div>
    </div>
  )
}
