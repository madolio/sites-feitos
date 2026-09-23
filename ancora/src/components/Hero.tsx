import Extrato from './Extrato'

export default function Hero() {
  return (
    <section id="inicio" className="pt-24 pb-16 lg:pt-16 lg:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
        <div className="min-w-0">
          <h1 className="text-5xl leading-[1.1] font-normal break-words sm:text-6xl">
            Patrimônio administrado como uma conta que fecha todo mês.
          </h1>
          <p className="mt-6 max-w-md text-lg text-indigo/75">
            Planejamento financeiro e gestão de patrimônio pra quem quer saber
            exatamente onde o dinheiro está e pra onde está indo.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <a href="#contato" className="btn-brass">
              Agendar diagnóstico
            </a>
            <a href="#servicos" className="btn-line">
              Ver serviços
            </a>
          </div>

          <p className="stamp mono mt-10 text-xs">Consultoria fiduciária independente</p>
        </div>

        <Extrato />
      </div>
    </section>
  )
}
