import { useState } from 'react'

export function ConfigChave({ onSalvar, chaveAtual }: { onSalvar: (chave: string) => void; chaveAtual: string }) {
  const [valor, setValor] = useState(chaveAtual)

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <h1 className="font-display text-2xl font-semibold text-tinta">Leads Madolio</h1>
      <p className="mt-2 text-sm text-cinza">
        Cole aqui sua chave da Google Places API. Ela fica guardada só neste aparelho — nunca é enviada pra nenhum
        outro lugar além da própria Google.
      </p>

      <form
        className="mt-6 flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          if (valor.trim()) onSalvar(valor.trim())
        }}
      >
        <input
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="AIzaSy..."
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="rounded-lg border border-cinza bg-white px-4 py-3 font-mono text-sm text-tinta outline-none focus:border-acento"
        />
        <button
          type="submit"
          disabled={!valor.trim()}
          className="rounded-lg bg-acento px-4 py-3 font-semibold text-white disabled:opacity-40"
        >
          Salvar e continuar
        </button>
      </form>

      <details className="mt-8 text-sm text-cinza">
        <summary className="cursor-pointer font-medium text-tinta">Como pegar essa chave</summary>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>
            Acesse{' '}
            <a className="text-acento underline" href="https://console.cloud.google.com" target="_blank" rel="noreferrer">
              console.cloud.google.com
            </a>{' '}
            e crie um projeto.
          </li>
          <li>Em "APIs e Serviços → Biblioteca", ative a "Places API (New)".</li>
          <li>Em "APIs e Serviços → Credenciais", crie uma chave de API.</li>
          <li>Restrinja a chave só pra "Places API" pra maior segurança.</li>
        </ol>
      </details>
    </div>
  )
}
