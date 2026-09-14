import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Encosta from './components/Encosta'
import Processo from './components/Processo'

export default function App() {
  return (
    <>
      <main>
        <Encosta />
        <Processo />
        <Contato />
      </main>
      <DemoDialog />
    </>
  )
}
