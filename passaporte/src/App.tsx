import Capa from './components/Capa'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Metodologia from './components/Metodologia'
import Niveis from './components/Niveis'

export default function App() {
  return (
    <>
      <main>
        <Capa />
        <Niveis />
        <Metodologia />
      </main>
      <Contato />
      <DemoDialog />
    </>
  )
}
