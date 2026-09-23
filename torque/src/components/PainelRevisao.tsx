import { useId, useState } from 'react'
import { itensRevisao, kmDesdeUltimaTroca, statusItem, type StatusItem } from '../data/servicos'

const KM_MAX = 100000
const KM_PASSO = 1000

const rotuloStatus: Record<StatusItem, string> = {
  'em-dia': 'Em dia',
  proximo: 'Perto do prazo',
  vencido: 'Vencido',
}

const corStatus: Record<StatusItem, string> = {
  'em-dia': 'bg-ok/15 text-ok border-ok/40',
  proximo: 'bg-sinal/15 text-sinal-hover border-sinal/50',
  vencido: 'bg-alerta/15 text-alerta border-alerta/40',
}

function formatarKm(km: number) {
  return km.toLocaleString('pt-BR') + ' km'
}

export default function PainelRevisao() {
  const [km, setKm] = useState(35000)
  const sliderId = useId()

  const vencidos = itensRevisao.filter((item) => statusItem(km, item) === 'vencido').length

  return (
    <div className="rounded-lg border border-linha bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <label htmlFor={sliderId} className="dado-oficina block text-aco">
            Quilometragem do carro
          </label>
          <p className="mt-1 font-display text-4xl tabular-nums">{formatarKm(km)}</p>
        </div>
        <p className="text-sm text-chumbo/70">
          {vencidos === 0
            ? 'Nenhum item vencido nessa quilometragem.'
            : `${vencidos} ${vencidos === 1 ? 'item vencido' : 'itens vencidos'} nessa quilometragem.`}
        </p>
      </div>

      <input
        id={sliderId}
        type="range"
        min={0}
        max={KM_MAX}
        step={KM_PASSO}
        value={km}
        onChange={(e) => setKm(Number(e.target.value))}
        aria-label="Arraste para simular a quilometragem do carro"
        className="mt-5 w-full accent-aco"
      />
      <div className="dado-oficina mt-1 flex justify-between text-chumbo/50">
        <span>0 km</span>
        <span>{formatarKm(KM_MAX)}</span>
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {itensRevisao.map((item) => {
          const status = statusItem(km, item)
          const percorrido = kmDesdeUltimaTroca(km, item.kmMin)
          return (
            <li
              key={item.id}
              className={`min-w-0 rounded-md border p-4 ${corStatus[status]}`}
            >
              <div className="flex min-w-0 items-center justify-between gap-3">
                <p className="min-w-0 font-semibold text-chumbo">{item.nome}</p>
                <span className="dado-oficina shrink-0 rounded-full border px-2 py-0.5 whitespace-nowrap">
                  {rotuloStatus[status]}
                </span>
              </div>
              <p className="dado-oficina mt-2 text-chumbo/60">
                {formatarKm(percorrido)} desde a troca esperada · intervalo de{' '}
                {item.kmMin === item.kmMax
                  ? formatarKm(item.kmMin)
                  : `${formatarKm(item.kmMin)}–${formatarKm(item.kmMax)}`}
              </p>
              <p className="mt-2 text-sm text-chumbo/70">{item.observacao}</p>
            </li>
          )
        })}
      </ul>

      <p className="mt-6 text-xs text-chumbo/50">
        A simulação assume que cada item foi trocado em dia no ciclo anterior. O carro real pode
        estar atrasado ou adiantado em relação a isso: é uma referência de planejamento, não um
        diagnóstico, a checagem de verdade é feita na oficina.
      </p>
    </div>
  )
}
