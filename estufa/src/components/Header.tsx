// Textura de vidraça (mullions) no próprio cabeçalho, ecoando o padrão do
// teto de estufa do Hero — não é decoração solta, é o mesmo vocabulário
// visual repetido, não uma barra genérica de blur.
export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-linha bg-vidro bg-[repeating-linear-gradient(90deg,rgba(16,36,28,0.05)_0,rgba(16,36,28,0.05)_1px,transparent_1px,transparent_80px)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#topo" className="binomial">
          Estufa Cheia
        </a>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#especies" className="hover:text-musgo">
            Catálogo
          </a>
          <a href="#processo" className="hidden hover:text-musgo sm:inline">
            Como funciona
          </a>
          <a href="#encomenda" className="btn-musgo px-4 py-2 text-sm">
            Encomendar
          </a>
        </nav>
      </div>
    </header>
  )
}
