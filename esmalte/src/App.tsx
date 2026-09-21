import Hero from './components/Hero'
import CuraTimer from './components/CuraTimer'
import Formatos from './components/Formatos'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
import Contato from './components/Contato'
import Footer from './components/Footer'
import DemoDialog from './components/DemoDialog'

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <CuraTimer />
      <Formatos />
      <Depoimentos />
      <Faq />
      <Contato />
      <Footer />
      <DemoDialog />
    </div>
  )
}
