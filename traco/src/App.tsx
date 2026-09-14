import DemoDialog from './components/DemoDialog'
import Estudio from './components/Estudio'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Processo from './components/Processo'
import Projetos from './components/Projetos'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projetos />
        <Processo />
        <Estudio />
      </main>
      <Footer />
      <DemoDialog />
    </>
  )
}
