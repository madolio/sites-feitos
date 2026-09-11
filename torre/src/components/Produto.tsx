import { features } from '../data'

export default function Produto() {
  return (
    <section id="produto" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="max-w-xl">
          <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
            Tudo o que precisa acontecer sozinho, acontece sozinho.
          </h2>
          <p className="mt-5 text-lg text-ink-dim">
            Você olha a torre uma vez de manhã. O resto ela resolve.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="bg-deck p-7 md:p-9">
              <h3 className="text-xl font-medium">{f.title}</h3>
              <p className="mt-2.5 text-ink-dim">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
