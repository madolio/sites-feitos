import type { Etapa } from '../cena/Atelie'

const passos: { id: Etapa; nome: string }[] = [
  { id: 'moldar', nome: 'Moldar' },
  { id: 'esmaltar', nome: 'Esmaltar' },
  { id: 'queimando', nome: 'Queimar' },
]

const ordem: Record<Etapa, number> = { moldar: 0, esmaltar: 1, queimando: 2, pronta: 3 }

// É uma sequência de verdade (não dá pra esmaltar antes de moldar), por isso
// numerada. Só dá pra voltar pra etapas já feitas — nunca pular pra frente.
export default function Etapas({ etapa, onVoltar }: { etapa: Etapa; onVoltar: (e: Etapa) => void }) {
  const atual = ordem[etapa]

  return (
    <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
      {passos.map((p, i) => {
        const feito = i < atual
        const agora = i === atual
        const podeVoltar = feito && etapa !== 'queimando' && p.id !== 'queimando'
        return (
          <li key={p.id} className="flex items-center gap-1">
            <button
              type="button"
              disabled={!podeVoltar}
              onClick={() => onVoltar(p.id)}
              aria-current={agora ? 'step' : undefined}
              className={`flex items-center gap-1.5 rounded-full py-1 pr-2 pl-1 text-sm font-semibold transition-colors ${
                agora ? 'bg-glaze text-on-glaze' : feito ? 'text-ink hover:bg-ink/5' : 'text-ink/40'
              } disabled:cursor-default`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs tabular-nums ${
                  agora ? 'bg-on-glaze/20' : 'border border-current'
                }`}
              >
                {i + 1}
              </span>
              {p.nome}
            </button>
            {i < passos.length - 1 && <span className="h-px w-2 bg-ink/20" aria-hidden="true" />}
          </li>
        )
      })}
    </ol>
  )
}
