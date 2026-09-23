import { entregas, type StatusEntrega } from '../data/painel'

const badge: Record<StatusEntrega, string> = {
  'a caminho': 'bg-accent/10 text-accent',
  entregue: 'bg-good/10 text-good',
  atrasado: 'bg-red-500/10 text-red-600',
}

export default function TabelaEntregas() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card">
      <div className="border-b border-line px-5 py-4">
        <h2 className="font-semibold text-ink">Entregas recentes</h2>
      </div>

      {/* Mobile: cada entrega em duas linhas, sem coluna escondida nem rolagem
          horizontal — a versão anterior escondia Bairro abaixo de sm e ainda
          cortava ETA visualmente (dígito picotado na borda), lido na
          auditoria como tabela quebrada, não como "arraste pra ver mais". */}
      <ul className="divide-y divide-line sm:hidden">
        {entregas.map((e) => (
          <li key={e.pedido} className="flex flex-col gap-1.5 px-5 py-3">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-sm text-ink/70">{e.pedido}</span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${badge[e.status]}`}>{e.status}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-sm text-ink/70">
              <span className="truncate text-ink">
                {e.motorista} · {e.bairro}
              </span>
              <span className="shrink-0 font-mono">{e.eta}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-ink/50">
              <th className="px-5 py-2 font-medium">Pedido</th>
              <th className="px-5 py-2 font-medium">Motorista</th>
              <th className="px-5 py-2 font-medium">Bairro</th>
              <th className="px-5 py-2 font-medium">Status</th>
              <th className="px-5 py-2 text-right font-medium">ETA</th>
            </tr>
          </thead>
          <tbody>
            {entregas.map((e) => (
              <tr key={e.pedido} className="border-t border-line">
                <td className="px-5 py-3 font-mono whitespace-nowrap text-ink/70">{e.pedido}</td>
                <td className="px-5 py-3 whitespace-nowrap text-ink">{e.motorista}</td>
                <td className="px-5 py-3 whitespace-nowrap text-ink/70">{e.bairro}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${badge[e.status]}`}>{e.status}</span>
                </td>
                <td className="px-5 py-3 text-right font-mono whitespace-nowrap text-ink/70">{e.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
