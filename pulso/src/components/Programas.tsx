import { programas } from '../data'

const widths = ['25%', '35%', '25%', '15%']
const colors = ['bg-lane', 'bg-track', 'bg-lane/60', 'bg-track/60']

export default function Programas() {
  return (
    <section id="programas" className="scroll-mt-16 border-t-4 border-track py-20 md:py-28 lg:pl-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl sm:text-5xl">A pista do seu treino</h2>
        <p className="mt-4 max-w-md text-lg text-track/70">
          Quatro trechos, na ordem em que o corpo evolui — não pula etapa.
        </p>

        {/* Barra de distância */}
        <div className="mt-14 flex h-4 overflow-hidden rounded-full border-2 border-track">
          {programas.map((p, i) => (
            <div key={p.id} className={colors[i]} style={{ width: widths[i] }} aria-hidden="true" />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs font-bold tracking-widest text-track/50">
          <span>0M</span>
          <span>100M</span>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {programas.map((p) => (
            <div key={p.id} className="border-t-2 border-track pt-5">
              <p className="stopwatch text-sm text-lane-ink">{p.distance}</p>
              <h3 className="mt-1 text-2xl">{p.name}</h3>
              <p className="mt-2 text-track/70">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
