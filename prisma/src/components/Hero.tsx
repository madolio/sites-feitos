import { Suspense, lazy } from 'react'
import type { Gema } from '../data/gemas'

const Vitrine = lazy(() => import('../cena/Vitrine'))

export default function Hero({ gema }: { gema: Gema }) {
  return (
    <section className="relative flex h-svh w-full flex-col overflow-hidden">
      <div className="absolute inset-0">
        <Suspense fallback={<div className="h-full w-full animate-pulse bg-carvao" />}>
          <Vitrine gema={gema} girando />
        </Suspense>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-noite/70 via-transparent to-noite" />

      <header className="relative z-10 flex items-start justify-between p-5 sm:p-8">
        <div>
          <h1 className="font-display text-3xl">Prisma</h1>
          <p className="mt-1 text-sm text-fumo">joalheria sob medida</p>
        </div>
      </header>

      <div className="relative z-10 mt-auto p-5 pb-12 sm:p-8 sm:pb-16">
        <p className="max-w-sm text-sm text-fumo">
          Índice de refração real: <span className="tabular text-marfim">{gema.ior.toFixed(3)}</span> — {gema.nome}
        </p>
        <h2 className="mt-2 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
          Cada pedra dobra a luz do jeito que a física dela exige.
        </h2>
        <p className="mt-4 max-w-md text-fumo">
          Nada de brilho genérico: a gema que gira aí atrás usa o índice de refração de verdade de cada pedra —
          o mesmo número que sai de um refratômetro de gemólogo.
        </p>
      </div>
    </section>
  )
}
