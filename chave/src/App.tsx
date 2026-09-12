import Classificados from './components/Classificados'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Masthead from './components/Masthead'

export default function App() {
  return (
    <>
      <Masthead />
      <main>
        <Classificados />
      </main>
      <Contato />
      <DemoDialog />
    </>
  )
}
