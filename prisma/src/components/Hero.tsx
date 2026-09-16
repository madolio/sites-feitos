import { Suspense, lazy } from 'react'
import { gemas, type Gema } from '../data/gemas'
import { pecas, type Peca } from '../data/pecas'

const Vitrine = lazy(() => import('../cena/Vitrine'))

export default function Hero({
  gema,
  peca,
  onPeca,
  onGema,
}: {
  gema: Gema
  peca: Peca
  onPeca: (p: Peca) => void
  onGema: (g: Gema) => void
}) {
  return (
    <section className="relative flex min-h-svh w-full flex-col overflow-hidden bg-noite lg:flex-row">
      <header className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5 sm:p-8">
        <div>
          <h1 className="font-display text-3xl">Prisma</h1>
          <p className="mt-1 text-sm text-fumo">joalheria sob medida</p>
        </div>
      </header>

      {/* Esquerda: a joia. Direita: escolha de peça e pedra — layout em
          coluna dupla no lugar do antigo canvas full-bleed com um seletor
          flutuando por cima, pra abrir espaço pra mais peças/gemas sem
          disputar espaço com o próprio 3D. */}
      <div className="relative h-[60svh] w-full pt-16 lg:h-svh lg:w-1/2 lg:pt-0">
        <Suspense fallback={<div className="h-full w-full animate-pulse bg-carvao" />}>
          <Vitrine peca={peca} gema={gema} />
        </Suspense>
      </div>

      <div className="flex w-full flex-col justify-center gap-8 px-5 py-10 sm:px-8 lg:w-1/2 lg:py-8">
        <div>
          <p className="text-sm text-fumo">
            Índice de refração real: <span className="text-marfim">{gema.ior.toFixed(3)}</span> — {gema.nome}
          </p>
          <h2 className="mt-2 max-w-md font-display text-3xl leading-tight sm:text-4xl">
            Escolha a peça e a pedra
          </h2>
          <p className="mt-3 max-w-md text-sm text-fumo">Arraste a joia pra girar. Cada pedra usa o índice de refração real dela.</p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide text-fumo uppercase">Peça</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {pecas.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onPeca(p)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  p.id === peca.id
                    ? 'border-acento bg-acento text-noite'
                    : 'border-fio text-marfim hover:border-acento/60'
                }`}
              >
                {p.nome}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-wide text-fumo uppercase">Pedra</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {gemas.map((g) => {
              const ativa = g.id === gema.id
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => onGema(g)}
                  title={`${g.nome} — IOR ${g.ior.toFixed(3)}`}
                  className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                    ativa ? 'border-acento bg-carvao' : 'border-fio bg-carvao/50 hover:border-acento/60'
                  }`}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ backgroundColor: g.cor, boxShadow: `0 0 8px ${g.cor}` }}
                  />
                  {g.nome}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
