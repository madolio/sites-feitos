import CtaFinal from './components/CtaFinal'
import DemoDialog from './components/DemoDialog'
import Escola from './components/Escola'
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
        <MonteSuaVisita />
        <Servicos />
        <Noivas />
        <Escola />
        <Onde />
        <CtaFinal />
      </main>
      <Footer />
      <DemoDialog />
    </>
  )
}
