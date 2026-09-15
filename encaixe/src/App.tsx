import Catalogo from './components/Catalogo'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Hero from './components/Hero'
import Processo from './components/Processo'
import TopoSimples from './components/TopoSimples'

export default function App() {
  return (
    <>
      <TopoSimples />
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
