import type { Item } from '../data/cardapio'
import Icone from './Icone'

const formatar = (v: number) => `R$ ${v.toFixed(2).replace('.', ',')}`

export default function ItemCard({
  item,
  qtd,
  onAdd,
  onRemove,
}: {
  item: Item
  qtd: number
  onAdd: () => void
  onRemove: () => void
}) {
  return (
    <li className="flex flex-col rounded-2xl border border-line bg-card p-5">
      <Icone tipo={item.glifo} className="h-10 w-10 text-leaf" />
      <h3 className="mt-3 text-lg font-semibold text-ink">{item.nome}</h3>
      <p className="mt-1 flex-1 text-sm text-ink/65">{item.descricao}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-semibold text-ink">{formatar(item.preco)}</span>

        {qtd === 0 ? (
          <button
            type="button"
            onClick={onAdd}
            aria-label={`Adicionar ${item.nome}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-leaf text-cream transition-colors hover:bg-ink"
          >
            +
          </button>
        ) : (
          <div className="flex items-center gap-3 rounded-full bg-cream px-1 py-1">
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remover ${item.nome}`}
              className="flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-line"
            >
              −
            </button>
            <span className="w-4 text-center text-sm font-semibold text-ink tabular-nums">{qtd}</span>
            <button
              type="button"
              onClick={onAdd}
              aria-label={`Adicionar mais ${item.nome}`}
              className="flex h-7 w-7 items-center justify-center rounded-full text-ink transition-colors hover:bg-line"
            >
              +
            </button>
          </div>
        )}
      </div>
    </li>
  )
}
