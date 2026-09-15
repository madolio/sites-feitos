import { sendToWhatsApp } from '../demo'

// A régua de carpinteiro (nav lateral, fixa na borda esquerda) saiu — a
// navegação real agora é escolher o encaixe no Hero. Esta barra fica só
// com a marca e o contato, como nos conceitos mais recentes do
// repositório que já não precisam de uma nav decorativa própria.
export default function TopoSimples() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-4 sm:px-10">
      <a href="#" className="font-heading text-lg font-medium text-ink">
        Encaixe
      </a>
      <button
        type="button"
        onClick={() => sendToWhatsApp('Olá! Quero conversar sobre uma peça sob medida com a Encaixe.')}
        className="text-sm font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:text-accent hover:decoration-accent"
      >
        Falar no WhatsApp
      </button>
    </header>
  )
}
