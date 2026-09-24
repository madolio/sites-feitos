import { rotulos } from './data/conteudo'
import Contato from './components/Contato'
import Cta from './components/Cta'
import Equipe from './components/Equipe'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Galeria from './components/Galeria'
import Header from './components/Header'
import Hero from './components/Hero'
import Metodo from './components/Metodo'
import Relatos from './components/Relatos'
import Servicos from './components/Servicos'
import Sobre from './components/Sobre'

export default function App() {
  return (
    <>
      <a
        href="#sobre"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-bone"
      >
        {rotulos.irParaConteudo}
      </a>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <Metodo />
        <Equipe />
        <Relatos />
        <Galeria />
        <Faq />
        <Cta />
        <Contato />
      </main>
      <Footer />
    </>
  )
}
