import type { Caso } from '../data/casos'

export default function Seletor({
  casos,
  ativo,
  onSelect,
}: {
  casos: Caso[]
  ativo: number
  onSelect: (i: number) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {casos.map((caso, i) => (
        <button
          key={caso.id}
          type="button"
          onClick={() => onSelect(i)}
          aria-current={ativo === i}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
            ativo === i
              ? 'border-pine bg-pine text-paper'
              : 'border-line text-ink/70 hover:border-ink/30'
          }`}
        >
          {caso.titulo}
        </button>
      ))}
    </div>
  )
}
