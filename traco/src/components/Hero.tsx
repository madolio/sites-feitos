import FloorPlan from './FloorPlan'

export default function Hero() {
  return (
    <section id="inicio" className="pt-16 pb-16 md:pt-24 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        <div>
          <h1 className="text-5xl leading-[1.08] font-normal sm:text-6xl lg:text-[4.2rem]">
            Arquitetura que parte de como você mora.
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink/75">
            Projetamos casas, reformas e espaços comerciais em São Paulo e
            outras cidades do Brasil, do estudo de viabilidade ao
            acompanhamento de obra.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <a href="#contato" className="btn-ink">
              Agendar uma conversa
            </a>
            <a href="#projetos" className="btn-quiet">
              Ver projetos
            </a>
          </div>
        </div>

        <FloorPlan className="mx-auto w-full max-w-lg" />
      </div>
    </section>
  )
}
