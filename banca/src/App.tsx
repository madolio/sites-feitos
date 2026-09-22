import Bancada from './components/Bancada'
import Hero from './components/Hero'
import Vitrine from './components/Vitrine'
import Processo from './components/Processo'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'

export default function App() {
  return (
    <>
      <Bancada />
      <main>
        <Hero />
        <Vitrine />
        <Processo />
        <Contato />
      </main>
      <DemoDialog />
    </>
  )
}
