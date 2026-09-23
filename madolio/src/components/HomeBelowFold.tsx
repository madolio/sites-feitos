import Benefits from './Benefits'
import Confianca from './Confianca'
import CtaFinal from './CtaFinal'
import Diferenciais from './Diferenciais'
import Faixa from './Faixa'
import Faq from './Faq'
import ParaQuemE from './ParaQuemE'
import Processo from './Processo'
import Sobre from './Sobre'
import Trabalhos from './Trabalhos'

// Tudo que fica abaixo do Hero na home, num chunk só (carregado por Home via
// React.lazy). Tira do bundle inicial o GSAP ScrollTrigger/DrawSVG, o
// NumberFlow e os dados de projetos — nada disso é necessário pra pintar o
// hero.
export default function HomeBelowFold() {
  return (
    <>
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
