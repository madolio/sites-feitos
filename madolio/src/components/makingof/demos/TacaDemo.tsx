import { useState } from 'react'

// Espelha taca/src/data/vinhos.ts (campos nome, notas, aromas) e a lógica de
// taca/src/components/RodaAromas.tsx: clicar numa fatia filtra
// vinhos.filter(v => v.aromas.includes(selecionada)); clicar de novo limpa.
// A geometria de fatia() e pontoNoCirculo() é a do original.
const categorias = ['Fruta escura', 'Cítrico', 'Mineral', 'Torrado', 'Amadeirado', 'Especiado']
const vinhos = [
  { nome: 'Talhão Sul', notas: 'Fruta escura madura e uma ponta de pimenta', aromas: ['Fruta escura', 'Especiado'] },
  { nome: 'Encosta Brut', notas: 'Espumante método tradicional, 18 meses sobre borras', aromas: ['Torrado', 'Cítrico'] },
  { nome: 'Névoa', notas: 'Cítrico e mineral, colhido de madrugada', aromas: ['Cítrico', 'Mineral'] },
  { nome: 'Reserva do Talhador', notas: '14 meses em carvalho francês', aromas: ['Amadeirado', 'Especiado'] },
]

function pontoNoCirculo(angulo: number, raio: number) {
  const rad = ((angulo - 90) * Math.PI) / 180
  return { x: 100 + Math.cos(rad) * raio, y: 100 + Math.sin(rad) * raio }
}
function fatia(inicio: number, fim: number) {
  const p1 = pontoNoCirculo(inicio, 90)
  const p2 = pontoNoCirculo(fim, 90)
  return `M100,100 L${p1.x},${p1.y} A90,90 0 0 1 ${p2.x},${p2.y} Z`
}

export default function TacaDemo() {
  const [sel, setSel] = useState<string | null>(null)
  const passo = 360 / categorias.length
  const lista = sel ? vinhos.filter((v) => v.aromas.includes(sel)) : vinhos
  const foco = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hero'

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="min-w-0">
        <div className="mx-auto w-full max-w-[19rem]">
          <svg viewBox="0 0 200 200" className="h-auto w-full" aria-hidden="true">
            {categorias.map((cat, i) => {
              const ativa = sel === cat
              const meio = pontoNoCirculo(i * passo + passo / 2, 90 * 0.62)
              return (
                <g key={cat}>
                  <path
                    d={fatia(i * passo, (i + 1) * passo)}
                    fill={ativa ? '#c0324f' : '#7c8c5b'}
                    fillOpacity={ativa ? 1 : sel ? 0.25 : 0.7}
                    stroke="#241832"
                    strokeWidth={1.5}
                  />
                  <text
                    x={meio.x}
                    y={meio.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={9}
                    fontWeight={ativa ? 700 : 500}
                    fill={ativa ? '#fff' : '#241832'}
                  >
                    {cat}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={sel === cat}
              onClick={() => setSel(sel === cat ? null : cat)}
              className={`rounded-full border px-4 py-2 text-sm ${sel === cat ? 'border-accent-hero bg-accent-hero text-void' : 'border-paper/30 text-paper'} ${foco}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="min-w-0">
        <p aria-live="polite" data-testid="contagem" className="text-sm text-fog">
          {sel
            ? `${lista.length} de ${vinhos.length} rótulos têm o aroma “${sel}”`
            : `Todos os ${vinhos.length} rótulos`}
        </p>
        <ul className="mt-4 space-y-4" data-testid="lista">
          {lista.map((v) => (
            <li key={v.nome} className="border-t border-paper/15 pt-4">
              <p className="font-heading text-xl text-paper">{v.nome}</p>
              <p className="mt-1 text-fog">{v.notas}</p>
              <p className="mt-2 font-mono text-xs text-fog">aromas: {v.aromas.join(' · ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
