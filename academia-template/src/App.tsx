import { rotulos } from './data/conteudo'
import Apresentacao from './components/Apresentacao'
import Contato from './components/Contato'
import CtaFinal from './components/CtaFinal'
import Depoimentos from './components/Depoimentos'
import Equipe from './components/Equipe'
import Estrutura from './components/Estrutura'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Modalidades from './components/Modalidades'
import Planos from './components/Planos'
import Resultados from './components/Resultados'

// Ordem das seções. Para remover uma, tire-a daqui e o item correspondente de `nav` em site.ts.
export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-accent focus:px-5 focus:py-3 focus:text-accent-foreground"
      >
        {rotulos.irParaConteudo}
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Apresentacao />
        <Modalidades />
        <Planos />
        <Estrutura />
        <Resultados />
        <Equipe />
        <Depoimentos />
        <Faq />
        <CtaFinal />
        <Contato />
      </main>
      <Footer />
    </>
  )
}
