import Capa from './components/Capa'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
import Metodologia from './components/Metodologia'
import Niveis from './components/Niveis'

export default function App() {
  return (
    <>
      <main>
        <Capa />
        <Niveis />
        <Metodologia />
        <Depoimentos />
        <Faq />
      </main>
      <Contato />
      <DemoDialog />
    </>
  )
}
