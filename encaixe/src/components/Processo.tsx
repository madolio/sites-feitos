import { etapas } from '../data/processo'

export default function Processo() {
  return (
    <section id="processo" className="scroll-mt-24 border-b border-line px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-heading text-3xl font-medium text-ink sm:text-4xl">Como trabalho</h2>
        <p className="mt-3 max-w-md text-ink/70">
          Da conversa inicial até a entrega, sempre nessa ordem — nenhuma
          etapa pula a anterior.
        </p>

        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {etapas.map((e) => (
            <li key={e.numero} className="border-t border-line pt-4">
              <span className="font-heading text-sm text-wood">{e.numero}</span>
              <h3 className="mt-1 font-heading text-lg font-medium text-ink">{e.titulo}</h3>
              <p className="mt-2 text-ink/70">{e.descricao}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
