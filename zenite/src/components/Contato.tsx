import { useState } from 'react'
import { sendToWhatsApp } from '../demo'
import { sessoes } from '../data/sessoes'

export default function Contato() {
  const [nome, setNome] = useState('')
  const [sessao, setSessao] = useState(sessoes[0].nome)
  const [data, setData] = useState('')

  const enviar = () => {
    const msg = `Olá! Sou ${nome || '[nome]'} e quero reservar: ${sessao}${data ? ` para ${data}` : ''}`
    sendToWhatsApp(msg)
  }

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-xl">
        <h2 className="font-display text-3xl sm:text-4xl">Agende sua sessão</h2>
        <p className="mt-3 text-neblina">Conte a sessão de interesse e a data — confirmamos pelo WhatsApp.</p>

        <div className="mt-8 flex flex-col gap-4">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            className="rounded-xl border border-latao-fundo bg-cupula px-4 py-3 text-marfim outline-none placeholder:text-neblina focus-visible:border-fosforo"
          />
          <select
            value={sessao}
            onChange={(e) => setSessao(e.target.value)}
            className="rounded-xl border border-latao-fundo bg-cupula px-4 py-3 text-marfim outline-none focus-visible:border-fosforo"
          >
            {sessoes.map((s) => (
              <option key={s.slug} value={s.nome}>
                {s.nome}
              </option>
            ))}
          </select>
          <input
            value={data}
            onChange={(e) => setData(e.target.value)}
            type="date"
            className="rounded-xl border border-latao-fundo bg-cupula px-4 py-3 text-marfim outline-none placeholder:text-neblina focus-visible:border-fosforo"
          />
          <button type="button" onClick={enviar} className="btn-fosforo self-start">
            Enviar pelo WhatsApp
          </button>
        </div>

        <p className="mt-14 text-sm text-neblina/80">
          feito com <span aria-hidden="true" className="text-fosforo">♥</span>
          <span className="sr-only">amor</span> por{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-latao-fundo underline-offset-4 transition-colors hover:text-marfim"
          >
            madolio
          </a>
        </p>
      </div>
    </section>
  )
}
