import { categorias, type Categoria } from '../data/cardapio'

// Sem hero: o topo é só a marca + as abas de categoria, sticky — a página
// abre direto no cardápio, como um totem de autoatendimento. "Aberto agora"
// no lugar de qualquer texto de boas-vindas.
export default function Topo({ ativa, onSelect }: { ativa: Categoria; onSelect: (c: Categoria) => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-5 pt-5 pb-3 sm:px-8">
        <span className="font-display text-2xl text-ink">Balcão</span>
        <span className="flex items-center gap-1.5 text-sm font-medium text-leaf">
          <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden="true" />
          Aberto agora
        </span>
      </div>

      <nav
        className="mx-auto flex max-w-4xl gap-2 overflow-x-auto px-5 pb-4 sm:px-8"
        style={{ maskImage: 'linear-gradient(to right, black calc(100% - 28px), transparent)' }}
      >
        {categorias.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            aria-current={ativa === c.id}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              ativa === c.id
                ? 'border-leaf bg-leaf text-cream'
                : 'border-line text-ink/70 hover:border-ink/30'
            }`}
          >
            {c.label}
          </button>
        ))}
        <div className="w-4 shrink-0" aria-hidden="true" />
      </nav>
    </header>
  )
}
