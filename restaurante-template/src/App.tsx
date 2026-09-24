import { rotulos } from './data/conteudo'
import Ambiente from './components/Ambiente'
import Apresentacao from './components/Apresentacao'
import Cardapio from './components/Cardapio'
import Contato from './components/Contato'
import Depoimentos from './components/Depoimentos'
import Destaques from './components/Destaques'
import Diferenciais from './components/Diferenciais'
import Equipe from './components/Equipe'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Historia from './components/Historia'
import Reserva from './components/Reserva'

// Ordem das seções. Para remover uma, tire-a daqui e o item correspondente de `nav` em site.ts.
export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-accent-foreground"
      >
        {rotulos.irParaConteudo}
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Apresentacao />
        <Destaques />
        <Cardapio />
        <Historia />
        <Equipe />
        <Diferenciais />
        <Ambiente />
        <Depoimentos />
        <Reserva />
        <Faq />
        <Contato />
      </main>
      <Footer />
    </>
  )
}
