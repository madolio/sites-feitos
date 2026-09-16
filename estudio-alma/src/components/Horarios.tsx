import { dias, grade } from '../data'

export default function Horarios() {
  return (
    <section id="horarios" className="scroll-mt-16 bg-ink py-20 text-gesso md:py-28 lg:scroll-mt-0">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-6xl md:text-8xl">Horários</h2>
          <div className="flex gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-azul ring-1 ring-gesso/40" aria-hidden="true" />
              Aparelhos (até 3)
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 bg-amarela" aria-hidden="true" />
              Solo (até 6)
            </span>
          </div>
        </div>

        {/* `relative` é necessário: os `sr-only` da tabela são position:absolute
            e, sem um ancestral posicionado, escapam do overflow e alargam a
            página no celular. */}
        <div className="relative mt-12 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">Grade semanal de turmas do Estúdio Alma</caption>
            <thead>
              <tr>
                <th scope="col" className="w-16 pb-3 text-sm font-normal text-gesso/70">
                  <span className="sr-only">Horário</span>
                </th>
                {dias.map((dia) => (
                  <th key={dia} scope="col" className="pb-3 text-sm font-medium">
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grade.map((row) => (
                <tr key={row.hora} className="border-t border-gesso/15">
                  <th scope="row" className="py-2 pr-3 text-lg font-medium tabular-nums">
                    {row.hora}
                  </th>
                  {row.slots.map((slot, i) => (
                    <td key={dias[i]} className="p-1">
                      {slot === 'A' && (
                        <span className="flex h-10 items-center rounded-full bg-azul px-3 text-sm text-white">
                          Aparelhos
                        </span>
                      )}
                      {slot === 'S' && (
                        <span className="flex h-10 items-center bg-amarela px-3 text-sm text-ink">Solo</span>
                      )}
                      {slot === null && <span className="sr-only">Sem turma</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 max-w-xl text-gesso/75">
          Aulas de 55 minutos. Particulares com horário combinado, inclusive
          fora da grade.
        </p>
      </div>
    </section>
  )
}
