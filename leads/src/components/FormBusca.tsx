import { useState } from 'react'

export type ParametrosBusca = {
  query: string
  usarLocalizacao: boolean
  raioM: number
}

export function FormBusca({ buscando, onBuscar }: { buscando: boolean; onBuscar: (p: ParametrosBusca) => void }) {
  const [query, setQuery] = useState('')
  const [usarLocalizacao, setUsarLocalizacao] = useState(false)
  const [raioKm, setRaioKm] = useState(5)

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        if (query.trim()) onBuscar({ query: query.trim(), usarLocalizacao, raioM: raioKm * 1000 })
      }}
    >
      <input
        type="text"
        placeholder="ex: encanador em Curitiba, ou salão de beleza"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-lg border border-cinza bg-white px-4 py-3 text-tinta outline-none focus:border-acento"
      />

      <label className="flex items-center gap-2 text-sm text-cinza">
        <input type="checkbox" checked={usarLocalizacao} onChange={(e) => setUsarLocalizacao(e.target.checked)} />
        Priorizar perto da minha localização atual
      </label>

      {usarLocalizacao && (
        <label className="flex items-center gap-3 text-sm text-cinza">
          <span className="whitespace-nowrap tabular-nums">Raio: {raioKm} km</span>
          <input
            type="range"
            min={1}
            max={50}
            value={raioKm}
            onChange={(e) => setRaioKm(Number(e.target.value))}
            className="w-full"
          />
        </label>
      )}

      <button
        type="submit"
        disabled={buscando || !query.trim()}
        className="rounded-lg bg-acento px-4 py-3 font-semibold text-white disabled:opacity-40"
      >
        {buscando ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  )
}
