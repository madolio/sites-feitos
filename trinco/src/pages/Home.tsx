import Hero from '../components/Hero'
import Servicos from '../components/Servicos'
import Triagem from '../components/Triagem'
import FluxoAtendimento from '../components/FluxoAtendimento'
import Depoimentos from '../components/Depoimentos'
import Faq from '../components/Faq'
import Contato from '../components/Contato'

export default function Home() {
  return (
    <>
      <Hero />
      <Servicos />
      <Triagem />
      <FluxoAtendimento />
      <Depoimentos />
      <Faq />
      <Contato />
    </>
  )
}
