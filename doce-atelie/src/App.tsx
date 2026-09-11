import { useState } from 'react'
import DemoDialog from './components/DemoDialog'
import Docinhos from './components/Docinhos'
import Encomenda from './components/Encomenda'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Prazos from './components/Prazos'
import Sprinkles from './components/Sprinkles'
import { emptyOrder, type Order } from './order'

export default function App() {
  const [order, setOrder] = useState<Order>(emptyOrder)

  return (
    <>
      <Nav />
      <main>
        <Hero order={order} setOrder={setOrder} />
        <Encomenda order={order} setOrder={setOrder} />
        <Docinhos />
        <Prazos />
      </main>
      <Footer />
      <DemoDialog />
      <Sprinkles />
    </>
  )
}
