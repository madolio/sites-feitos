import { sendToWhatsApp } from '../demo'

// Substitui a nav horizontal comum por uma tira colada com fita crepe no
// topo, como se fosse o cabeçalho de um cartaz de show pregado na parede
// da academia — leve inclinação, sem sombra de app moderno.
export default function TapeHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex -rotate-[0.4deg] items-center justify-between gap-4 border-b-2 border-ink bg-paper px-5 py-3">
      <a href="#inicio" className="font-display text-2xl text-ink">
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
        className="btn-rust px-4 py-2 text-sm"
      >
        Falar agora
      </button>
    </header>
  )
}
