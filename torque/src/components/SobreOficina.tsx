import Reveal from './Reveal'

// Seção "sobre a oficina": o Hero já ficou ocupado com a ficha de OS e o
// painel é o mecanismo interativo, então é aqui que entra uma foto real —
// pra tirar a cara de maquete do resto da página, sem competir com o card
// estático do Hero nem com o painel.
export default function SobreOficina() {
  return (
    <section className="border-b border-linha bg-oficina-forte py-20">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
        <Reveal>
          <img
            src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Mecânico debruçado sobre o motor de um carro, checando peças no vão do motor dentro da oficina"
            className="aspect-[4/3] w-full rounded-lg border border-linha object-cover"
            loading="lazy"
          />
        </Reveal>

        <Reveal delay={0.05}>
          <p className="dado-oficina text-aco">quem mexe no seu carro</p>
          <h2 className="mt-2 max-w-lg text-3xl sm:text-4xl">
            22 anos de oficina, sem trocar peça sem te avisar antes
          </h2>
          <p className="mt-4 max-w-lg text-chumbo/75 normal-case">
            A Torque é tocada pelo Cláudio Teixeira, mecânico formado pelo SENAI-SP. O painel de
            revisão que você mexeu ali em cima usa os mesmos intervalos que a gente aplica na
            bancada — a diferença é que aqui na oficina a gente também mostra a peça velha antes de
            trocar.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
