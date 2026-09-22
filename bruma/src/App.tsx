import Hero from './components/Hero'
import Vitrine from './components/Vitrine'
import Catalogo from './components/Catalogo'
import Processo from './components/Processo'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <Vitrine />
      <Catalogo />
      <Processo />
      <Depoimentos />
      <Faq />
      <Contato />
      <DemoDialog />
    </div>
  )
}
