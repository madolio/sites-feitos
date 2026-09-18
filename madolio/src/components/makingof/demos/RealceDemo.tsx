import { useState } from 'react'

// Espelha realce/src/components/MonteSuaVisita.tsx: mesmas constantes
// (ABERTURA 9h, FECHAMENTO 19h), mesmo encadeamento (início = fim do anterior),
// mesma altura mínima de bloco (max(78, minutos*0.8)) e o mesmo aviso de
// fechamento (saída > 19h). Serviços e durações: realce/src/data/servicos.ts
// (a duração é estimativa de agenda do conceito, não dado do salão real).
const ABERTURA = 9 * 60
const FECHAMENTO = 19 * 60
const servicos = [
  { id: 'corte', nome: 'Corte de cabelo', minutos: 45 },
  { id: 'penteado', nome: 'Penteado', minutos: 60 },
  { id: 'apliques', nome: 'Apliques de cabelo', minutos: 180 },
  { id: 'capilar', nome: 'Cuidado capilar', minutos: 60 },
  { id: 'massagem', nome: 'Massagem', minutos: 50 },
  { id: 'cera', nome: 'Depilação com cera', minutos: 30 },
  { id: 'manicure', nome: 'Manicure', minutos: 40 },
  { id: 'pedicure', nome: 'Pedicure', minutos: 50 },
  { id: 'noiva', nome: 'Dia da noiva', minutos: 240 },
]
const horarios = Array.from({ length: 9 }, (_, i) => ABERTURA + i * 60)
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
const duracao = (m: number) => {
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60)
  const r = m % 60
  return r ? `${h}h${String(r).padStart(2, '0')}` : `${h}h`
}
const altura = (m: number) => Math.max(78, m * 0.8)

export default function RealceDemo() {
  const [escolhidos, setEscolhidos] = useState<string[]>([])
  const [chegada, setChegada] = useState(ABERTURA)
  const alternar = (id: string) => setEscolhidos((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]))

  const itens = escolhidos.flatMap((id) => servicos.filter((s) => s.id === id))
  const total = itens.reduce((t, s) => t + s.minutos, 0)
  const blocos = itens.map((s, i) => {
    const inicio = chegada + itens.slice(0, i).reduce((t, x) => t + x.minutos, 0)
    return { s, inicio, fim: inicio + s.minutos }
  })
  const saida = chegada + total
  const passa = saida > FECHAMENTO
  const foco = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hero'

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="min-w-0 space-y-6">
        <div>
          <label htmlFor="realce-chegada" className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            Chego às
          </label>
          <select
            id="realce-chegada"
            value={chegada}
            onChange={(e) => setChegada(Number(e.target.value))}
            className={`mt-2 w-full rounded-lg border border-paper/30 bg-void px-4 py-3 text-paper [color-scheme:dark] ${foco}`}
          >
            {horarios.map((h) => (
              <option key={h} value={h} className="bg-void text-paper">
                {hhmm(h)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            Serviços, na ordem em que você toca
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {servicos.map((s) => {
              const on = escolhidos.includes(s.id)
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => alternar(s.id)}
                    className={`rounded-full border px-4 py-2 text-sm ${on ? 'border-accent-hero bg-accent-hero text-void' : 'border-paper/30 text-paper'} ${foco}`}
                  >
                    {s.nome} · {duracao(s.minutos)}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="min-w-0" aria-live="polite">
        {blocos.length === 0 ? (
          <p className="text-fog">Nenhum serviço escolhido ainda.</p>
        ) : (
          <>
            <ol data-testid="blocos">
              {blocos.map((b) => (
                <li
                  key={b.s.id}
                  className="border-l border-paper/30 pb-3 pl-4"
                  style={{ minHeight: altura(b.s.minutos) }}
                >
                  <p className="font-mono text-xs text-fog">
                    {hhmm(b.inicio)}–{hhmm(b.fim)}
                  </p>
                  <p className="font-medium text-paper">{b.s.nome}</p>
                </li>
              ))}
            </ol>
            <p className="mt-2 border-t border-paper/15 pt-4 text-paper">
              Total{' '}
              <span data-testid="total" className="font-mono">
                {duracao(total)}
              </span>{' '}
              · saída prevista{' '}
              <span data-testid="saida" className="font-mono">
                {hhmm(saida)}
              </span>
            </p>
            {passa && (
              <p data-testid="aviso" className="mt-3 rounded-lg border border-paper/40 p-3 text-sm text-paper">
                Assim a visita passa das 19h, que é quando o salão fecha. Chegue mais cedo ou divida em dois dias.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
