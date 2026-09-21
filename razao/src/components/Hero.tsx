import { useMemo } from 'react'
import { regimes } from '../data/regimes'
import { formatarData, proximoPrazoDoRegime } from '../lib/prazos'

export default function Hero() {
  const hoje = useMemo(() => new Date(), [])
  const proximoMei = useMemo(() => proximoPrazoDoRegime(regimes[0], hoje), [hoje])

  return (
    <section className="border-b border-linha bg-papel py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="dado-fiscal text-selo">Contabilidade em Sorocaba, SP</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Seus prazos fiscais, marcados no calendário</h1>
          <p className="mt-5 max-w-lg text-lg text-tinta/75">
            A Razão Contábil cuida da rotina fiscal de MEI, pequenas empresas do Simples Nacional
            e profissionais liberais. Cada regime tem seu próprio ritmo de obrigações, e o nosso
            calendário fiscal mostra exatamente quais, e quando.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#calendario" className="btn-selo">
              Ver o calendário fiscal
            </a>
            <a href="#contato" className="btn-outline">
              Falar com a equipe
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-linha bg-papel-forte/60 p-6">
          <p className="dado-fiscal text-prazo">Próximo prazo · MEI</p>
          <p className="mt-2 text-2xl font-semibold">
            {proximoMei.obrigacao.sigla}
            <span className="ml-2 font-dado text-base font-normal text-tinta/60">
              {proximoMei.diasRestantes <= 1
                ? proximoMei.diasRestantes === 0
                  ? 'vence hoje'
                  : 'falta 1 dia'
                : `faltam ${proximoMei.diasRestantes} dias`}
            </span>
          </p>
          <p className="mt-1 text-sm text-tinta/65">Vencimento: {formatarData(proximoMei.data)}</p>
          <p className="mt-4 text-sm text-tinta/70">
            Esse número é calculado agora, com a data real de hoje: é a mesma conta que fazemos
            olhando pro calendário da parede do escritório. Veja o calendário completo dos três
            regimes mais comuns aqui embaixo.
          </p>
        </div>
      </div>
    </section>
  )
}
