import { useState } from 'react'

// Cabeçalho como cabeçalho de laudo clínico: sem blur (precisão, não
// suavidade de app de bem-estar), com uma referência de protocolo real em
// mono ao lado do nome, como o timbre de um documento.
//
// Abaixo de `sm` (telas de 320–375px), o nav completo + CTA não cabem ao
// lado do nome da clínica — em vez de cortar itens, colapsa num menu
// disparado por um botão "Menu", como qualquer header responsivo.
export default function Header() {
  const [aberto, setAberto] = useState(false)

  return (
    <header className="sticky top-0 z-20 border-b border-linha bg-papel">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-8">
        <a href="#topo" className="flex min-w-0 items-baseline gap-2.5">
          <span className="truncate font-display text-lg italic sm:text-xl">Cútis Dermatologia</span>
          <span className="dado-clinico hidden text-clinico/60 sm:inline">protocolo · doc. clínico</span>
        </a>

        <nav className="hidden items-center gap-5 text-sm sm:flex">
          <a href="#procedimentos" className="hover:text-clinico">
            Procedimentos
          </a>
          <a href="#metodo" className="hover:text-clinico">
            Método
          </a>
          <a href="#contato" className="btn-clinico rounded-sm px-4 py-2 text-sm">
            Agendar avaliação
          </a>
        </nav>

        <button
          type="button"
          className="btn-clinico shrink-0 rounded-sm px-3 py-2 text-sm sm:hidden"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? 'Fechar' : 'Menu'}
        </button>
      </div>

      {aberto && (
        <nav id="menu-mobile" className="flex flex-col gap-1 border-t border-linha px-4 pb-4 pt-3 sm:hidden">
          <a href="#procedimentos" className="py-2 hover:text-clinico" onClick={() => setAberto(false)}>
            Procedimentos
          </a>
          <a href="#metodo" className="py-2 hover:text-clinico" onClick={() => setAberto(false)}>
            Método
          </a>
          <a
            href="#contato"
            className="btn-clinico mt-1 justify-center rounded-sm px-4 py-2 text-sm"
            onClick={() => setAberto(false)}
          >
            Agendar avaliação
          </a>
        </nav>
      )}
    </header>
  )
}
