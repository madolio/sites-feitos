import { useMemo, useState } from 'react'

// Espelha marcha/src/financiamento.ts e marcha/src/data/estoque.ts: mesma taxa,
// mesma fórmula, mesmos preços. Está duplicado aqui de propósito — é uma
// demonstração dentro do making-of, e o leitor mexe nos números pra ver a
// conta mudar, em vez de só ler que "a parcela é calculada de verdade".
const TAXA_MENSAL = 0.0149
const carros = [
  { id: 'coupe-azul', nome: 'Cupê 2 portas', preco: 289000 },
  { id: 'esportivo-azul', nome: 'Esportivo americano', preco: 335000 },
  { id: 'muscle-preto', nome: 'Muscle car preparado', preco: 398000 },
  { id: 'coupe-cinza', nome: 'Cupê performance', preco: 512000 },
  { id: 'esportivo-amarelo', nome: 'Superesportivo V10', preco: 1890000 },
]
const prazos = [24, 36, 48, 60]

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const brl2 = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })
const num = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 4 })

export default function FinanciamentoDemo() {
  const [carroId, setCarroId] = useState('coupe-azul')
  const [entradaPct, setEntradaPct] = useState(20)
  const [meses, setMeses] = useState(48)

  const carro = carros.find((c) => c.id === carroId) ?? carros[0]

  const conta = useMemo(() => {
    const entrada = Math.round((carro.preco * entradaPct) / 100)
    const financiado = carro.preco - entrada
    const fator = Math.pow(1 + TAXA_MENSAL, meses)
    const parcela = (financiado * TAXA_MENSAL * fator) / (fator - 1)
    const total = parcela * meses
    return { entrada, financiado, fator, parcela, total, juros: total - financiado }
  }, [carro, entradaPct, meses])

  const foco = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hero'

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="min-w-0 space-y-6">
        <div>
          <label htmlFor="demo-carro" className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            Carro do estoque
          </label>
          <select
            id="demo-carro"
            value={carroId}
            onChange={(e) => setCarroId(e.target.value)}
            className={`mt-2 w-full rounded-lg border border-paper/30 bg-void px-4 py-3 text-paper [color-scheme:dark] ${foco}`}
          >
            {carros.map((c) => (
              <option key={c.id} value={c.id} className="bg-void text-paper">
                {c.nome} — {brl.format(c.preco)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="demo-entrada" className="flex justify-between text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            <span>Entrada</span>
            <span className="font-mono text-paper normal-case">
              {entradaPct}% · {brl.format(conta.entrada)}
            </span>
          </label>
          <input
            id="demo-entrada"
            type="range"
            min={0}
            max={60}
            step={5}
            value={entradaPct}
            onChange={(e) => setEntradaPct(Number(e.target.value))}
            className={`mt-3 w-full accent-accent-hero ${foco}`}
          />
        </div>

        <div role="group" aria-labelledby="demo-prazo">
          <p id="demo-prazo" className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            Prazo
          </p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {prazos.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={meses === p}
                onClick={() => setMeses(p)}
                className={`rounded-lg border px-2 py-3 font-mono text-sm transition-colors ${foco} ${
                  meses === p ? 'border-accent-hero bg-accent-hero text-void' : 'border-paper/30 text-paper hover:border-paper/60'
                }`}
              >
                {p}x
              </button>
            ))}
          </div>
        </div>
      </div>

      <div aria-live="polite" className="min-w-0 rounded-xl border border-paper/15 bg-paper/5 p-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">Parcela mensal</p>
        <p className="mt-1 font-poster text-6xl leading-none text-white md:text-7xl">{brl.format(conta.parcela)}</p>
        <p className="mt-2 text-sm text-fog">
          {meses}x sobre {brl.format(conta.financiado)} financiados · total pago {brl.format(conta.total)} · juros{' '}
          {brl.format(conta.juros)}
        </p>

        <pre className="mt-5 overflow-x-auto rounded-lg bg-void p-4 font-mono text-[13px] leading-relaxed text-accent-hero">
{`PMT = P × i × (1+i)ⁿ ÷ ((1+i)ⁿ − 1)
    = ${num.format(conta.financiado)} × ${num.format(TAXA_MENSAL)} × ${num.format(conta.fator)} ÷ (${num.format(conta.fator)} − 1)
    = ${brl2.format(conta.parcela)}`}
        </pre>
      </div>
    </div>
  )
}
