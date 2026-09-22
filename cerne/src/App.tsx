import Chrome from './components/Chrome'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Explorador from './components/Explorador'
import Faq from './components/Faq'
import Materiais from './components/Materiais'
import Processo from './components/Processo'

export default function App() {
  return (
    <>
      <Chrome />
      <Explorador />
      <Materiais />
      <Processo />
      <Depoimentos />
      <Faq />
      <Contato />
      <DemoDialog />
    </>
  )
}
