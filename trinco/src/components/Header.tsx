import { sendToWhatsApp } from '../demo'

export default function Header() {
  return (
    <div className="sticky top-0 z-20">
      {/* Faixa utilitária: emergência 24h sempre visível, mesmo com o resto do
          header rolando pra fora — placa de aviso, não decoração. */}
      <div className="bg-emergencia text-limalha">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-1.5 text-xs sm:px-8">
          <span className="dado-placa">
            Emergência 24h<span className="hidden md:inline"> · atendimento no mesmo dia, a qualquer hora</span>
          </span>
          <a href="tel:+5543991128845" className="dado-placa shrink-0 hover:underline">
            (43) 99112-8845
          </a>
        </div>
      </div>

      <header className="border-b border-linha bg-limalha/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
          <a href="#topo" className="font-display text-xl">
            Trinco
          </a>
          <nav className="flex items-center gap-5 text-sm">
            <a href="#servicos" className="hidden hover:text-latao sm:inline">
              Serviços
            </a>
            <a href="#triagem" className="hidden hover:text-latao sm:inline">
              Qual serviço eu preciso
            </a>
            <a href="#faq" className="hidden hover:text-latao sm:inline">
              Dúvidas
            </a>
            <button
              type="button"
              onClick={() => sendToWhatsApp('Olá! Preciso de um chaveiro/serralheiro com urgência.')}
              className="btn-outline px-4 py-2 text-sm"
            >
              Falar no WhatsApp
            </button>
          </nav>
        </div>
      </header>
    </div>
  )
}
