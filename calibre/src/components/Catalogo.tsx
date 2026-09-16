import { relogios } from '../data/relogios'
import { sendToWhatsApp } from '../demo'
import Mostrador from './Mostrador'
import Reveal from './Reveal'

export default function Catalogo() {
  return (
    <section id="catalogo" className="scroll-mt-20 border-b border-line px-6 py-20 sm:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-heading text-4xl font-medium text-cream sm:text-5xl">Modelos de referência</h2>
          <p className="mt-3 max-w-md text-cream/65">
            Ponto de partida pra conversa, não tabela fechada — caixa, mostrador
            e movimento mudam conforme a encomenda.
          </p>
        </Reveal>

        <Reveal as="div" stagger={0.08} className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {relogios.map((r) => (
            <article key={r.nome} className="group flex gap-6">
              <div className="h-32 w-32 shrink-0 rounded-full bg-black/20 p-2 ring-1 ring-transparent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:ring-brass/40">
                <Mostrador
                  corFundo={r.corFundo}
                  corMarcadores={r.corMarcadores}
                  corPonteiros={r.corPonteiros}
                  contadores={r.contadores}
                />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-medium text-cream">{r.nome}</h3>
                <p className="text-sm text-cream/55">
                  Caixa {r.caixa}, movimento {r.movimento}
                </p>
                <p className="mt-2 text-cream/75">{r.descricao}</p>
                <div className="mt-3 flex items-center gap-4">
                  <span className="text-sm font-semibold text-brass">{r.aPartirDe}</span>
                  <button
                    type="button"
                    onClick={() => sendToWhatsApp(`Olá! Quero saber mais sobre o modelo ${r.nome}.`)}
                    className="text-sm font-semibold text-cream underline decoration-cream/30 underline-offset-4 transition-colors hover:text-brass hover:decoration-brass"
                  >
                    Perguntar sobre este
                  </button>
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
