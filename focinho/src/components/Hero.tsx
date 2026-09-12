import FichaCard from './FichaCard'

export default function Hero() {
  return (
    <section id="inicio" className="scroll-mt-24 pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-4xl leading-[1.15] sm:text-5xl">
          Cuidado de verdade, registrado direitinho.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-ink/70">
          Consulta, vacina, banho e tosa num só lugar — com carteirinha
          digital atualizada a cada visita.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#agendar" className="btn-accent">
            Agendar consulta
          </a>
          <a href="#servicos" className="btn-line">
            Ver serviços
          </a>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-3xl px-6">
        <FichaCard />
      </div>
    </section>
  )
}
