import { useState } from 'react'
import { movements } from '../data'
import Figure from './Figure'

export default function Hero() {
  // O boneco e uma referencia visual ESTAVEL: a pose so muda quando a pessoa
  // escolhe um movimento nas abas. Nada aqui reage a rolagem nem troca sozinho
  // (antes a secao ficava presa e a rolagem escolhia o movimento no desktop, e
  // um timer trocava a pose a cada 2,8s no mobile).
  const [index, setIndex] = useState(0)
  const movement = movements[index]

  return (
    <section id="inicio" className="overflow-hidden bg-gesso pt-24 pb-16 lg:flex lg:h-svh lg:items-center lg:pt-10 lg:pb-10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
        <div>
          <h1 className="display text-[3.6rem] sm:text-7xl lg:text-[6.4rem]">Pilates é controle.</h1>
          <p className="mt-6 max-w-md text-lg text-ink/75">
            Aulas em aparelho e no solo, com no máximo três alunos por turma
            e instrutora do começo ao fim. Na Vila Madalena, em São Paulo.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#experimental" className="btn-ink">
              Agendar aula experimental
            </a>
            <a href="#horarios" className="btn-line">
              Ver horários
            </a>
          </div>
        </div>

        <div>
          <div className="mx-auto max-w-[27rem] lg:max-w-[30rem]">
            <Figure index={index} />
          </div>

          <div className="mx-auto mt-4 max-w-[30rem]">
            <div role="tablist" aria-label="Movimentos do método" className="flex flex-wrap gap-1.5">
              {movements.map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  id={`tab-${m.id}`}
                  aria-selected={i === index}
                  aria-controls="movimento"
                  onClick={() => setIndex(i)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    i === index ? 'bg-ink text-gesso' : 'text-ink/75 hover:bg-ink/10'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>

            <div id="movimento" role="tabpanel" aria-labelledby={`tab-${movement.id}`} aria-live="polite" className="mt-5 border-t-2 border-ink pt-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-2xl font-medium">{movement.name}</p>
                <p className="font-mono text-sm tabular-nums text-ink/70">
                  {String(index + 1).padStart(2, '0')}/{String(movements.length).padStart(2, '0')}
                </p>
              </div>
              <p className="mt-1 min-h-[3.2em] text-ink/85">{movement.description}</p>
              <p className="mt-2 text-sm text-ink/70">Trabalha: {movement.works.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
