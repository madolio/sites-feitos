import { Suspense, lazy } from 'react'
import type { Gema } from '../data/gemas'
import { pecas, type Peca } from '../data/pecas'

const Vitrine = lazy(() => import('../cena/Vitrine'))

export default function Hero({
  gema,
  peca,
  onPeca,
}: {
  gema: Gema
  peca: Peca
  onPeca: (p: Peca) => void
}) {
  return (
    <section className="relative flex h-svh w-full flex-col overflow-hidden">
      <div className="absolute inset-0">
        <Suspense fallback={<div className="h-full w-full animate-pulse bg-carvao" />}>
          <Vitrine peca={peca} gema={gema} />
        </Suspense>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-noite/70 via-transparent to-noite/90" />

      <header className="relative z-10 flex items-start justify-between p-5 sm:p-8">
        <div>
          <h1 className="font-display text-3xl">Prisma</h1>
          <p className="mt-1 text-sm text-fumo">joalheria sob medida</p>
        </div>
      </header>

      <div className="relative z-10 mt-auto flex flex-col items-center gap-5 p-5 pb-10 text-center sm:p-8 sm:pb-14">
        <p className="max-w-md text-sm text-fumo">
          Arraste pra girar. Escolha a peça — a gema com o índice de refração real de{' '}
          <span className="text-marfim">{gema.nome.toLowerCase()}</span> aparece montada nela.
        </p>

        <div className="pointer-events-auto flex gap-2 rounded-full border border-fio bg-noite/60 p-1.5 backdrop-blur">
          {pecas.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onPeca(p)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                p.id === peca.id ? 'bg-acento text-noite' : 'text-marfim hover:bg-fio'
              }`}
            >
              {p.nome}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
