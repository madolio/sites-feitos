import CtaFinal from './components/CtaFinal'
import DemoDialog from './components/DemoDialog'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Modalidades from './components/Modalidades'
import Planos from './components/Planos'
import Scoreboard from './components/Scoreboard'

export default function App() {
  return (
    <>
      <Scoreboard />
      <main className="pt-14">
        <Hero />
        <Modalidades />
        <Planos />
        <CtaFinal />
      </main>
      <Footer />
      <DemoDialog />
    </>
  )
}
