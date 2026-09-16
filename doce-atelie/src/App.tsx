import { useState } from 'react'
import DemoDialog from './components/DemoDialog'
import Docinhos from './components/Docinhos'
import Encomenda from './components/Encomenda'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Cartela from './components/Cartela'
import Prazos from './components/Prazos'
import Reveal from './components/Reveal'
import Sprinkles from './components/Sprinkles'
import { emptyOrder, type Order } from './order'

export default function App() {
  const [order, setOrder] = useState<Order>(emptyOrder)

  return (
    <>
      <Cartela />
      <main>
        <Hero order={order} setOrder={setOrder} />
        <Encomenda order={order} setOrder={setOrder} />
        <Reveal as="div">
          <Docinhos />
        </Reveal>
        <Reveal as="div">
          <Prazos />
        </Reveal>
      </main>
      <Reveal as="div">
        <Footer />
      </Reveal>
      <DemoDialog />
      <Sprinkles />
    </>
  )
}
