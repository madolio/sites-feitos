// Masthead de catálogo, não barra de app: fica no topo da página (não
// sticky), sem fundo desfocado, com o CTA como link sublinhado — não um
// botão colorido competindo com a vitrine.
export default function Header() {
  return (
    <header className="border-b border-carvao/15 bg-cru">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <a href="#topo" className="font-display text-lg tracking-[0.16em] uppercase">
          Trama
        </a>
        <nav className="flex items-center gap-6 text-xs tracking-[0.08em] text-carvao/70 uppercase">
          <a href="#etiqueta" className="hover:text-carvao">
            Como cuidar
          </a>
          <a href="#vitrine" className="hidden hover:text-carvao sm:inline">
            Catálogo
          </a>
          <a
            href="#contato"
            className="text-carvao underline decoration-ferrugem decoration-2 underline-offset-4 hover:text-ferrugem"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
