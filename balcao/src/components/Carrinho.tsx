import { cardapio } from '../data/cardapio'
import { sendToWhatsApp } from '../demo'

const formatar = (v: number) => `R$ ${v.toFixed(2).replace('.', ',')}`

// Barra fixa embaixo — só existe quando o carrinho tem algo, e reserva o
// espaço equivalente no fim da página (App.tsx) pra não cobrir o último item.
export default function Carrinho({ carrinho }: { carrinho: Record<string, number> }) {
  const linhas = cardapio
    .map((item) => ({ item, qtd: carrinho[item.id] ?? 0 }))
    .filter((l) => l.qtd > 0)

  if (linhas.length === 0) return null

  const totalItens = linhas.reduce((s, l) => s + l.qtd, 0)
  const totalPreco = linhas.reduce((s, l) => s + l.qtd * l.item.preco, 0)

  const fazerPedido = () => {
    const texto = linhas.map((l) => `${l.qtd}x ${l.item.nome}`).join('\n')
    sendToWhatsApp(`Olá, Balcão! Quero pedir:\n${texto}\n\nTotal: ${formatar(totalPreco)}`)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink px-5 py-4 sm:px-8">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
        <span className="text-cream">
          <span className="font-semibold">{totalItens}</span> {totalItens === 1 ? 'item' : 'itens'} ·{' '}
          <span className="font-semibold">{formatar(totalPreco)}</span>
        </span>
        <button type="button" onClick={fazerPedido} className="btn-primary shrink-0">
          Fazer pedido
        </button>
      </div>
    </div>
  )
}
