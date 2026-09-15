import Agendar from './components/Agendar'
import DemoDialog from './components/DemoDialog'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Profissionais from './components/Profissionais'
import TicketBar from './components/TicketBar'

export default function App() {
  return (
    <>
      <TicketBar />
      <main>
        <Hero />
        <div className="piso-xadrez h-3" aria-hidden="true" />
        <Menu />
        <div className="piso-xadrez h-3" aria-hidden="true" />
        <Profissionais />
      </main>
      <Agendar />
      <DemoDialog />
    </>
  )
}
