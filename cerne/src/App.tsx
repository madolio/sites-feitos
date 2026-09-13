import Chrome from './components/Chrome'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Obra from './components/Obra'

export default function App() {
  return (
    <>
      <Chrome />
      <main>
        <Obra />
      </main>
      <Contato />
      <DemoDialog />
    </>
  )
}
