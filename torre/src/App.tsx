import DemoDialog from './components/DemoDialog'
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
          <Log />
        </main>
        <Footer />
      </div>
      <DemoDialog />
    </>
  )
}
