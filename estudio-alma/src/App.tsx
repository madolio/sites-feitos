import { useEffect } from 'react'
import Aulas from './components/Aulas'
import DemoDialog from './components/DemoDialog'
import Experimental from './components/Experimental'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Horarios from './components/Horarios'
import Instrutora from './components/Instrutora'
import Respira from './components/Respira'
import Reveal from './components/Reveal'
import Trilho from './components/Trilho'

export default function App() {
  // Ao abrir a página já com um #hash na URL (recarregar, ou abrir um link
  // que já aponta pra uma seção), o navegador tenta pular pra lá antes da
  // seção existir no DOM (tudo renderizado pelo React) — o pulo nativo não
  // acontece e o scroll fica em 0. Corrigido rolando manualmente depois que
  // a página termina de montar (mesmo bug/fix do sabor-da-vila).
  useEffect(() => {
    if (!window.location.hash) return
    document.querySelector(window.location.hash)?.scrollIntoView()
  }, [])

  return (
    <>
      <Trilho />
      <div className="lg:pl-56">
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
      </div>
      <DemoDialog />
    </>
  )
}
