import type { Metrica } from '../data/api'

function formatarData(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso.replace(' ', 'T') + 'Z')
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

export default function Painel({
  metricas,
  onSair,
  onAtualizar,
  atualizando,
}: {
  metricas: Metrica[]
  onSair: () => void
  onAtualizar: () => void
  atualizando: boolean
}) {
  const totalVisitas = metricas.reduce((s, m) => s + m.visitas, 0)
  const totalDeploys = metricas.reduce((s, m) => s + m.deploys, 0)

  return (
    <div className="mx-auto max-w-4xl p-5 sm:p-8">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Painel interno — Madolio</h1>
          <p className="mt-1 text-sm text-fumo">
            Métricas simuladas (os sites-conceito são fictícios, sem tráfego real), mas persistidas de verdade
            num banco D1 — não números soltos no código.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onAtualizar}
            disabled={atualizando}
            className="rounded-lg border border-fio px-3 py-2 text-sm hover:border-acento disabled:opacity-50"
          >
            {atualizando ? 'Atualizando…' : 'Atualizar'}
          </button>
          <button type="button" onClick={onSair} className="rounded-lg border border-fio px-3 py-2 text-sm hover:border-acento">
            Sair
          </button>
        </div>
      </header>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-fio bg-carvao p-4">
          <p className="text-xs text-fumo">Projetos</p>
          <p className="tabular text-2xl font-semibold">{metricas.length}</p>
        </div>
        <div className="rounded-xl border border-fio bg-carvao p-4">
          <p className="text-xs text-fumo">Visitas simuladas</p>
          <p className="tabular text-2xl font-semibold">{totalVisitas.toLocaleString('pt-BR')}</p>
        </div>
        <div className="rounded-xl border border-fio bg-carvao p-4">
          <p className="text-xs text-fumo">Deploys registrados</p>
          <p className="tabular text-2xl font-semibold">{totalDeploys.toLocaleString('pt-BR')}</p>
        </div>
        <div className="rounded-xl border border-fio bg-carvao p-4">
          <p className="text-xs text-fumo">Média por projeto</p>
          <p className="tabular text-2xl font-semibold">
            {metricas.length ? Math.round(totalVisitas / metricas.length) : 0}
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-fio">
        <table className="w-full text-left text-sm">
          <thead className="bg-carvao text-fumo">
            <tr>
              <th className="px-4 py-3">Site</th>
              <th className="px-4 py-3">Visitas</th>
              <th className="px-4 py-3">Deploys</th>
              <th className="px-4 py-3">Última visita</th>
              <th className="px-4 py-3">Último deploy</th>
            </tr>
          </thead>
          <tbody>
            {metricas.map((m) => (
              <tr key={m.site} className="border-t border-fio">
                <td className="px-4 py-3 font-medium">{m.site}</td>
                <td className="tabular px-4 py-3">{m.visitas.toLocaleString('pt-BR')}</td>
                <td className="tabular px-4 py-3">{m.deploys}</td>
                <td className="tabular px-4 py-3 text-fumo">{formatarData(m.ultimaVisita)}</td>
                <td className="tabular px-4 py-3 text-fumo">{formatarData(m.ultimoDeploy)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
