// Cabeçalho como cabeçalho de laudo clínico: sem blur (precisão, não
// suavidade de app de bem-estar), com uma referência de protocolo real em
// mono ao lado do nome, como o timbre de um documento.
export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-linha bg-papel">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#topo" className="flex items-baseline gap-2.5">
          <span className="font-display text-xl italic">Cútis Dermatologia</span>
          <span className="dado-clinico hidden text-clinico/60 sm:inline">protocolo · doc. clínico</span>
        </a>
        <nav className="flex items-center gap-5 text-sm">
          <a href="#procedimentos" className="hover:text-clinico">
            Procedimentos
          </a>
          <a href="#metodo" className="hidden hover:text-clinico sm:inline">
            Método
          </a>
          <a href="#contato" className="btn-clinico rounded-sm px-4 py-2 text-sm">
            Agendar avaliação
          </a>
        </nav>
      </div>
    </header>
  )
}
