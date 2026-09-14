import DemoDialog from './components/DemoDialog'
import Equipe from './components/Equipe'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Processo from './components/Processo'
import Servicos from './components/Servicos'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Servicos />
        <Processo />
        <Equipe />
      </main>
      <Footer />
      <DemoDialog />
    </>
  )
}
