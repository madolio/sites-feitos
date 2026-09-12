import Agendar from './components/Agendar'
import Cuidados from './components/Cuidados'
import DemoDialog from './components/DemoDialog'
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
      </main>
      <Agendar />
      <DemoDialog />
    </>
  )
}
