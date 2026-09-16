import { useState } from 'react'

export default function Acesso({
  onEntrar,
  erro,
}: {
  onEntrar: (chave: string) => void
  erro: string | null
}) {
  const [chave, setChave] = useState('')

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (chave.trim()) onEntrar(chave.trim())
        }}
        className="w-full max-w-sm rounded-2xl border border-fio bg-carvao p-6"
      >
        <h1 className="text-xl font-semibold">Painel interno — Madolio</h1>
        <p className="mt-1 text-sm text-fumo">Acesso restrito.</p>
        <input
          type="password"
          autoFocus
          value={chave}
          onChange={(e) => setChave(e.target.value)}
          placeholder="Senha"
          className="mt-5 w-full rounded-lg border border-fio bg-noite px-3 py-2 text-marfim outline-none placeholder:text-fumo focus-visible:border-acento"
        />
        {erro && <p className="mt-2 text-sm text-red-400">{erro}</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-acento px-4 py-2 font-semibold text-noite transition hover:brightness-110"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
