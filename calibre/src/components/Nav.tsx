import { sendToWhatsApp } from '../demo'
import RelogioNav from './RelogioNav'

// A versão compacta do mostrador (RelogioNav.tsx) fica aqui, fixa — é a
// navegação que continua visível depois que o mostrador grande do Hero sai
// de tela ao rolar. Mesmo relógio, mesma hora certa, só em miniatura.
export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-4 sm:px-10">
      <span className="font-heading text-xl font-medium tracking-wide text-cream">Calibre</span>
      <div className="flex items-center gap-5">
        <RelogioNav compacto />
        <button
          type="button"
          onClick={() => sendToWhatsApp('Olá! Quero conversar sobre um relógio sob encomenda com a Calibre.')}
          className="hidden text-sm font-medium text-cream/75 transition-colors hover:text-brass sm:inline"
        >
          Falar no WhatsApp
        </button>
      </div>
    </header>
  )
}
