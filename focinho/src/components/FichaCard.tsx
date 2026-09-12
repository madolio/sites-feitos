import { petExemplo } from '../data'

// A "ficha" de atendimento de um pet de exemplo — o wildcard visual da
// página. Em vez de foto de animal (não temos uma de verdade), o cachorro
// vira um desenho de traço simples, e o resto é preenchido como formulário
// físico mesmo, com carimbo de "vacina em dia".
export default function FichaCard() {
  const p = petExemplo
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border-2 border-ink/15 bg-white p-6 shadow-[8px_8px_0_0_rgba(43,58,58,0.08)] sm:p-9">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-ink/50 uppercase">Ficha de atendimento</p>
          <h2 className="mt-1 font-display text-3xl text-ink">{p.nome}</h2>
        </div>

        <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0 text-ink" aria-hidden="true">
          <path
            d="M20 46 Q16 30 22 22 Q18 14 24 12 Q28 18 32 18 Q36 18 40 12 Q46 14 42 22 Q48 30 44 46 Q38 52 32 52 Q26 52 20 46Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="27" cy="30" r="1.6" fill="currentColor" />
          <circle cx="37" cy="30" r="1.6" fill="currentColor" />
          <path d="M29 37 Q32 40 35 37" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-dashed border-line pt-6 sm:grid-cols-3">
        <div>
          <dt className="text-xs text-ink/55">Espécie</dt>
          <dd className="mt-0.5 font-semibold">{p.especie}</dd>
        </div>
        <div>
          <dt className="text-xs text-ink/55">Raça</dt>
          <dd className="mt-0.5 font-semibold">{p.raca}</dd>
        </div>
        <div>
          <dt className="text-xs text-ink/55">Idade</dt>
          <dd className="mt-0.5 font-semibold">{p.idade}</dd>
        </div>
        <div>
          <dt className="text-xs text-ink/55">Peso</dt>
          <dd className="mt-0.5 font-semibold">{p.peso}</dd>
        </div>
        <div className="col-span-2 sm:col-span-2">
          <dt className="text-xs text-ink/55">Próxima vacina</dt>
          <dd className="mt-0.5 font-semibold">{p.proximaVacina}</dd>
        </div>
      </dl>

      <div className="stamp stamp-tilt mt-7 inline-flex flex-col items-center px-5 py-3 text-sage">
        <span className="text-[0.65rem] font-bold tracking-widest uppercase">Focinho</span>
        <span className="font-display text-sm">vacina em dia</span>
      </div>
    </div>
  )
}
