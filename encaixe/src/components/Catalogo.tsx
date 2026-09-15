import { pecas } from '../data/pecas'
import { sendToWhatsApp } from '../demo'
import DesenhoTecnico from './DesenhoTecnico'

export default function Catalogo() {
  return (
    <section id="catalogo" className="scroll-mt-24 border-b border-line px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl lg:pl-12">
        <h2 className="font-heading text-3xl font-medium text-ink sm:text-4xl">Catálogo</h2>
        <p className="mt-3 max-w-md text-ink/70">
          Seis peças de referência — ponto de partida, não tabela fechada.
          Toda medida e madeira mudam pra caber no seu espaço.
        </p>

        <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2">
          {pecas.map((p) => (
            <article key={p.nome} className="group">
              <div className="aspect-[10/7] bg-paper-deep/40 p-4 transition-transform duration-300 group-hover:-translate-y-1">
                <DesenhoTecnico desenho={p.desenho} nomeJunta={p.encaixe} />
              </div>
              <h3 className="mt-5 font-heading text-xl font-medium text-ink">{p.nome}</h3>
              <p className="text-sm text-ink/55">
                {p.categoria} em {p.madeira}
              </p>
              <p className="mt-3 text-ink/75">{p.descricao}</p>
              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-3">
                <span className="text-sm text-ink/60">{p.medidas}</span>
                <span className="text-sm font-semibold text-accent">{p.aPartirDe}</span>
              </div>
              <button
                type="button"
                onClick={() => sendToWhatsApp(`Olá! Quero um orçamento pra ${p.nome} (${p.medidas}, ${p.madeira}).`)}
                className="mt-4 font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Pedir esta peça
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
