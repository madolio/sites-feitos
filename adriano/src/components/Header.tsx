import { linkWhatsApp } from '../contato'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-linha bg-papel/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3.5">
        <a href="#inicio" className="font-heading text-lg font-semibold text-grafite">
          Adriano Souza Passos
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-fumo sm:flex" aria-label="Seções">
          <a href="#servicos" className="hover:text-grafite">
            Serviços
          </a>
          <a href="#sobre" className="hover:text-grafite">
            Sobre
          </a>
        </nav>

        <a
          href={linkWhatsApp('Olá! Vi seu site e gostaria de saber mais sobre os serviços.')}
          target="_blank"
          rel="noreferrer"
          className="btn-agua px-5 py-2.5 text-sm"
        >
          WhatsApp
        </a>
      </div>
    </header>
  )
}
