import { depoimentos } from '../data'

// A onda tem altura FIXA (h-7 / sm:h-10). Antes era um único SVG com
// viewBox 0 0 600 240 e preserveAspectRatio="none" esticado por trás do bloco
// inteiro: a amplitude da onda crescia junto com a altura do texto, então no
// mobile (bloco de ~510px) a crista virava ~64px e cobria a linha do autor.
// Agora a fita é onda-fixa + miolo sólido + onda-fixa, e só o miolo estica.
function Onda({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 40"
      preserveAspectRatio="none"
      className={`block h-7 w-full sm:h-10 ${className}`}
      aria-hidden="true"
    >
      <path d="M0 40 V20 Q75 0 150 20 T300 20 T450 20 T600 20 V40 Z" fill="var(--color-sky)" />
      <path
        d="M0 40 V20 Q75 0 150 20 T300 20 T450 20 T600 20 V40"
        fill="none"
        stroke="var(--color-carbon)"
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export default function Ribbon() {
  return (
    <section className="border-t-[1.5px] border-carbon py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Onda />

        <div className="-my-px border-x-[1.5px] border-carbon bg-sky px-6 py-6 sm:px-10 sm:py-8">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            {depoimentos.map((d) => (
              <figure key={d.autor} className="flex h-full flex-col">
                <blockquote className="text-lg leading-snug font-semibold text-carbon">
                  &ldquo;{d.texto}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm text-carbon/75 sm:mt-auto sm:pt-3">{d.autor}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <Onda className="rotate-180" />
      </div>
    </section>
  )
}
