import { useState } from 'react'
import { idiomas } from '../data'
import { sendToWhatsApp } from '../demo'

export default function Contato() {
  const [idioma, setIdioma] = useState<string | null>(null)
  const [nome, setNome] = useState('')
  const ready = idioma !== null && nome.trim().length > 1

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ready) return
    sendToWhatsApp(`Olá, Passaporte! Quero fazer o teste de nível de ${idioma}.\nMeu nome é ${nome.trim()}.`)
  }

  return (
    <footer id="matricula" className="scroll-mt-16 py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl sm:text-4xl">Carimbe o seu primeiro nível</h2>
        <p className="mt-3 max-w-md text-ink/75">
          O teste de nivelamento é gratuito e leva 20 minutos — a gente te
          diz exatamente onde começar.
        </p>

        <form onSubmit={submit} className="mt-10 space-y-6">
          <fieldset>
            <legend className="font-bold">Qual idioma?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {idiomas.map((i) => (
                <label
                  key={i}
                  className={`cursor-pointer rounded-sm border-2 border-ink/25 px-4 py-2 font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal ${
                    idioma === i ? 'border-ink bg-ink text-paper' : 'text-ink hover:border-ink'
                  }`}
                >
                  <input type="radio" name="idioma" checked={idioma === i} onChange={() => setIdioma(i)} className="sr-only" />
                  {i}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block max-w-sm">
            <span className="font-bold">Seu nome</span>
            <input
              type="text"
              autoComplete="given-name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 w-full rounded-sm border-2 border-ink/25 bg-white px-4 py-3 text-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            />
          </label>

          <button type="submit" disabled={!ready} className="btn-teal disabled:cursor-not-allowed disabled:opacity-50">
            Fazer teste de nível
          </button>
        </form>

        <p className="mt-16 border-t border-line pt-6 text-sm text-ink/70">
          O Passaporte é uma escola fictícia: este site é um conceito criado
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
