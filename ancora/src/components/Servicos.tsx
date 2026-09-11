import { servicos } from '../data'

export default function Servicos() {
  return (
    <section id="servicos" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <h2 className="text-4xl md:text-5xl">Serviços</h2>

        <div className="mt-14 divide-y divide-line border-y border-line">
          {servicos.map((s) => (
            <div key={s.title} className="grid gap-2 py-8 sm:grid-cols-[1fr_2fr] sm:gap-10">
              <h3 className="text-2xl">{s.title}</h3>
              <p className="max-w-lg text-indigo/75">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
