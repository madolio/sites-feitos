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

      <div className="overflow-x-auto" style={{ maskImage: 'linear-gradient(to right, black calc(100% - 20px), transparent)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-ink/50">
              <th className="px-5 py-2 font-medium">Pedido</th>
              <th className="px-5 py-2 font-medium">Motorista</th>
              <th className="hidden px-5 py-2 font-medium sm:table-cell">Bairro</th>
              <th className="px-5 py-2 font-medium">Status</th>
              <th className="px-5 py-2 text-right font-medium">ETA</th>
              <th className="w-4" aria-hidden="true" />
            </tr>
          </thead>
          <tbody>
            {entregas.map((e) => (
              <tr key={e.pedido} className="border-t border-line">
                <td className="px-5 py-3 font-mono whitespace-nowrap text-ink/70">{e.pedido}</td>
                <td className="px-5 py-3 whitespace-nowrap text-ink">{e.motorista}</td>
                <td className="hidden px-5 py-3 whitespace-nowrap text-ink/70 sm:table-cell">{e.bairro}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${badge[e.status]}`}>{e.status}</span>
                </td>
                <td className="px-5 py-3 text-right font-mono whitespace-nowrap text-ink/70">{e.eta}</td>
                <td aria-hidden="true" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
