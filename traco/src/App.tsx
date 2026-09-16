import Carimbo from './components/Carimbo'
import DemoDialog from './components/DemoDialog'
import Estudio from './components/Estudio'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Processo from './components/Processo'
import Projetos from './components/Projetos'

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <Projetos />
        <Processo />
        <Estudio />
      </main>
      <Footer />
      <Carimbo />
      <DemoDialog />
    </>
  )
}
