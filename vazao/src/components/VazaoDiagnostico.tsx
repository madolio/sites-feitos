import { useState } from 'react'
import Reveal from './Reveal'
import { vazoes } from '../data/fixtures'

const ESCALA_MAX = 20 // L/min, teto da barra visual (mangueira de jardim é a maior faixa)

export default function VazaoDiagnostico() {
  const [selecionadoId, setSelecionadoId] = useState(vazoes[0].id)
  const selecionado = vazoes.find((v) => v.id === selecionadoId) ?? vazoes[0]

  const percentBaixa = Math.min(100, (selecionado.faixaBaixa / ESCALA_MAX) * 100)
  const percentAlta = Math.min(100, (selecionado.faixaAlta / ESCALA_MAX) * 100)

  return (
    <section id="diagnostico" className="border-b border-linha bg-papel-forte/60">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <Reveal>
          <p className="dado-vazao text-fluxo">o mecanismo</p>
          <h2 className="mt-2 max-w-lg text-3xl sm:text-4xl">Diagnóstico de vazão: sua torneira está normal?</h2>
          <p className="mt-3 max-w-xl text-tinta/75">
            Cada ponto de uso da casa tem uma faixa de vazão típica. Muito abaixo dela costuma ser
            entupimento ou registro fechado demais. Muito acima, junto com conta de água alta sem
            explicação, é indício de vazamento. Escolha um ponto pra comparar.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 grid gap-8 lg:grid-cols-[220px_1fr]">
          <div role="tablist" aria-label="Ponto de uso" className="flex flex-col gap-2">
            {vazoes.map((v) => {
              const ativo = v.id === selecionadoId
              return (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={ativo}
                  onClick={() => setSelecionadoId(v.id)}
                  className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                    ativo
                      ? 'border-fluxo bg-fluxo text-papel'
                      : 'border-linha bg-papel text-tinta hover:border-fluxo/60'
                  }`}
                >
                  {v.nome}
                </button>
              )
            })}
          </div>

          <div className="rounded-xl border border-linha bg-papel p-6 sm:p-8">
            <h3 className="text-2xl">{selecionado.nome}</h3>
            <p className="mt-2 text-tinta/70">{selecionado.contexto}</p>

            <div className="mt-6">
              <p className="dado-vazao text-tinta/50">
                faixa de referência · {selecionado.faixaBaixa} a {selecionado.faixaAlta}{' '}
                {selecionado.unidade}
              </p>
              <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-linha/60" aria-hidden="true">
                <div
                  className="h-full rounded-full bg-fluxo"
                  style={{
                    marginLeft: `${percentBaixa}%`,
                    width: `${Math.max(4, percentAlta - percentBaixa)}%`,
                  }}
                />
              </div>
            </div>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-linha p-4">
                <dt className="dado-vazao text-atencao">bem abaixo da faixa</dt>
                <dd className="mt-1 text-sm text-tinta/75">
                  Fluxo fraco ou intermitente. Costuma ser entupimento parcial, arejador sujo ou
                  registro regulador fechado demais.
                </dd>
              </div>
              <div className="rounded-lg border border-linha p-4">
                <dt className="dado-vazao text-fluxo">dentro da faixa</dt>
                <dd className="mt-1 text-sm text-tinta/75">Vazão normal pra esse ponto de uso, sem sinal de problema.</dd>
              </div>
              <div className="rounded-lg border border-linha p-4">
                <dt className="dado-vazao text-vazamento">bem acima da faixa</dt>
                <dd className="mt-1 text-sm text-tinta/75">
                  Se vier junto com conta de água alta sem motivo (mais gente em casa, piscina
                  enchendo), vale investigar vazamento antes da torneira, na tubulação.
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
