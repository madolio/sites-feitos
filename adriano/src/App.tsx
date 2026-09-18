import Agua from './components/Agua'
import Contato from './components/Contato'
import Eletrica from './components/Eletrica'
import Hero from './components/Hero'
import Painel from './components/Painel'
import Sobre from './components/Sobre'

export default function App() {
  return (
    <>
      <a href="#inicio" className="pular">
        Pular para o conteúdo
      </a>

      <Painel />

      {/* O painel é uma coluna fixa a partir de lg — daí o recuo só nesse
          ponto de quebra; abaixo dele ele vira a barra fina do topo. */}
      <div className="lg:pl-56">
        <main>
          <Hero />
          <Agua />
          <Eletrica />
          <Sobre />
        </main>
        <Contato />
      </div>
    </>
  )
}
