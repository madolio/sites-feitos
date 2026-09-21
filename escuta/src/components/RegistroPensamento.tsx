import { useState } from 'react'
import Reveal from './Reveal'
import { casos, etapasFicha } from '../data/casos'

export default function RegistroPensamento() {
  const [casoId, setCasoId] = useState(casos[0].id)
  const [etapa, setEtapa] = useState(0)

  const caso = casos.find((c) => c.id === casoId) ?? casos[0]

  function escolherCaso(id: string) {
    setCasoId(id)
    setEtapa(0)
  }

  const valoresEtapa = [caso.situacao, caso.pensamento, `${caso.emocao} (${caso.intensidade}/100)`, caso.reformulacao]

  return (
    <section id="ficha" className="border-b border-linha py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-quieto">como funciona, na prática</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">
            A ficha de registro de pensamento: veja o exercício por dentro
          </h2>
          <p className="mt-4 max-w-xl text-tinta/75">
            É um instrumento real da terapia cognitivo-comportamental: separar o fato, o pensamento
            automático, a emoção que ele gera e uma leitura mais equilibrada, construída junto em
            sessão. Os quatro exemplos abaixo são ilustrativos, não é um teste nem uma avaliação de
            quem está lendo, e nada aqui substitui uma sessão de verdade.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <div role="tablist" aria-label="Escolher exemplo" className="flex flex-wrap gap-2">
            {casos.map((c) => (
              <button
                key={c.id}
                role="tab"
                type="button"
                aria-selected={c.id === casoId}
                onClick={() => escolherCaso(c.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  c.id === casoId
                    ? 'border-acolhe bg-acolhe text-papel'
                    : 'border-linha bg-papel text-tinta/70 hover:border-acolhe/50'
                }`}
              >
                {c.tema}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-[220px_1fr]">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col">
              {etapasFicha.map((e, i) => (
                <button
                  key={e.rotulo}
                  type="button"
                  aria-current={i === etapa}
                  onClick={() => setEtapa(i)}
                  className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                    i === etapa
                      ? 'border-acolhe bg-papel-forte'
                      : 'border-linha bg-papel text-tinta/60 hover:border-acolhe/40'
                  }`}
                >
                  <span className="dado-ficha block text-quieto">{`0${i + 1}`}</span>
                  <span className="mt-1 block font-semibold">{e.rotulo}</span>
                </button>
              ))}
            </div>

            <div
              key={`${casoId}-${etapa}`}
              className="cartao-registro rounded-xl border-2 border-tinta bg-papel-forte p-6 sm:p-8"
            >
              <p className="dado-ficha text-quieto">{etapasFicha[etapa].rotulo}</p>
              <p className="mt-3 text-xl leading-relaxed sm:text-2xl">{valoresEtapa[etapa]}</p>
              <p className="mt-5 text-sm text-tinta/60">{etapasFicha[etapa].texto}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
