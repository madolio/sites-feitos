import Hero from './components/Hero'
import Processo from './components/Processo'
import Catalogo from './components/Catalogo'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <Processo />
      <Catalogo />
      <Depoimentos />
      <Faq />
      <Contato />
      <DemoDialog />
    </div>
  )
}
