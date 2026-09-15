import Benefits from '../components/Benefits'
import Confianca from '../components/Confianca'
import CtaFinal from '../components/CtaFinal'
import Diferenciais from '../components/Diferenciais'
import Faixa from '../components/Faixa'
import Faq from '../components/Faq'
import Hero from '../components/Hero'
import ParaQuemE from '../components/ParaQuemE'
import Processo from '../components/Processo'
import Seo from '../components/Seo'
import Sobre from '../components/Sobre'
import Trabalhos from '../components/Trabalhos'

export default function Home() {
  return (
    <>
      <Seo
        title="Madolio — Criação de sites profissionais para pequenos negócios"
        description="Sites profissionais para confeitarias, salões, hamburguerias e outros pequenos negócios, no ar em 5 a 15 dias. Design próprio, responsivo e feito sob medida — sem modelo genérico."
        path="/"
      />
      <Hero />
      <Diferenciais />
      <Trabalhos />
      <Faixa />
      <Benefits />
      <ParaQuemE />
      <Processo />
      <Confianca />
      <Sobre />
      <Faq />
      <CtaFinal />
    </>
  )
}
