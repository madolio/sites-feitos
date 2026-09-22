import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Log from './components/Log'
import Planos from './components/Planos'
import Sidebar from './components/Sidebar'
import SystemCheck from './components/SystemCheck'

export default function App() {
  return (
    <>
      <Sidebar />
      <div className="lg:pl-56">
        <main>
          <Hero />
          <SystemCheck />
          <Planos />
          <Depoimentos />
          <Faq />
          <Log />
        </main>
        <Footer />
      </div>
      <DemoDialog />
    </>
  )
}
