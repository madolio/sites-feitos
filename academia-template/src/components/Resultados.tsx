import { resultados } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Resultados() {
  return (
    <section id="metodo" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{resultados.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={resultados.title} />
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {resultados.itens.map((r, i) => (
            <li key={r.titulo} className="border-t-2 border-accent pt-5">
              <Reveal delay={i * 70}>
                <p className="font-display text-5xl leading-none font-bold text-accent tabular-nums">0{i + 1}</p>
                <h3 className="mt-4 text-3xl leading-none">{r.titulo}</h3>
                <p className="mt-3 text-muted">{r.texto}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
