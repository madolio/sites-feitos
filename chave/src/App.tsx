import Classificados from './components/Classificados'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
import Masthead from './components/Masthead'
import Reveal from './components/Reveal'

export default function App() {
  return (
    <>
      <Masthead />
      <main>
        <Reveal as="div">
          <Classificados />
        </Reveal>
        <Depoimentos />
        <Faq />
      </main>
      <Reveal as="div">
        <Contato />
      </Reveal>
      <DemoDialog />
    </>
  )
}
