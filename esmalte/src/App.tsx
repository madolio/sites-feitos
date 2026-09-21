import Hero from './components/Hero'
import CuraTimer from './components/CuraTimer'
import Formatos from './components/Formatos'
import Contato from './components/Contato'
import Footer from './components/Footer'
import DemoDialog from './components/DemoDialog'

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <CuraTimer />
      <Formatos />
      <Contato />
      <Footer />
      <DemoDialog />
    </div>
  )
}
