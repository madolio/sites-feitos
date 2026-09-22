import { TopoSimples } from './components/TopoSimples'
import { Hero } from './components/Hero'
import { Calculadora } from './components/Calculadora'
import { Catalogo } from './components/Catalogo'
import { Processo } from './components/Processo'
import { Faq } from './components/Faq'
import { Depoimentos } from './components/Depoimentos'
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
      <Depoimentos />
      <Faq />
      <Contato />
      <DemoDialog />
    </>
  )
}
