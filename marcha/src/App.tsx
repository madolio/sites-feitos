import { TopoSimples } from './components/TopoSimples'
import { Hero } from './components/Hero'
import { Estoque } from './components/Estoque'
import { Financiamento } from './components/Financiamento'
import { Processo } from './components/Processo'
import { Contato } from './components/Contato'
import DemoDialog from './components/DemoDialog'

export default function App() {
  return (
    <>
      <TopoSimples />
      <Hero />
      <Estoque />
      <Financiamento />
      <Processo />
      <Contato />
      <DemoDialog />
    </>
  )
}
