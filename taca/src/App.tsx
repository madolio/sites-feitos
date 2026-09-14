import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Processo from './components/Processo'
import Prova from './components/Prova'

export default function App() {
  return (
    <>
      <main>
        <Prova />
        <Processo />
        <Contato />
      </main>
      <DemoDialog />
    </>
  )
}
