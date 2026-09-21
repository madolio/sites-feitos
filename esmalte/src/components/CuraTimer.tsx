import { useEffect, useMemo, useState } from 'react'
import { tecnicas, lampadas, type TipoLampada } from '../data/tecnicas'
import Reveal from './Reveal'

function formatarSegundos(s: number) {
  const min = Math.floor(s / 60)
  const seg = s % 60
  if (min === 0) return `${seg}s`
  return `${min}min ${String(seg).padStart(2, '0')}s`
}

export default function CuraTimer() {
  const [tecnicaId, setTecnicaId] = useState(tecnicas[1].id) // gel, o mais didático
  const [lampada, setLampada] = useState<TipoLampada>('led')
  const [segundosRestantes, setSegundosRestantes] = useState(0)
  const [rodando, setRodando] = useState(false)

  const tecnica = useMemo(() => tecnicas.find((t) => t.id === tecnicaId)!, [tecnicaId])

  const totalSegundos = useMemo(() => {
    if (tecnica.usaLampada && tecnica.segundosPorCamada) {
      return tecnica.segundosPorCamada[lampada] * tecnica.camadas
    }
    // técnicas sem lâmpada: usa o topo da faixa de secagem ao ar, em segundos
    return (tecnica.secagemArMin?.[1] ?? 0) * 60
  }, [tecnica, lampada])

  useEffect(() => {
    setSegundosRestantes(totalSegundos)
    setRodando(false)
  }, [totalSegundos])

  useEffect(() => {
    if (!rodando || segundosRestantes <= 0) return
    const mm = window.matchMedia('(prefers-reduced-motion: no-preference)')
    if (!mm.matches) {
      setSegundosRestantes(0)
      setRodando(false)
      return
    }
    const id = window.setInterval(() => {
      setSegundosRestantes((s) => {
        if (s <= 1) {
          window.clearInterval(id)
          setRodando(false)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [rodando, segundosRestantes])

  function iniciar() {
    setSegundosRestantes(totalSegundos)
    setRodando(true)
  }

  const progresso = totalSegundos > 0 ? 1 - segundosRestantes / totalSegundos : 1

  return (
    <section id="cura" className="border-b border-linha bg-marfim px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="rotulo-mono">O cronômetro real da cabine</p>
          <h2 className="mt-2 text-4xl">Quanto tempo cada técnica leva pra curar</h2>
          <p className="mt-4 max-w-2xl text-tinta/75">
            Escolha a técnica e, se ela usar lâmpada, o tipo de lâmpada. O cronômetro abaixo usa o
            tempo de cura real por camada de cada uma, o mesmo número que a Renata cronometra na
            cabine todo dia.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2" as="div">
          {tecnicas.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTecnicaId(t.id)}
              aria-pressed={t.id === tecnicaId}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                t.id === tecnicaId
                  ? 'border-uv bg-uv text-marfim'
                  : 'border-tinta/25 text-tinta/80 hover:border-uv hover:text-uv'
              }`}
            >
              {t.nome}
            </button>
          ))}
        </Reveal>

        {tecnica.usaLampada && (
          <Reveal delay={0.15} className="mt-4 flex flex-wrap gap-2" as="div">
            {(Object.keys(lampadas) as TipoLampada[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setLampada(key)}
                aria-pressed={key === lampada}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                  key === lampada
                    ? 'border-coral bg-coral text-tinta'
                    : 'border-tinta/25 text-tinta/70 hover:border-coral hover:text-coral-hover'
                }`}
              >
                {lampadas[key].nome} · {lampadas[key].nm}
              </button>
            ))}
          </Reveal>
        )}

        <Reveal delay={0.2} className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto]" as="div">
          <div className="rounded-2xl border border-linha bg-white p-6">
            <p className="text-sm text-tinta/70">{tecnica.resumo}</p>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="rotulo-mono">Camadas</dt>
                <dd className="mt-1">{tecnica.camadasDetalhe}</dd>
              </div>
              <div>
                <dt className="rotulo-mono">Cura</dt>
                <dd className="mt-1">{tecnica.curaTotalDetalhe}</dd>
              </div>
              <div>
                <dt className="rotulo-mono">Durabilidade</dt>
                <dd className="mt-1 valor-mono">
                  {tecnica.durabilidadeSemanas[0] === tecnica.durabilidadeSemanas[1]
                    ? `~${tecnica.durabilidadeSemanas[0]} semana`
                    : `${tecnica.durabilidadeSemanas[0]}–${tecnica.durabilidadeSemanas[1]} semanas`}
                </dd>
              </div>
              <div>
                <dt className="rotulo-mono">Remoção</dt>
                <dd className="mt-1">{tecnica.removeDetalhe}</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-uv/30 bg-tinta px-8 py-6 text-marfim">
            <p className="rotulo-mono text-marfim/60">
              {tecnica.usaLampada ? `tempo total na ${lampadas[lampada].nome.toLowerCase()}` : 'tempo de secagem ao ar'}
            </p>
            <p className="font-mono text-4xl text-uv tabular-nums" aria-live="polite">
              {formatarSegundos(segundosRestantes)}
            </p>
            <div className="h-1.5 w-40 overflow-hidden rounded-full bg-marfim/15">
              <div
                className="h-full rounded-full bg-coral transition-[width]"
                style={{ width: `${Math.round(progresso * 100)}%` }}
              />
            </div>
            <button type="button" onClick={iniciar} disabled={rodando} className="btn-coral mt-2 disabled:opacity-50">
              {rodando ? 'Curando…' : 'Simular cronômetro'}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
