import Board from './components/Board'
import Cardapio from './components/Cardapio'
import CtaFinal from './components/CtaFinal'
import DemoDialog from './components/DemoDialog'
import Footer from './components/Footer'
import FornadaDoDia from './components/FornadaDoDia'
import Hero from './components/Hero'

export default function App() {
  return (
    <>
      <Board />
      <main className="pt-14">
        <Hero />
        <FornadaDoDia />
        <Cardapio />
        <CtaFinal />
      </main>
      <Footer />
      <DemoDialog />
    </>
  )
}
