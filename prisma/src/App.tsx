import { useState } from 'react'
import Hero from './components/Hero'
import Catalogo from './components/Catalogo'
import Processo from './components/Processo'
import Contato from './components/Contato'
import DemoDialog from './components/DemoDialog'
import { gemas } from './data/gemas'

export default function App() {
  const [gema, setGema] = useState(gemas[0])

  return (
    <div className="min-h-screen w-full">
      <Hero gema={gema} />
      <Catalogo gema={gema} onEscolher={setGema} />
      <Processo />
      <Contato />
      <DemoDialog />
    </div>
  )
}
