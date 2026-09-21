import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import PainelRevisao from '../components/PainelRevisao'
import Especialidades from '../components/Especialidades'
import Contato from '../components/Contato'

export default function Home() {
  return (
    <>
      <Hero />

      <section id="painel" className="border-b border-linha py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <Reveal>
            <p className="dado-oficina text-aco">o painel</p>
            <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">
              Arraste o odômetro e veja o que seu carro está pedindo
            </h2>
            <p className="mt-4 max-w-xl text-chumbo/75 normal-case">
              Cada item usa o intervalo de manutenção típico dele: óleo a cada 10 mil km, correia
              dentada a cada 60 mil, e por aí vai. É a mesma lógica que a gente usa pra montar a
              revisão de verdade, só que aqui você mexe antes de vir até a oficina.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mt-10">
            <PainelRevisao />
          </Reveal>
        </div>
      </section>

      <Especialidades />
      <Contato />
    </>
  )
}
