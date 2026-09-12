import ContactSheet from './components/ContactSheet'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import FilmBar from './components/FilmBar'
import Hero from './components/Hero'
import Nota from './components/Nota'

export default function App() {
  return (
    <>
      <FilmBar />
      <main>
        <Hero />
        <ContactSheet />
        <Nota />
        <Contato />
      </main>
      <DemoDialog />
    </>
  )
}
