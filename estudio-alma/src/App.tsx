import Aulas from './components/Aulas'
import DemoDialog from './components/DemoDialog'
import Experimental from './components/Experimental'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Horarios from './components/Horarios'
import Instrutora from './components/Instrutora'
import Nav from './components/Nav'
import Respira from './components/Respira'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Aulas />
        <Horarios />
        <Instrutora />
        <Respira />
        <Experimental />
      </main>
      <Footer />
      <DemoDialog />
    </>
  )
}
