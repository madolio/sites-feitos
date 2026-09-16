import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Pacotes from './components/Pacotes'
import Reveal from './components/Reveal'
import Ribbon from './components/Ribbon'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reveal as="div">
          <Pacotes />
        </Reveal>
        <Reveal as="div">
          <Ribbon />
        </Reveal>
      </main>
      <Reveal as="div">
        <Contato />
      </Reveal>
      <DemoDialog />
    </>
  )
}
