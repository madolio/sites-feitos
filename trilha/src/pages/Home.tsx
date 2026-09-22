import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import TrilhaMapa from '../components/TrilhaMapa'
import Especialidades from '../components/Especialidades'
import Depoimentos from '../components/Depoimentos'
import Faq from '../components/Faq'
import Contato from '../components/Contato'

export default function Home() {
  return (
    <>
      <Hero />

      <section id="trilha" className="border-b border-linha py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <Reveal>
            <p className="dado-mapa text-altitude">o mapa</p>
            <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">
              Quatro fases, um percurso — clique para ver onde cada uma leva
            </h2>
            <p className="mt-4 max-w-xl text-tinta/75">
              A fisioterapia segue uma progressão conhecida: primeiro controlar a dor, depois
              recuperar o movimento, depois reconstruir a força, e só então voltar à atividade
              plena. As faixas de tempo abaixo são referências gerais — o ritmo real depende da
              lesão e da pessoa, e isso é decidido na avaliação, não no site.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mt-10">
            <TrilhaMapa />
          </Reveal>
        </div>
      </section>

      <Especialidades />
      <Depoimentos />
      <Faq />
      <Contato />
    </>
  )
}
