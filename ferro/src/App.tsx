import CtaFinal from './components/CtaFinal'
import DemoDialog from './components/DemoDialog'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Modalidades from './components/Modalidades'
import Planos from './components/Planos'
import Recordes from './components/Recordes'
import TapeHeader from './components/TapeHeader'

export default function App() {
  return (
    <>
      <TapeHeader />
      <main className="pt-14">
        <Hero />
        <Modalidades />
        <Recordes />
        <Planos />
        <CtaFinal />
      </main>
      <Footer />
      <DemoDialog />
    </>
  )
}
