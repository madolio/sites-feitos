import { useEffect, useState } from 'react'
import Cardapio from './components/Cardapio'
import Comanda from './components/Comanda'
import DemoDialog from './components/DemoDialog'
import Footer from './components/Footer'
import Grain from './components/Grain'
import Hero from './components/Hero'
import Onde from './components/Onde'
import Varal from './components/Varal'

export default function App() {
  const [qty, setQty] = useState<Record<string, number>>({})

  const change = (id: string, delta: number) =>
    setQty((q) => {
      const next = Math.max(0, (q[id] ?? 0) + delta)
      if (next === 0) {
        const { [id]: _omit, ...rest } = q
        return rest
      }
      return { ...q, [id]: next }
    })

  const clear = () => setQty({})

  // Ao abrir a página já com um #hash na URL (recarregar, ou abrir um link
  // que já aponta pra #cardapio), o navegador tenta pular pra lá antes da
  // seção existir no DOM (é tudo renderizado pelo React) — o pulo nativo
  // não acontece, o scroll fica em 0 e o Varal nunca marca nenhum tíquete
  // como ativo (reportado pelo usuário com print). Corrigido rolando pra lá
  // manualmente depois que a página termina de montar.
  useEffect(() => {
    if (!window.location.hash) return
    const el = document.querySelector(window.location.hash)
    el?.scrollIntoView()
  }, [])

  return (
    <>
      <Grain />
      <Varal />
      <main>
        <Hero />
        <Cardapio qty={qty} change={change} />
        <Onde />
      </main>
      <Footer />
      <Comanda qty={qty} change={change} clear={clear} />
      <DemoDialog />
    </>
  )
}
