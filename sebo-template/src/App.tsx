import { rotulos } from './data/conteudo'
import Catalogo from './components/Catalogo'
import Contato from './components/Contato'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Orelha from './components/Orelha'
import Processo from './components/Processo'

// Ordem das seções. Para remover uma, tire-a daqui e a orelha correspondente de `nav` em site.ts.
export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-accent focus:px-5 focus:py-3 focus:text-accent-foreground"
      >
        {rotulos.irParaConteudo}
      </a>
      <Orelha />
      <main id="conteudo" className="lg:pr-14">
        <Hero />
        <Catalogo />
        <Processo />
        <Faq />
        <Contato />
      </main>
      <Footer />
    </>
  )
}
