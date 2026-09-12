import { useState } from 'react'
import { sendToWhatsApp } from '../demo'
import { tipos } from '../data'

export default function Contato() {
  const [tipo, setTipo] = useState<string | null>(null)
  const [nome, setNome] = useState('')
  const ready = tipo !== null && nome.trim().length > 1

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ready) return
    sendToWhatsApp(`Olá, Chave! Estou procurando um imóvel do tipo ${tipo?.toLowerCase()}.\nMeu nome é ${nome.trim()}.`)
  }

  return (
    <footer className="border-t-4 border-double border-ink bg-ink py-16 text-paper">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs tracking-[0.2em] text-paper/70 uppercase">Classificado — anuncie ou procure</p>
        <h2 className="mt-2 text-3xl text-paper sm:text-4xl">Procurando um imóvel?</h2>
        <p className="mt-3 max-w-md text-paper/80">
          Conta o que você procura e a gente te manda opções que ainda nem
          foram publicadas aqui.
        </p>

        <form onSubmit={submit} className="mt-9 max-w-lg space-y-6">
          <fieldset>
            <legend className="font-bold">Qual tipo de imóvel?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {tipos.map((t) => (
                <label
                  key={t.id}
                  className={`cursor-pointer border-2 border-paper/40 px-4 py-2 font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-paper ${
                    tipo === t.label ? 'bg-paper text-ink' : 'text-paper hover:bg-paper/10'
                  }`}
                >
                  <input type="radio" name="tipo" checked={tipo === t.label} onChange={() => setTipo(t.label)} className="sr-only" />
                  {t.label}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="font-bold">Seu nome</span>
            <input
              type="text"
              autoComplete="given-name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 w-full border-2 border-paper/40 bg-ink px-4 py-3 text-paper placeholder:text-paper/50 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            />
          </label>

          <button type="submit" disabled={!ready} className="btn-steel disabled:cursor-not-allowed disabled:opacity-50">
            Quero receber opções
          </button>
        </form>

        <p className="mt-16 border-t border-paper/20 pt-6 text-sm text-paper/75">
          A Chave é uma imobiliária fictícia: este site é um conceito criado
          pela{' '}
          <a href="https://madolio.com.br" className="font-semibold underline underline-offset-4">
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
