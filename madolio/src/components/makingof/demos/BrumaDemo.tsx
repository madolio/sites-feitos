import { useState } from 'react'

// Espelha bruma/src/data/fragancias.ts: as quatro fragrâncias, com
// concentração de óleo, duração e pirâmide olfativa. As faixas por tipo
// (Extrait 20–30%, EDP 15–20%, EDT 5–15%) vêm do bruma/CLAUDE.md.
const faixas = { Extrait: [20, 30], EDP: [15, 20], EDT: [5, 15] } as const
type Tipo = keyof typeof faixas
const fragancias: {
  id: string
  nome: string
  tipo: Tipo
  oleo: number
  duracao: string
  topo: string[]
  coracao: string[]
  fundo: string[]
}[] = [
  { id: 'bruma-noturna', nome: 'Bruma Noturna', tipo: 'EDP', oleo: 18, duracao: '6–8 horas', topo: ['Bergamota', 'Pimenta rosa'], coracao: ['Jasmim', 'Íris'], fundo: ['Âmbar', 'Musgo de carvalho'] },
  { id: 'raiz-seca', nome: 'Raiz Seca', tipo: 'Extrait', oleo: 25, duracao: '10–12 horas', topo: ['Cardamomo'], coracao: ['Vetiver', 'Couro'], fundo: ['Sândalo', 'Âmbar cinza'] },
  { id: 'flor-de-sal', nome: 'Flor de Sal', tipo: 'EDT', oleo: 10, duracao: '3–5 horas', topo: ['Limão siciliano', 'Sal marinho'], coracao: ['Flor de laranjeira'], fundo: ['Musk branco'] },
  { id: 'fumaca-doce', nome: 'Fumaça Doce', tipo: 'EDP', oleo: 20, duracao: '8–10 horas', topo: ['Cacau'], coracao: ['Incenso', 'Rosa negra'], fundo: ['Fava tonka', 'Baunilha'] },
]
const foco = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hero'

export default function BrumaDemo() {
  const [id, setId] = useState('bruma-noturna')
  const f = fragancias.find((x) => x.id === id) ?? fragancias[0]
  const [min, max] = faixas[f.tipo]
  const camadas = [
    { rot: 'Topo', notas: f.topo, nota: 'evapora primeiro' },
    { rot: 'Coração', notas: f.coracao, nota: 'aparece em seguida' },
    { rot: 'Fundo', notas: f.fundo, nota: 'fica por último' },
  ]

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="min-w-0 space-y-6">
        <div role="group" aria-labelledby="bruma-frag">
          <p id="bruma-frag" className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
            Fragrância
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {fragancias.map((x) => (
              <button
                key={x.id}
                type="button"
                aria-pressed={x.id === id}
                onClick={() => setId(x.id)}
                className={`rounded-lg border px-3 py-3 text-left text-sm transition-colors ${foco} ${
                  x.id === id ? 'border-accent-hero bg-accent-hero text-void' : 'border-paper/30 text-paper hover:border-paper/60'
                }`}
              >
                {x.nome}
                <span className="block font-mono text-xs">
                  {x.tipo} · {x.oleo}%
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">Faixa de óleo por tipo (% do frasco)</p>
          <ul className="mt-3 space-y-3">
            {(Object.keys(faixas) as Tipo[]).map((t) => {
              const [a, b] = faixas[t]
              const ativo = t === f.tipo
              return (
                <li key={t} className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-3 text-sm text-fog">
                  <span className={ativo ? 'font-semibold text-paper' : ''}>{t}</span>
                  <span className="relative h-3 rounded-full bg-paper/10">
                    <span
                      className={`absolute top-0 h-3 rounded-full ${ativo ? 'bg-accent-hero' : 'bg-paper/40'}`}
                      style={{ left: `${(a / 30) * 100}%`, width: `${((b - a) / 30) * 100}%` }}
                    />
                    {ativo && (
                      <span aria-hidden="true" className="absolute -top-1 h-5 w-0.5 bg-white" style={{ left: `${(f.oleo / 30) * 100}%` }} />
                    )}
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="mt-2 font-mono text-xs text-fog">escala de 0 a 30%; a barra vertical é a fragrância escolhida</p>
        </div>
      </div>

      <div aria-live="polite" className="min-w-0 rounded-xl border border-paper/15 bg-paper/5 p-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
          {f.tipo} · faixa {min}–{max}%
        </p>
        <p className="mt-1 font-poster text-6xl leading-none text-white md:text-7xl" data-testid="bruma-oleo">
          {f.oleo}%
        </p>
        <p className="mt-2 text-sm text-fog">de óleo essencial · dura {f.duracao} na pele</p>

        <ol className="mt-5 space-y-2">
          {camadas.map((c) => (
            <li key={c.rot} className="rounded-lg border border-paper/15 bg-void px-4 py-3">
              <p className="font-mono text-xs text-accent-hero">
                {c.rot} · {c.nota}
              </p>
              <p className="mt-1 text-paper">{c.notas.join(', ')}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
