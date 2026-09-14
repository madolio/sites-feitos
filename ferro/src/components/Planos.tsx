import { sendToWhatsApp } from '../demo'

const planos = [
  { nome: 'Mensal', preco: 'R$ 129/mês', destaque: false },
  { nome: 'Trimestral', preco: 'R$ 109/mês', destaque: true },
  { nome: 'Anual', preco: 'R$ 89/mês', destaque: false },
]

export default function Planos() {
  return (
    <section id="planos" className="border-y-4 border-iron bg-steel-50 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl md:text-4xl">Planos</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {planos.map((plano) => (
            <div
              key={plano.nome}
              className={`flex flex-col border-2 p-6 ${plano.destaque ? 'border-signal bg-iron text-steel-50' : 'border-iron'}`}
            >
              <h3 className="text-xl">{plano.nome}</h3>
              <p className={`mt-2 text-2xl tally ${plano.destaque ? 'text-signal' : 'text-iron'}`}>{plano.preco}</p>
              <button
                type="button"
                onClick={() => sendToWhatsApp(`Olá! Quero assinar o plano ${plano.nome} da Ferro.`)}
                className={`mt-6 ${plano.destaque ? 'btn-signal' : 'btn-iron'}`}
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
