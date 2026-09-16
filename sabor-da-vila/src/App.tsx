import { useState } from 'react'
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
