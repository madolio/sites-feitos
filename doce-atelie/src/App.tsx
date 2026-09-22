import { useEffect, useState } from 'react'
import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Docinhos from './components/Docinhos'
import Encomenda from './components/Encomenda'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Cartela from './components/Cartela'
import Prazos from './components/Prazos'
import Reveal from './components/Reveal'
import Sprinkles from './components/Sprinkles'
import { emptyOrder, type Order } from './order'

export default function App() {
  const [order, setOrder] = useState<Order>(emptyOrder)

  // Ao abrir a página já com um #hash na URL (recarregar, ou abrir um link
  // que já aponta pra uma seção), o navegador tenta pular pra lá antes da
  // seção existir no DOM (tudo renderizado pelo React) — o pulo nativo não
  // acontece e o scroll fica em 0. Corrigido rolando manualmente depois que
  // a página termina de montar (mesmo bug/fix do sabor-da-vila).
  useEffect(() => {
    if (!window.location.hash) return
    document.querySelector(window.location.hash)?.scrollIntoView()
  }, [])

  return (
    <>
      <Cartela />
      <main>
        <Hero order={order} setOrder={setOrder} />
        <Encomenda order={order} setOrder={setOrder} />
        <Docinhos />
        <Prazos />
        <Depoimentos />
        <Faq />
      </main>
      <Reveal as="div">
        <Footer />
      </Reveal>
      <DemoDialog />
      <Sprinkles />
    </>
  )
}
