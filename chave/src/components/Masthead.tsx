// O cabeçalho não é fixo — como a manchete de um jornal, ele rola junto com
// a página. Sem menu, sem CTA persistente: a página é pra ler, não navegar.
export default function Masthead() {
  const hoje = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <header className="border-b-4 border-double border-ink pt-8 pb-4">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-baseline justify-between border-b border-ink pb-2 text-xs tracking-wide text-ink/70 uppercase">
          <span>Edição de {hoje}</span>
          <span>Classificados de imóveis</span>
        </div>
        <h1 className="mt-4 text-center text-6xl tracking-tight sm:text-7xl">Chave</h1>
        <p className="mt-2 text-center text-sm tracking-[0.2em] text-ink/65 uppercase">
          Compra, venda e locação em São Paulo e região
        </p>
      </div>
    </header>
  )
}
