import { useEffect } from 'react'
import DemoDialog from './components/DemoDialog'
import Depoimentos from './components/Depoimentos'
import Equipe from './components/Equipe'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Fundeio from './components/Fundeio'
import Hero from './components/Hero'
import Processo from './components/Processo'
import Servicos from './components/Servicos'

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
      <Fundeio />
      <div className="flex min-h-screen flex-col lg:pl-56">
        <main className="flex-1">
          <Hero />
          <Servicos />
          <Processo />
          <Equipe />
          <Depoimentos />
          <Faq />
        </main>
        <Footer />
      </div>
      <DemoDialog />
    </>
  )
}
