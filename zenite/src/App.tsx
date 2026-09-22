import Hero from './components/Hero'
import Foco from './components/Foco'
import Sessoes from './components/Sessoes'
import Processo from './components/Processo'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <Foco />
      <Sessoes />
      <Processo />
      <Depoimentos />
      <Faq />
      <Contato />
      <DemoDialog />
    </div>
  )
}
