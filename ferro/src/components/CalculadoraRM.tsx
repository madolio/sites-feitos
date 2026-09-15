import { useMemo, useState } from 'react'

// O wildcard novo: uma calculadora de 1RM (carga máxima pra uma repetição)
// de verdade, usando a fórmula de Epley — a mesma que treinador de força
// usa de cabeça. Substitui o antigo contador de anos de casa: em vez de um
// número decorativo subindo, uma ferramenta que o aluno realmente usa pra
// planejar carga de treino.
const FAIXAS = [
  { pct: 100, rotulo: 'Máximo' },
  { pct: 90, rotulo: 'Força' },
  { pct: 80, rotulo: 'Hipertrofia' },
  { pct: 70, rotulo: 'Resistência' },
]

export default function CalculadoraRM() {
  const [peso, setPeso] = useState('')
  const [reps, setReps] = useState('')

  const rm = useMemo(() => {
    const p = Number(peso)
    const r = Number(reps)
    if (!p || !r || r < 1) return null
    if (r === 1) return p
    return p * (1 + r / 30)
  }, [peso, reps])

  return (
    <div className="border-2 border-preto bg-branco p-6 sm:p-8">
      <p className="rotulo text-lima-escuro">Calculadora de carga máxima</p>
      <h3 className="mt-2 text-2xl">Quanto você levanta em 1 rep?</h3>
      <p className="mt-1 text-fumo">
        Informe o peso e quantas repetições você fez até a falha — a gente estima sua carga máxima (fórmula de Epley).
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-semibold">Peso (kg)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="80"
            className="mt-1.5 w-full border-2 border-preto/20 px-3 py-2.5 text-lg focus:border-preto focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">Repetições</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={20}
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="5"
            className="mt-1.5 w-full border-2 border-preto/20 px-3 py-2.5 text-lg focus:border-preto focus:outline-none"
          />
        </label>
      </div>

      {rm && (
        <div className="mt-7 border-t-2 border-preto/10 pt-6">
          <p className="tabular text-5xl font-bold">{rm.toFixed(0)}<span className="text-2xl text-fumo"> kg</span></p>
          <p className="mt-1 text-sm text-fumo">sua carga máxima estimada pra 1 repetição</p>

          <div className="mt-6 space-y-3">
            {FAIXAS.map((f) => (
              <div key={f.pct} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-sm font-semibold">{f.rotulo}</span>
                <div className="h-2 flex-1 bg-cinza">
                  <div className="barra-intensidade h-full bg-preto" style={{ width: `${f.pct}%` }} />
                </div>
                <span className="tabular w-16 shrink-0 text-right text-sm text-fumo">
                  {((rm * f.pct) / 100).toFixed(0)} kg
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
