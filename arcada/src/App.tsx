import Hero from './components/Hero'
import ArcadaMapa from './components/ArcadaMapa'
import Procedimentos from './components/Procedimentos'
import Processo from './components/Processo'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <ArcadaMapa />
      <Procedimentos />
      <Processo />
      <Contato />
      <DemoDialog />
    </div>
  )
}
