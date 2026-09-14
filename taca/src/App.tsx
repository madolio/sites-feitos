import Catalogo from './components/Catalogo'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Hero from './components/Hero'
import Processo from './components/Processo'

export default function App() {
  return (
    <>
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
