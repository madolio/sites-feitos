import { metodo } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Metodo() {
  return (
    <section id="metodo" className="on-dark dots relative overflow-hidden bg-forest py-20 text-bone lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{metodo.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={metodo.title} />
          </h2>
        </Reveal>

        <ol className="relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {/* fio que liga os passos (vertical no mobile, horizontal no desktop) */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[1.05rem] w-px bg-bone/20 lg:top-[1.15rem] lg:right-8 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
          />
          {metodo.passos.map((p, i) => (
            <Reveal as="li" key={p.titulo} delay={i * 100} className="relative pl-14 lg:pt-14 lg:pl-0">
              <span className="absolute top-0 left-0 grid size-9 place-items-center rounded-full border border-clay-light bg-forest font-display text-sm text-clay-light italic">
                {i + 1}
              </span>
              <h3 className="text-2xl">{p.titulo}</h3>
              <p className="mt-3 text-bone/75">{p.texto}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
