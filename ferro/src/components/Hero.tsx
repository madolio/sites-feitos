import { sendToWhatsApp } from '../demo'
import PlateCounter from './PlateCounter'

// Bobina de fita cassete girando sem parar — a trilha sonora que nunca
// para, mesmo princípio visual de um vinil, mas em fita (mais "garagem
// dos anos 80" que "vitrola chique").
function Reel() {
  return (
    <svg viewBox="0 0 32 32" className="reel h-10 w-10 text-ink" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="16" r="4" fill="currentColor" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <line
          key={deg}
          x1="16"
          y1="16"
          x2={16 + 9 * Math.cos((deg * Math.PI) / 180)}
          y2={16 + 9 * Math.sin((deg * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="1.4"
        />
      ))}
    </svg>
  )
}

export default function Hero() {
  return (
    <section id="inicio" className="xerox-grain relative border-b-2 border-ink pt-28 pb-16 text-center md:pt-36 md:pb-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-6 flex items-center justify-center gap-3 text-sm text-chumbo uppercase">
          <Reel />
          <span>Desde 1987 · trilha nunca para</span>
        </div>

        <h1 className="text-5xl leading-[1.05] md:text-6xl">
          Treino old school,
          <br />
          sem modinha de LED
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-chumbo">
          Peso de ferro de verdade, som de rock pesado no alto-falante.
          Academia clássica, do jeito que sempre foi.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => sendToWhatsApp('Olá! Quero fazer uma aula experimental na Ferro.')}
            className="btn-rust"
          >
            Aula experimental grátis
          </button>
        </div>

        <div className="mt-14 border-t border-ink/15 pt-8">
          <span className="tally text-5xl text-rust md:text-6xl">
            <PlateCounter target={39} />
          </span>
          <p className="mt-2 text-sm text-chumbo uppercase">anos de casa, sem trocar de dono</p>
        </div>
      </div>
    </section>
  )
}
