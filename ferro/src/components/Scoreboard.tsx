import { sendToWhatsApp } from '../demo'

// Substitui a nav horizontal comum por uma barra no espírito de placar de
// treino: dígitos tabulares, contorno grosso, sem sombra nem gradiente — só
// marca e link direto pras duas seções que importam numa página única.
export default function Scoreboard() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 border-b-4 border-iron bg-steel-50 px-5 py-3">
      <a href="#inicio" className="font-display text-xl tracking-wide text-iron uppercase">
        Ferro<span className="text-signal">.</span>
      </a>

      <nav className="hidden items-center gap-6 sm:flex" aria-label="Seções">
        <a href="#planos" className="font-display text-sm tracking-wide text-iron/70 uppercase hover:text-iron">
          Planos
        </a>
        <a href="#contato" className="font-display text-sm tracking-wide text-iron/70 uppercase hover:text-iron">
          Horários
        </a>
      </nav>

      <button
        type="button"
        onClick={() => sendToWhatsApp('Olá! Quero saber mais sobre os planos da Ferro.')}
        className="btn-signal px-4 py-2 text-sm"
      >
        Falar agora
      </button>
    </header>
  )
}
