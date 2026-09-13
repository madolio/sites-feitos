import Catalogo from './components/Catalogo'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Hero from './components/Hero'
import Processo from './components/Processo'
import Regua from './components/Regua'

export default function App() {
  return (
    <>
      <Regua />
      <main>
        <Hero />
        <Catalogo />
        <Processo />
        <Contato />
      </main>
      <DemoDialog />
    </>
  )
}
