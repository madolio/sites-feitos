import Agendar from './components/Agendar'
import Cuidados from './components/Cuidados'
import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
import FolderTabs from './components/FolderTabs'
import Hero from './components/Hero'
import Servicos from './components/Servicos'

export default function App() {
  return (
    <>
      <FolderTabs />
      <main>
        <Hero />
        <Servicos />
        <Cuidados />
        <Depoimentos />
        <Faq />
      </main>
      <Agendar />
      <DemoDialog />
    </>
  )
}
