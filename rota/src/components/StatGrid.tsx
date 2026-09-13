import { stats } from '../data/painel'

export default function StatGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-line bg-card p-4">
          <p className="text-xs font-medium text-ink/55">{s.label}</p>
          <p className="mt-1.5 font-mono text-2xl font-semibold text-ink sm:text-3xl">{s.valor}</p>
          <p className="mt-1 text-xs text-ink/45">{s.nota}</p>
        </div>
      ))}
    </div>
  )
}
