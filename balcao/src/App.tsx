import { useState } from 'react'
import type { Categoria } from './data/cardapio'
import Carrinho from './components/Carrinho'
import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
import Grade from './components/Grade'
import Rodape from './components/Rodape'
import Topo from './components/Topo'

export default function App() {
  const [categoria, setCategoria] = useState<Categoria>('lanches')
  const [carrinho, setCarrinho] = useState<Record<string, number>>({})

  const add = (id: string) => setCarrinho((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }))
  const remove = (id: string) =>
    setCarrinho((c) => {
      const next = { ...c }
      if ((next[id] ?? 0) <= 1) delete next[id]
      else next[id] -= 1
      return next
    })

  const temItens = Object.keys(carrinho).length > 0

  return (
    <>
      <Topo ativa={categoria} onSelect={setCategoria} />
      <main className={temItens ? 'pb-24' : ''}>
        <Grade categoria={categoria} carrinho={carrinho} onAdd={add} onRemove={remove} />
        <Depoimentos />
        <Faq />
        <Rodape />
      </main>
      <Carrinho carrinho={carrinho} />
      <DemoDialog />
    </>
  )
}
