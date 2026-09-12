import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Pacotes from './components/Pacotes'
import Ribbon from './components/Ribbon'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Pacotes />
        <Ribbon />
      </main>
      <Contato />
      <DemoDialog />
    </>
  )
}
