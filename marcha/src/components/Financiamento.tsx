import { useMemo, useState } from 'react'
import { estoque } from '../data/estoque'
import { calcularParcela, TAXA_MENSAL } from '../financiamento'
import { CampoNumero } from './CampoNumero'
import { sendToWhatsApp } from '../demo'
import Reveal from './Reveal'

const formatoPreco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const prazos = [24, 36, 48, 60]

// Fórmula real (tabela price) em financiamento.ts — nunca um número solto.
export function Financiamento() {
  const [carroId, setCarroId] = useState(estoque[0].id)
  const [entradaPct, setEntradaPct] = useState(20)
  const [meses, setMeses] = useState(48)

  const carro = estoque.find((c) => c.id === carroId)!

  const { entrada, financiado, parcela } = useMemo(() => {
    const entrada = Math.round((carro.preco * entradaPct) / 100)
    const financiado = carro.preco - entrada
    const parcela = calcularParcela(financiado, meses)
    return { entrada, financiado, parcela }
  }, [carro, entradaPct, meses])

  function pedirSimulacao() {
    sendToWhatsApp(
      `Olá! Simulei um financiamento no site:\n• Carro: ${carro.nome}\n• Valor: ${formatoPreco.format(carro.preco)}\n• Entrada: ${formatoPreco.format(entrada)} (${entradaPct}%)\n• ${meses}x de ${formatoPreco.format(parcela)}\nQuero uma simulação de verdade.`,
    )
  }

  return (
    <section id="financiamento" className="bg-preto px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="font-mono text-sm tracking-widest text-acento uppercase">Financiamento</p>
          <h2 className="mt-3 text-3xl text-marfim sm:text-4xl">Simule a parcela de verdade</h2>
          <p className="mt-3 text-fumo">
            Tabela price, a mesma conta de qualquer financeira: PMT = valor financiado × taxa mensal × (1+taxa)ⁿ ÷
            ((1+taxa)ⁿ − 1). Taxa usada: {(TAXA_MENSAL * 100).toFixed(2)}% ao mês.
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <p className="text-sm text-fumo">Carro</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {estoque.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={c.id === carroId}
                onClick={() => setCarroId(c.id)}
                className={`rounded-md border px-4 py-2 text-sm transition ${
                  c.id === carroId ? 'border-acento bg-acento text-preto' : 'border-fio text-marfim hover:border-acento'
                }`}
              >
                {c.nome}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <CampoNumero label="Entrada (%)" value={entradaPct} onChange={setEntradaPct} min={0} max={90} step={5} />
            <label className="flex flex-col gap-2 text-sm text-fumo">
              Parcelas
              <div className="flex flex-wrap gap-2">
                {prazos.map((p) => (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={p === meses}
                    onClick={() => setMeses(p)}
                    className={`rounded-md border px-3 py-2 text-sm transition ${
                      p === meses ? 'border-acento bg-acento text-preto' : 'border-fio text-marfim hover:border-acento'
                    }`}
                  >
                    {p}x
                  </button>
                ))}
              </div>
            </label>
          </div>

          <div className="mt-8 rounded-lg border border-fio bg-carvao p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <p className="text-xs tracking-widest text-fumo uppercase">Entrada</p>
                <p className="tabular mt-1 text-xl text-marfim">{formatoPreco.format(entrada)}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest text-fumo uppercase">Financiado</p>
                <p className="tabular mt-1 text-xl text-marfim">{formatoPreco.format(financiado)}</p>
              </div>
              <div>
                <p className="text-xs tracking-widest text-fumo uppercase">Parcela</p>
                <p className="tabular mt-1 text-xl text-acento">{formatoPreco.format(parcela)}</p>
              </div>
            </div>
            <button type="button" onClick={pedirSimulacao} className="btn-acento mt-6">
              Pedir essa simulação de verdade
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
