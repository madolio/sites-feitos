import { useMemo, useState } from 'react'
import { regimes } from '../data/regimes'
import { formatarData, mesesComObrigacao, NOMES_MES, proximoPrazoDoRegime } from '../lib/prazos'

/** O wildcard: um calendário fiscal de parede real, não decorativo. Trocar
 * de regime muda quais meses acendem (mensal acende os 12, anual acende só
 * o mês dele) e recalcula, com a data de hoje de verdade, qual é o próximo
 * vencimento e quantos dias faltam, o mesmo cálculo que um contador faria
 * de cabeça ao olhar o calendário da parede do escritório. */
export default function CalendarioFiscal() {
  const [regimeId, setRegimeId] = useState(regimes[0].id)
  const regime = regimes.find((r) => r.id === regimeId) ?? regimes[0]

  const hoje = useMemo(() => new Date(), [])
  const mesAtual = hoje.getMonth() + 1
  const meses = useMemo(() => mesesComObrigacao(regime), [regime])
  const proximo = useMemo(() => proximoPrazoDoRegime(regime, hoje), [regime, hoje])

  return (
    <div className="rounded-2xl border border-linha bg-papel-forte/60 p-6 sm:p-8">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Regime tributário">
        {regimes.map((r) => (
          <button
            key={r.id}
            type="button"
            role="tab"
            aria-selected={r.id === regime.id}
            onClick={() => setRegimeId(r.id)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              r.id === regime.id
                ? 'border-selo bg-selo text-papel'
                : 'border-tinta/25 text-tinta/75 hover:border-tinta/50'
            }`}
          >
            {r.nome}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-tinta/70">{regime.publico}</p>

      <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
        {NOMES_MES.map((nome, i) => {
          const numero = i + 1
          const ativo = meses.has(numero)
          const ehMesAtual = numero === mesAtual
          return (
            <div
              key={nome}
              className={`relative flex aspect-square flex-col items-center justify-center rounded-lg border text-xs font-semibold uppercase ${
                ativo
                  ? 'border-prazo/60 bg-prazo/15 text-tinta'
                  : 'border-linha bg-papel text-tinta/40'
              } ${ehMesAtual ? 'ring-2 ring-selo ring-offset-2 ring-offset-papel-forte' : ''}`}
            >
              {nome}
              {ativo && (
                <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 rounded-full bg-prazo" />
              )}
            </div>
          )
        })}
      </div>
      <p className="mt-2 text-xs text-tinta/55">
        <span aria-hidden="true" className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-prazo align-middle" />
        mês com vencimento de {regime.nome} · o mês com anel é o mês atual
      </p>

      <div className="mt-8 rounded-xl border border-selo/30 bg-selo/8 p-5">
        <p className="dado-fiscal text-selo">Próximo prazo</p>
        <p className="mt-1 text-xl font-semibold text-tinta">
          {proximo.obrigacao.nome} ({proximo.obrigacao.sigla})
        </p>
        <p className="mt-1 text-tinta/75">
          Vence em {formatarData(proximo.data)} —{' '}
          <span className="font-dado font-semibold text-selo">
            {proximo.diasRestantes === 0
              ? 'hoje'
              : proximo.diasRestantes === 1
                ? 'falta 1 dia'
                : `faltam ${proximo.diasRestantes} dias`}
          </span>
        </p>
        <p className="mt-3 text-sm text-tinta/65">{proximo.obrigacao.descricao}</p>
      </div>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        {regime.obrigacoes.map((obrigacao) => (
          <div key={obrigacao.sigla} className="rounded-lg border border-linha bg-papel p-4">
            <dt className="dado-fiscal text-tinta/50">
              {obrigacao.sigla} · {obrigacao.periodicidade}
            </dt>
            <dd className="mt-1 text-sm text-tinta/80">{obrigacao.regraVencimento}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
