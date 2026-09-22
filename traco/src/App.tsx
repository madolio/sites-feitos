import { useEffect } from 'react'
import Carimbo from './components/Carimbo'
import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Estudio from './components/Estudio'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Processo from './components/Processo'
import Projetos from './components/Projetos'

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
      <main>
        <Hero />
        <Projetos />
        <Processo />
        <Estudio />
        <Depoimentos />
        <Faq />
      </main>
      <Footer />
      <Carimbo />
      <DemoDialog />
    </>
  )
}
