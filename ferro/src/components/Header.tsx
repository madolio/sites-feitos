import { sendToWhatsApp } from '../demo'

// Barra de navegação limpa e convencional — de propósito. O painel de
// senha/talão/régua/etc. de outros conceitos do repositório são
// "esqueletos" que substituem a nav; aqui a ideia é a oposta: depois da
// vibe old school/rock rejeitada, o objetivo é parecer clínico e sem
// enfeite, então até a nav volta a ser simples.
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-preto bg-branco">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3.5">
        <a href="#inicio" className="font-display text-xl font-bold">
          Ferro
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex" aria-label="Seções">
          <a href="#calculadora" className="hover:text-lima-escuro">
            Calculadora
          </a>
          <a href="#modalidades" className="hover:text-lima-escuro">
            Modalidades
          </a>
          <a href="#planos" className="hover:text-lima-escuro">
            Planos
          </a>
        </nav>

        <button
          type="button"
          onClick={() => sendToWhatsApp('Olá! Quero saber mais sobre a Ferro.')}
          className="btn-lima px-5 py-2.5 text-sm"
        >
          Falar agora
        </button>
      </div>
    </header>
  )
}
