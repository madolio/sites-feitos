// Layout de 2 colunas: texto de um lado, do outro uma miniatura de ordem de
// serviço (estática, só pra dar o gostinho do painel real que vem mais
// abaixo) — não duplica a lógica do PainelRevisao, só antecipa o vocabulário
// visual dele (ficha, não cartão de SaaS).
export default function Hero() {
  return (
    <section className="border-b border-linha bg-oficina">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14">
        <div>
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

        <div aria-hidden="true" className="hidden lg:block">
          <div className="rounded border border-dashed border-chumbo/30 bg-oficina-forte p-5">
            <div className="faixa-listrada -m-5 mb-4 h-2 rounded-t" />
            <p className="dado-oficina text-aco/70">Ordem de serviço · nº 0412</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center justify-between border-b border-linha pb-2">
                <span>Óleo do motor</span>
                <span className="dado-oficina text-ok">em dia</span>
              </li>
              <li className="flex items-center justify-between border-b border-linha pb-2">
                <span>Pastilha de freio</span>
                <span className="dado-oficina text-risco">perto do prazo</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Correia dentada</span>
                <span className="dado-oficina text-alerta">vencido</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
