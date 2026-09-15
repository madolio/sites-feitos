import { sendToWhatsApp } from '../demo'

// Nav simples e fixa — a página é curta o bastante (Hero com configurador,
// catálogo, processo, contato) pra não precisar de esqueleto decorativo.
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
