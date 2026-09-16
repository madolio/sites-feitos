import { TopoSimples } from './components/TopoSimples'
import { Hero } from './components/Hero'
import { Calculadora } from './components/Calculadora'
import { Catalogo } from './components/Catalogo'
import { Processo } from './components/Processo'
import { Contato } from './components/Contato'
import DemoDialog from './components/DemoDialog'

export default function App() {
  return (
    <>
      <TopoSimples />
      <Hero />
      <Calculadora />
      <Catalogo />
      <Processo />
      <Contato />
      <DemoDialog />
    </>
  )
}
