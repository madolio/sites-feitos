import { sendToWhatsApp } from '../demo'

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-linha bg-limalha/90 backdrop-blur">
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
            className="btn-emergencia px-4 py-2 text-sm"
          >
            Emergência 24h
          </button>
        </nav>
      </div>
    </header>
  )
}
