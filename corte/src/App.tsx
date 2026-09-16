import Agendar from './components/Agendar'
import DemoDialog from './components/DemoDialog'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Profissionais from './components/Profissionais'
import Reveal from './components/Reveal'
import TicketBar from './components/TicketBar'

export default function App() {
  return (
    <>
      <TicketBar />
      <main>
        <Hero />
        <div className="piso-xadrez h-3" aria-hidden="true" />
        <Reveal as="div">
          <Menu />
        </Reveal>
        <div className="piso-xadrez h-3" aria-hidden="true" />
        <Reveal as="div">
          <Profissionais />
        </Reveal>
      </main>
      <Reveal as="div">
        <Agendar />
      </Reveal>
      <DemoDialog />
    </>
  )
}
