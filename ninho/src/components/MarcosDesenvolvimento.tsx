import { useState } from 'react'
import Reveal from './Reveal'
import { faixas, dominioLabel, type Dominio } from '../data/faixas'

const dominios: Dominio[] = ['motor', 'linguagem', 'social', 'cognitivo']

export default function MarcosDesenvolvimento() {
  const [faixaAtiva, setFaixaAtiva] = useState(0)
  const [dominioAtivo, setDominioAtivo] = useState<Dominio>('motor')

  const faixa = faixas[faixaAtiva]

  return (
    <section id="marcos" className="border-b border-linha bg-papel py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-broto">o que a turma está aprendendo</p>
          <h2 className="mt-2 max-w-2xl text-3xl sm:text-4xl">
            Marcos de desenvolvimento por faixa etária, não brincadeira solta
          </h2>
          <p className="mt-4 max-w-xl text-tinta/75">
            A mesma divisão de faixa etária usada na Educação Infantil brasileira: bebês, crianças
            bem pequenas e crianças pequenas. Cada faixa trabalha marcos reais de desenvolvimento,
            não uma atividade qualquer escolhida ao acaso.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <div role="tablist" aria-label="Faixa etária" className="flex flex-wrap gap-2">
            {faixas.map((f, i) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                id={`faixa-tab-${f.id}`}
                aria-selected={faixaAtiva === i}
                aria-controls={`faixa-painel-${f.id}`}
                onClick={() => setFaixaAtiva(i)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  faixaAtiva === i
                    ? 'border-broto bg-broto text-papel'
                    : 'border-linha text-tinta/70 hover:border-broto'
                }`}
              >
                {f.nome}
                <span className="ml-2 font-dado text-[0.7rem] opacity-70">{f.idade}</span>
              </button>
            ))}
          </div>

          <div
            id={`faixa-painel-${faixa.id}`}
            role="tabpanel"
            aria-labelledby={`faixa-tab-${faixa.id}`}
            className="mt-8 rounded-2xl border border-linha bg-papel-forte p-6 sm:p-8"
          >
            <p className="text-tinta/80">{faixa.resumo}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {dominios.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDominioAtivo(d)}
                  aria-pressed={dominioAtivo === d}
                  className={`cartao-marco rounded-lg border px-3 py-2 text-sm font-semibold ${
                    dominioAtivo === d
                      ? 'border-ninho bg-ninho text-papel'
                      : 'border-linha bg-papel text-tinta/70 hover:border-ninho'
                  }`}
                >
                  {dominioLabel[d]}
                </button>
              ))}
            </div>

            <ul className="mt-6 space-y-3">
              {faixa.marcos[dominioAtivo].map((marco) => (
                <li key={marco} className="flex gap-3 text-tinta/85">
                  <span aria-hidden="true" className="mt-1 text-broto">
                    •
                  </span>
                  {marco}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
