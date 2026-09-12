import { depoimentos, resultados } from '../data'

export default function Resultados() {
  return (
    <section id="resultados" className="scroll-mt-16 border-t-4 border-track bg-track py-20 text-chalk md:py-28 lg:pl-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl text-chalk sm:text-5xl">Resultado, não promessa</h2>

        <div className="mt-14 grid gap-10 border-y-2 border-chalk/20 py-10 sm:grid-cols-3">
          {resultados.map((r) => (
            <div key={r.label}>
              <p className="stopwatch text-5xl text-lane">
                {r.value}
                <span className="text-2xl">{r.unit}</span>
              </p>
              <p className="mt-2 text-sm text-chalk/70">{r.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <div key={d.author}>
              <p className="text-chalk/90">"{d.text}"</p>
              <p className="mt-3 text-sm font-bold tracking-wide text-lane uppercase">{d.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
