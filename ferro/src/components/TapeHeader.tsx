import { sendToWhatsApp } from '../demo'

// Substitui a nav horizontal comum por uma tira de papel colada com fita
// crepe no topo do galpão escuro — leve inclinação, sem sombra de app
// moderno.
export default function TapeHeader() {
  return (
    <header className="poster xerox-grain fixed inset-x-0 top-0 z-50 -rotate-[0.3deg] border-b-2 border-x-0 border-t-0 px-5 py-3">
      <div className="flex items-center justify-between gap-4">
        <a href="#inicio" className="font-display text-2xl">
          Ferro
        </a>

        <nav className="hidden items-center gap-6 sm:flex" aria-label="Seções">
          <a href="#recordes" className="text-sm text-chumbo hover:text-ink">
            Recordes
          </a>
          <a href="#planos" className="text-sm text-chumbo hover:text-ink">
            Planos
          </a>
        </nav>

        <button
          type="button"
          onClick={() => sendToWhatsApp('Olá! Quero saber mais sobre a Ferro.')}
          className="btn-rust border-ink px-4 py-2 text-sm"
        >
          Falar agora
        </button>
      </div>
    </header>
  )
}
