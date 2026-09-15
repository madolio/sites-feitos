import { sendToWhatsApp } from '../demo'

// Substitui a nav horizontal comum por uma faixa fixa no topo no espírito
// de quadro-negro de padaria (letra de giz, contorno grosso).
export default function Board() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 border-b-2 border-crosta bg-crosta px-5 py-3 text-farinha">
      <a href="#inicio" className="font-display text-xl">
        Fornada
      </a>

      <nav className="hidden items-center gap-6 sm:flex" aria-label="Seções">
        <a href="#fornada-do-dia" className="text-sm text-farinha/70 hover:text-farinha">
          Fornada do dia
        </a>
        <a href="#cardapio" className="text-sm text-farinha/70 hover:text-farinha">
          Cardápio
        </a>
      </nav>

      <button
        type="button"
        onClick={() => sendToWhatsApp('Olá! Quero saber o que tem fresquinho hoje na Fornada.')}
        className="btn-forno px-4 py-2 text-sm"
      >
        Falar agora
      </button>
    </header>
  )
}
