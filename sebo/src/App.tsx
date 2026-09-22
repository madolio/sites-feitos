import Catalogo from './components/Catalogo'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Orelha from './components/Orelha'
import Processo from './components/Processo'

export default function App() {
  return (
    <>
      <Orelha />
      <main className="lg:pr-14">
        <Hero />
        <Catalogo />
        <Processo />
        <Contato />
      </main>
      <Footer />
      <DemoDialog />
    </>
  )
}
