import Hero from '../components/Hero'
import GuiaPelagem from '../components/GuiaPelagem'
import Servicos from '../components/Servicos'
import Credenciais from '../components/Credenciais'
import Depoimentos from '../components/Depoimentos'
import Faq from '../components/Faq'
import Contato from '../components/Contato'

export default function Home() {
  return (
    <>
      <Hero />
      <GuiaPelagem />
      <Servicos />
      <Credenciais />
      <Depoimentos />
      <Faq />
      <Contato />
    </>
  )
}
