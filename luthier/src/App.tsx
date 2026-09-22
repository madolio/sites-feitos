import Hero from './components/Hero'
import Laboratorio from './components/Laboratorio'
import Encomendas from './components/Encomendas'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <Laboratorio />
      <Encomendas />
      <Depoimentos />
      <Faq />
      <Contato />
      <DemoDialog />
    </div>
  )
}
