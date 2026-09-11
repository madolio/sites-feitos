import Benefits from '../components/Benefits'
import Hero from '../components/Hero'
import Seo from '../components/Seo'

export default function Home() {
  return (
    <>
      <Seo
        title="Madolio — Criação de sites profissionais para pequenos negócios"
        description="Sites profissionais para confeitarias, salões, hamburguerias e outros pequenos negócios, no ar em 5 a 15 dias. Design próprio, responsivo e feito sob medida — sem modelo genérico."
        path="/"
      />
      <Hero />
      <Benefits />
    </>
  )
}
