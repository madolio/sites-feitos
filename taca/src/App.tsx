import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Processo from './components/Processo'
import RodaAromas from './components/RodaAromas'

export default function App() {
  return (
    <>
      <main>
        <RodaAromas />
        <Processo />
        <Contato />
      </main>
      <DemoDialog />
    </>
  )
}
