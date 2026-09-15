import { useState } from 'react'
import Catalogo from './components/Catalogo'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import Hero from './components/Hero'
import Processo from './components/Processo'
import TopoSimples from './components/TopoSimples'

// A régua de carpinteiro (nav lateral) saiu: a navegação real agora é
// escolher o tipo de encaixe no Hero, que também filtra o catálogo — dois
// componentes precisam do mesmo estado, por isso ele mora aqui.
export default function App() {
  const [selecionado, setSelecionado] = useState('rabo-de-andorinha')

  return (
    <>
      <TopoSimples />
      <main>
        <Hero selecionado={selecionado} onSelecionar={setSelecionado} />
        <Catalogo selecionado={selecionado} />
        <Processo />
        <Contato />
      </main>
      <DemoDialog />
    </>
  )
}
