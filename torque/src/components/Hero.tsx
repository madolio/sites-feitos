export default function Hero() {
  return (
    <section className="border-b border-linha bg-oficina">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
        <p className="dado-oficina text-aco">Torque Auto Mecânica · Sorocaba, SP</p>
        <h1 className="mt-3 max-w-2xl text-4xl leading-tight sm:text-5xl">
          Antes de trazer o carro, veja o que ele já está pedindo
        </h1>
        <p className="mt-5 max-w-xl text-lg text-chumbo/75 normal-case">
          Arraste a quilometragem no painel abaixo e veja quais itens do seu carro estão em dia,
          perto do prazo ou vencidos, usando os mesmos intervalos que usamos pra montar sua
          revisão aqui na oficina.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#painel" className="btn-sinal">
            Ver meu painel
          </a>
          <a href="#contato" className="btn-outline">
            Agendar horário
          </a>
        </div>
      </div>
    </section>
  )
}
