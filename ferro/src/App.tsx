import CtaFinal from './components/CtaFinal'
import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Modalidades from './components/Modalidades'
import Planos from './components/Planos'
import Recordes from './components/Recordes'

export default function App() {
  return (
    <>
      <Header />
      <main className="pt-14">
        <Hero />
        <Modalidades />
        <Recordes />
        <Planos />
        <Depoimentos />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <DemoDialog />
    </>
  )
}
