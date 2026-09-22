import CtaFinal from './components/CtaFinal'
import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Escola from './components/Escola'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Marquise from './components/Marquise'
import MonteSuaVisita from './components/MonteSuaVisita'
import Noivas from './components/Noivas'
import Onde from './components/Onde'
import Servicos from './components/Servicos'
import { useRevelar } from './useRevelar'

export default function App() {
  useRevelar()

  return (
    <>
      <Marquise />
      <main className="pt-[4.5rem]">
        <Hero />
        <Servicos />
        <MonteSuaVisita />
        <Noivas />
        <Escola />
        <Onde />
        <Depoimentos />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <DemoDialog />
    </>
  )
}
