import Board from './components/Board'
import Cardapio from './components/Cardapio'
import CtaFinal from './components/CtaFinal'
import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
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
        <Depoimentos />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <DemoDialog />
    </>
  )
}
