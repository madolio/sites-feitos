import ContactSheet from './components/ContactSheet'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
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
        <Depoimentos />
        <Faq />
        <Contato />
      </main>
      <DemoDialog />
    </>
  )
}
