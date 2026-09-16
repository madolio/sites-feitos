import DemoDialog from './components/DemoDialog'
import Equipe from './components/Equipe'
import Footer from './components/Footer'
import Fundeio from './components/Fundeio'
import Hero from './components/Hero'
import Processo from './components/Processo'
import Servicos from './components/Servicos'

export default function App() {
  return (
    <>
      <Fundeio />
      <div className="flex min-h-screen flex-col lg:pl-56">
        <main className="flex-1">
          <Hero />
          <Servicos />
          <Processo />
          <Equipe />
        </main>
        <Footer />
      </div>
      <DemoDialog />
    </>
  )
}
