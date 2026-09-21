import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import EtiquetaCuidado from '../components/EtiquetaCuidado'
import Vitrine from '../components/Vitrine'
import Depoimentos from '../components/Depoimentos'
import Perguntas from '../components/Perguntas'
import Contato from '../components/Contato'

export default function Home() {
  return (
    <>
      <Hero />

      <section id="etiqueta" className="border-b border-linha py-20">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <Reveal>
            <p className="dado-etiqueta text-mostarda">a etiqueta explicada</p>
            <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">
              Cada tecido tem sua própria regra: escolha um e veja a etiqueta real
            </h2>
            <p className="mt-4 max-w-xl text-carvao/75">
              Todo mundo já jogou uma peça na máquina errada. Os símbolos abaixo são os mesmos que
              aparecem costurados nas peças da loja, com o que cada um significa escrito por
              extenso, específico do tecido escolhido, não um aviso genérico de lavanderia.
            </p>
          </Reveal>

          <Reveal delay={0.05} className="mt-10">
            <EtiquetaCuidado />
          </Reveal>
        </div>
      </section>

      <Vitrine />
      <Depoimentos />
      <Perguntas />
      <Contato />
    </>
  )
}
