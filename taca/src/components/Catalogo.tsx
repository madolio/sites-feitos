import { vinhos } from '../data/vinhos'
import { sendToWhatsApp } from '../demo'
import Rotulo from './Rotulo'

export default function Catalogo() {
  return (
    <section id="rotulos" className="scroll-mt-20 border-b border-line px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-heading text-4xl font-medium text-ink sm:text-5xl">Rótulos da casa</h2>
        <p className="mt-3 max-w-md text-ink/65">Lote pequeno, safra marcada — quando um rótulo acaba, só volta na colheita seguinte.</p>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {vinhos.map((v) => (
            <article key={v.nome} className="border-t border-line pt-6">
              <Rotulo />
              <h3 className="mt-3 font-heading text-2xl font-medium text-ink italic">{v.nome}</h3>
              <p className="text-sm text-ink/55">
                {v.uva}, {v.safra}
              </p>
              <p className="mt-2 text-ink/75">{v.notas}</p>
              <div className="mt-3 flex items-center gap-4">
                <span className="text-sm font-semibold text-garnet">{v.aPartirDe}</span>
                <button
                  type="button"
                  onClick={() => sendToWhatsApp(`Olá! Quero saber mais sobre o ${v.nome}.`)}
                  className="text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-garnet hover:decoration-garnet"
                >
                  Perguntar sobre este
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
