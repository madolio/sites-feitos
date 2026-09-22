import Catalogo from './components/Catalogo'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Faq from './components/Faq'
import Hero from './components/Hero'
import Processo from './components/Processo'
import Reveal from './components/Reveal'
import TopoSimples from './components/TopoSimples'

export default function App() {
  return (
    <>
      <TopoSimples />
      <main>
        <Hero />
        <Reveal as="div">
          <Catalogo />
        </Reveal>
        <Reveal as="div">
          <Processo />
        </Reveal>
        <Reveal as="div">
          <Depoimentos />
        </Reveal>
        <Reveal as="div">
          <Faq />
        </Reveal>
        <Reveal as="div">
          <Contato />
        </Reveal>
      </main>
      <DemoDialog />
    </>
  )
}
