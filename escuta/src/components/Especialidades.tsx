import Reveal from './Reveal'
import { especialidades } from '../data/especialidades'

export default function Especialidades() {
  return (
    <section id="especialidades" className="relative overflow-hidden border-b border-linha bg-papel-forte/60">
      {/* A pauta vem das divisorias da propria lista (divide-y). Havia aqui um SVG de
          linhas horizontais esticado (preserveAspectRatio=none) sobre a altura toda da
          secao: as linhas caiam em posicoes arbitrarias e cortavam os paragrafos. */}

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-quieto">o que trazem as pessoas que chegam aqui</p>
          <h2 className="mt-2 max-w-lg text-3xl sm:text-4xl">Questões concretas, não "bem-estar" genérico</h2>
        </Reveal>

        <Reveal as="div" stagger={0.08} className="mt-10 divide-y divide-linha border-y border-linha">
          {especialidades.map((esp, i) => (
            <div
              key={esp.nome}
              className="group relative flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-8"
            >
              {/* Indicador da linha: uma barra que cresce de cima pra baixo na
                  altura do ITEM (antes era um border-l preso so a caixa de texto,
                  solto entre o numero e o titulo, e sem resposta em toque). Vale
                  pra hover e pra toque (group-active); some com reduced-motion. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-6 bottom-6 -left-3 w-0.5 origin-top scale-y-0 bg-acolhe transition-transform duration-500 ease-out group-hover:scale-y-100 group-active:scale-y-100 motion-reduce:transition-none sm:-left-4"
              />
              <span className="dado-ficha shrink-0 text-quieto transition-colors duration-300 group-hover:text-acolhe group-active:text-acolhe sm:w-14">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="pl-5 sm:pl-6">
                <h3 className="text-xl">{esp.nome}</h3>
                <p className="mt-2 max-w-2xl text-sm text-tinta/75">{esp.descricao}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
