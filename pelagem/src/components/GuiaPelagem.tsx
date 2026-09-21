import { useState } from 'react'
import Reveal from './Reveal'
import { pelagens, etapasGuia } from '../data/pelagens'

export default function GuiaPelagem() {
  const [pelagemId, setPelagemId] = useState(pelagens[0].id)
  const [etapa, setEtapa] = useState(0)

  const pelagem = pelagens.find((p) => p.id === pelagemId) ?? pelagens[0]

  function escolherPelagem(id: string) {
    setPelagemId(id)
    setEtapa(0)
  }

  const valoresEtapa = [pelagem.escovacao, pelagem.banho, pelagem.tosa, pelagem.cuidadoEspecial]

  return (
    <section id="guia" className="border-b border-linha py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-agua">qual é o pelo do seu pet</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Guia de pelagem: veja o cuidado certo pro seu</h2>
          <p className="mt-4 max-w-xl text-tinta/75">
            Pelagem curta, dupla, crespa e áspera não se cuidam do mesmo jeito: a frequência de
            escovação, o intervalo entre banhos e até a técnica de tosa mudam de verdade. Escolha o
            tipo mais parecido com o do seu pet.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <div role="tablist" aria-label="Escolher tipo de pelagem" className="flex flex-wrap gap-2">
            {pelagens.map((p) => (
              <button
                key={p.id}
                role="tab"
                type="button"
                aria-selected={p.id === pelagemId}
                onClick={() => escolherPelagem(p.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  p.id === pelagemId
                    ? 'border-pelo bg-pelo text-papel'
                    : 'border-linha bg-papel text-tinta/70 hover:border-pelo/50'
                }`}
              >
                {p.nome}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-tinta/60">
            Exemplos de raça: <span className="font-semibold text-tinta/80">{pelagem.exemplo}</span>
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-[220px_1fr]">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col">
              {etapasGuia.map((e, i) => (
                <button
                  key={e.rotulo}
                  type="button"
                  aria-current={i === etapa}
                  onClick={() => setEtapa(i)}
                  className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                    i === etapa
                      ? 'border-pelo bg-papel-forte'
                      : 'border-linha bg-papel text-tinta/60 hover:border-pelo/40'
                  }`}
                >
                  <span className="dado-ficha block text-agua">{`0${i + 1}`}</span>
                  <span className="mt-1 block font-semibold">{e.rotulo}</span>
                </button>
              ))}
            </div>

            <div
              key={`${pelagemId}-${etapa}`}
              className="cartao-pelagem rounded-xl border-2 border-tinta bg-papel-forte p-6 sm:p-8"
            >
              <p className="dado-ficha text-agua">{etapasGuia[etapa].rotulo}</p>
              <p className="mt-3 text-xl leading-relaxed sm:text-2xl">{valoresEtapa[etapa]}</p>
              <p className="mt-5 text-sm text-tinta/60">{etapasGuia[etapa].texto}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
