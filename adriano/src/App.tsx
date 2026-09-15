import CtaFinal from './components/CtaFinal'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Servicos from './components/Servicos'
import Sobre from './components/Sobre'
import { useRevelar } from './useRevelar'

export default function App() {
  useRevelar()

  return (
    <>
      <Header />
      <main className="pt-[3.6rem]">
        <Hero />
        <Servicos />
        <Sobre />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}
