import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
import Processo from './components/Processo'
import RodaAromas from './components/RodaAromas'

export default function App() {
  return (
    <>
      <main>
        <RodaAromas />
        <Processo />
        <Depoimentos />
        <Faq />
        <Contato />
      </main>
      <DemoDialog />
    </>
  )
}
