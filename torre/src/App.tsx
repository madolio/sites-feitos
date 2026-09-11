import Footer from './components/Footer'
import Hero from './components/Hero'
import Log from './components/Log'
import Nav from './components/Nav'
import Planos from './components/Planos'
import Produto from './components/Produto'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Produto />
        <Planos />
        <Log />
      </main>
      <Footer />
    </>
  )
}
