import { flashes } from '../data/flashes'
import { sendToWhatsApp } from '../demo'
import Flash from './Flash'

export default function PainelFlashes() {
  return (
    <section className="panel h-svh w-screen shrink-0 overflow-y-auto px-6 py-20 sm:px-10 sm:py-24">
      <h2 className="font-display text-3xl tracking-widest text-paper uppercase sm:text-4xl">
        Parede de flash
      </h2>
      <p className="mt-2 max-w-md text-paper/65">
        Desenho fechado, sem alteração — feito assim, no dia, sem agendar.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
        {flashes.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => sendToWhatsApp(`Olá, Tinta! Quero marcar a flash "${f.nome}" (${f.preco}).`)}
            className="group flex flex-col items-center gap-3 border border-line p-5 text-center transition-colors hover:border-ember"
          >
            <Flash tipo={f.tipo} className="h-16 w-16 text-paper transition-colors group-hover:text-ember" />
            <span className="text-sm font-medium text-paper">{f.nome}</span>
            <span className="text-xs text-paper/55">{f.preco}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
