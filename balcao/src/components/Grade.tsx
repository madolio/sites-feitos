import { cardapio, type Categoria } from '../data/cardapio'
import ItemCard from './ItemCard'

export default function Grade({
  categoria,
  carrinho,
  onAdd,
  onRemove,
}: {
  categoria: Categoria
  carrinho: Record<string, number>
  onAdd: (id: string) => void
  onRemove: (id: string) => void
}) {
  const itens = cardapio.filter((i) => i.categoria === categoria)

  return (
    <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-5 py-6 sm:grid-cols-3 sm:gap-5 sm:px-8">
      {itens.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          qtd={carrinho[item.id] ?? 0}
          onAdd={() => onAdd(item.id)}
          onRemove={() => onRemove(item.id)}
        />
      ))}
    </ul>
  )
}
