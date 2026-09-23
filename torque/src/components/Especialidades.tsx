import Reveal from './Reveal'
import { especialidades } from '../data/especialidades'

// Mesma "borda de acento" do painel de revisão (cores de sinalização de
// oficina), só que aqui não representa status: é rodízio visual pra
// diferenciar cada OS na grade, ciclando entre os acentos já estabelecidos.
const acentoOrdem = ['border-l-sinal', 'border-l-aco', 'border-l-risco']

export default function Especialidades() {
  return (
    <section id="servicos" className="border-b border-linha py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-oficina text-aco">o que fazemos</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Serviços</h2>
        </Reveal>

        <Reveal
          as="ul"
          stagger={0.08}
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          {especialidades.map((esp, i) => (
            <li
              key={esp.nome}
              className={`rounded-md border border-linha border-l-4 bg-white p-5 ${acentoOrdem[i % acentoOrdem.length]}`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="dado-oficina text-aco/70">OS-{String(i + 1).padStart(2, '0')}</p>
                <span className="dado-oficina rounded-full border border-linha px-2 py-0.5 whitespace-nowrap text-chumbo/60">
                  {esp.tempoEstimado}
                </span>
              </div>
              <p className="mt-3 font-display text-lg">{esp.nome}</p>
              <p className="mt-2 text-sm text-chumbo/70 normal-case">{esp.descricao}</p>
              <ul className="dado-oficina mt-3 space-y-1.5 border-t border-linha pt-3 text-chumbo/55">
                {esp.itens.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-aco/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
