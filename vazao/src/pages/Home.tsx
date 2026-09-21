import Hero from '../components/Hero'
import VazaoDiagnostico from '../components/VazaoDiagnostico'
import Servicos from '../components/Servicos'
import Faq from '../components/Faq'
import Depoimentos from '../components/Depoimentos'
import Contato from '../components/Contato'

export default function Home() {
  return (
    <>
      <Hero />
      <VazaoDiagnostico />
      <Servicos />
      <Faq />
      <Depoimentos />
      <Contato />
    </>
  )
}
