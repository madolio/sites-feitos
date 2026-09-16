import Aulas from './components/Aulas'
import DemoDialog from './components/DemoDialog'
import Experimental from './components/Experimental'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Horarios from './components/Horarios'
import Instrutora from './components/Instrutora'
import Nav from './components/Nav'
import Respira from './components/Respira'
import Reveal from './components/Reveal'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reveal as="div">
          <Aulas />
        </Reveal>
        <Reveal as="div">
          <Horarios />
        </Reveal>
        <Reveal as="div">
          <Instrutora />
        </Reveal>
        <Respira />
        <Reveal as="div">
          <Experimental />
        </Reveal>
      </main>
      <Reveal as="div">
        <Footer />
      </Reveal>
      <DemoDialog />
    </>
  )
}
