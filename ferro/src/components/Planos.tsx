import { sendToWhatsApp } from '../demo'

const planos = [
  { nome: 'Diária', preco: 'R$ 25', destaque: false },
  { nome: 'Mensal', preco: 'R$ 119/mês', destaque: true },
  { nome: 'Anual', preco: 'R$ 99/mês', legenda: 'fechado por 12 meses', destaque: false },
]

export default function Planos() {
  return (
    <section id="planos" className="border-b-2 border-preto bg-branco py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl md:text-4xl">Planos</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {planos.map((plano) => (
            <div
              key={plano.nome}
              className={`flex flex-col border-2 p-6 transition-colors duration-300 ${
                plano.destaque ? 'border-preto bg-preto text-branco' : 'border-preto/20 hover:border-preto'
              }`}
            >
              <h3 className="text-xl">{plano.nome}</h3>
              <p className={`tabular mt-2 text-2xl font-bold ${plano.destaque ? 'text-lima' : 'text-preto'}`}>
                {plano.preco}
              </p>
              {plano.legenda && <p className="mt-1 text-sm text-fumo">{plano.legenda}</p>}
              <button
                type="button"
                onClick={() => sendToWhatsApp(`Olá! Quero o plano ${plano.nome} da Ferro.`)}
                className={`mt-6 ${plano.destaque ? 'btn-lima' : 'btn-contorno'}`}
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
