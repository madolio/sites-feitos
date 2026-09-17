import { aulas } from '../data'

function Shape({ shape, color }: { shape: 'circle' | 'square' | 'triangle'; color: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-24 w-24 origin-center transition-transform duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:rotate-6 md:h-28 md:w-28"
      aria-hidden="true"
    >
      {shape === 'circle' && <circle cx="60" cy="60" r="58" fill={color} />}
      {shape === 'square' && <rect x="4" y="4" width="112" height="112" fill={color} />}
      {shape === 'triangle' && <path d="M60 4 L116 116 L4 116 Z" fill={color} />}
    </svg>
  )
}

const springs = ['#f2b300', '#2f8f5b', '#2c4fa3', '#d63c3c']

export default function Aulas() {
  return (
    <section id="aulas" className="scroll-mt-16 border-t-2 border-ink py-20 md:py-28 lg:scroll-mt-0">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="display text-6xl md:text-8xl">Três jeitos de fazer aula.</h2>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {aulas.map((aula) => (
            <article key={aula.name} className="group">
              <Shape shape={aula.shape} color={aula.color} />
              <h3 className="mt-7 text-3xl font-medium tracking-tight">{aula.name}</h3>
              <p className="mt-1 text-ink/70">{aula.detail}</p>
              <p className="mt-4 max-w-xs text-ink/85">{aula.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-20 grid items-center gap-8 border-t-2 border-ink pt-10 md:grid-cols-[auto_1fr] md:gap-12">
          <svg viewBox="0 0 220 64" className="h-14 w-auto" aria-hidden="true">
            {springs.map((color, i) => (
              <g key={color} transform={`translate(${i * 56} 0)`}>
                <path
                  d="M4 32 h6 l4 -16 l8 32 l8 -32 l8 32 l4 -16 h6"
                  fill="none"
                  stroke={color}
                  strokeWidth="5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </g>
            ))}
          </svg>
          <p className="max-w-xl text-ink/85">
            No reformer, cada mola tem uma cor, e cada cor, uma carga. Foi dela
            que saíram as cores deste site. Na aula, a instrutora troca as
            molas pra que o exercício fique na medida do seu corpo naquele dia.
          </p>
        </div>
      </div>
    </section>
  )
}
