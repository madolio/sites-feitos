import Reveal from './Reveal'
import CurvaEspecialidade from './CurvaEspecialidade'
import { especialidades } from '../data/especialidades'

export default function Especialidades() {
  return (
    <section id="especialidades" className="border-b border-linha bg-papel-forte/60">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <Reveal>
          <p className="dado-mapa text-altitude">o que tratamos</p>
          <h2 className="mt-2 max-w-lg text-3xl sm:text-4xl">Cinco frentes, uma abordagem: avaliar antes de tratar</h2>
          <p className="mt-3 max-w-xl text-sm text-tinta/60">
            Cada especialidade tem seu próprio relevo — o mesmo tipo de curva de nível do mapa da
            recuperação, mais acidentado ou mais suave conforme a natureza do tratamento.
          </p>
        </Reveal>

        <Reveal as="div" stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-2">
          {especialidades.map((esp) => (
            <div
              key={esp.nome}
              className="flex gap-5 rounded-xl border border-linha bg-papel p-6 transition-colors hover:border-contorno/50"
            >
              <div className="h-16 w-16 shrink-0 rounded-full border border-linha bg-papel-forte/70 p-2">
                <CurvaEspecialidade {...esp.curva} className="h-full w-full" />
              </div>
              <div>
                <h3 className="text-xl">{esp.nome}</h3>
                <p className="mt-2 text-sm text-tinta/75">{esp.descricao}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
