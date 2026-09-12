import Agendar from './components/Agendar'
import DemoDialog from './components/DemoDialog'
import Hero from './components/Hero'
import Programas from './components/Programas'
import Rail from './components/Rail'
import Resultados from './components/Resultados'

export default function App() {
  return (
    <>
      <Rail />
      <main>
        <Hero />
        <Programas />
        <Resultados />
      </main>
      <Agendar />
      <DemoDialog />
    </>
  )
}
