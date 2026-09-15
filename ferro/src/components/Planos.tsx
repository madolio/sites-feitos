import { sendToWhatsApp } from '../demo'

const planos = [
  { nome: 'Diária', preco: 'R$ 25', destaque: false },
  { nome: 'Mensal', preco: 'R$ 119/mês', destaque: true },
  { nome: 'Old School', preco: 'R$ 99/mês', legenda: 'sócio há mais de 5 anos', destaque: false },
]

export default function Planos() {
  return (
    <section id="planos" className="border-y-2 border-ink bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl md:text-4xl">Planos</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {planos.map((plano) => (
            <div
              key={plano.nome}
              className={`flex flex-col border-2 p-6 ${plano.destaque ? 'border-steel bg-ink text-paper' : 'border-ink'}`}
            >
              <h3 className="text-xl">{plano.nome}</h3>
              <p className={`mt-2 text-2xl tally ${plano.destaque ? 'text-[color:var(--color-steel-bright)]' : 'text-ink'}`}>
                {plano.preco}
              </p>
              {plano.legenda && <p className="mt-1 text-sm text-chumbo">{plano.legenda}</p>}
              <button
                type="button"
                onClick={() => sendToWhatsApp(`Olá! Quero o plano ${plano.nome} da Ferro.`)}
                className={`mt-6 ${plano.destaque ? 'btn-steel' : 'btn-ink'}`}
              >
                Quero esse plano
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
