import { useMemo, useRef, useState } from 'react'
import Reveal from './Reveal'
import Chladni from './Chladni'
import StringWave from './StringWave'
import {
  BITOLA_MAX_MM,
  BITOLA_MIN_MM,
  BITOLA_PADRAO_MM,
  ESCALA_MAX_MM,
  ESCALA_MIN_MM,
  ESCALA_PADRAO_MM,
  MADEIRAS,
} from '../data/materiais'
import { calcularFrequenciaHz, TENSAO_N, DENSIDADE_CORDA_KGM3, tocarPulso } from '../audio/karplusStrong'

export default function Laboratorio() {
  const [escalaMm, setEscalaMm] = useState(ESCALA_PADRAO_MM)
  const [bitolaMm, setBitolaMm] = useState(BITOLA_PADRAO_MM)
  const [madeiraId, setMadeiraId] = useState(MADEIRAS[1].id)
  const [tocando, setTocando] = useState(false)
  const [silenciado, setSilenciado] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const madeira = MADEIRAS.find((m) => m.id === madeiraId) ?? MADEIRAS[0]
  const frequenciaHz = useMemo(() => calcularFrequenciaHz(escalaMm, bitolaMm), [escalaMm, bitolaMm])

  function tocar() {
    if (silenciado) return
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext()
    }
    const ctx = ctxRef.current
    if (ctx.state === 'suspended') {
      void ctx.resume()
    }
    tocarPulso(ctx, frequenciaHz, madeira.amortecimento, 0.35)

    setTocando(true)
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setTocando(false), 2500)
  }

  function pararTudo() {
    setTocando(false)
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    if (ctxRef.current) {
      void ctxRef.current.suspend()
    }
  }

  return (
    <section id="laboratorio" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Reveal>
        <p className="rotulo-mono">bancada de medição</p>
        <h2 className="mt-2 font-display text-3xl sm:text-5xl">
          Mude a corda. Ouça a física mudar.
        </h2>
        <p className="mt-4 max-w-2xl text-osso/75">
          Ajuste o comprimento de escala e a bitola da corda e veja a frequência
          recalculada pela fórmula de Mersenne em tempo real. Toque pra ouvir o
          resultado sintetizado por{' '}
          <a
            href="https://ccrma.stanford.edu/~jos/pasp/Karplus_Strong_Algorithm.html"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-fosforo/50 underline-offset-2 hover:text-fosforo"
          >
            Karplus-Strong
          </a>{' '}
          — física de corda dedilhada de verdade, não uma amostra gravada.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-neblina/25 bg-painel p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span className="rotulo-mono">f = (1/2L) · √(T/μ)</span>
            <span className="font-mono text-2xl text-fosforo sm:text-3xl">
              {frequenciaHz.toFixed(1)} Hz
            </span>
          </div>

          <StringWave tocando={tocando} frequenciaHz={frequenciaHz} className="mt-6 w-full rounded-lg bg-grafite" />

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={tocar} disabled={silenciado} className="btn-fosforo disabled:cursor-not-allowed disabled:opacity-40">
              Dedilhar corda
            </button>
            <button type="button" onClick={pararTudo} className="btn-contorno">
              Silenciar
            </button>
            <button
              type="button"
              onClick={() => setSilenciado((v) => !v)}
              aria-pressed={silenciado}
              className="btn-contorno"
            >
              {silenciado ? 'Som desativado' : 'Som ativado'}
            </button>
          </div>
          <p className="mt-3 text-xs text-neblina">
            O som só toca com um clique seu — nenhum navegador libera áudio automático,
            e este site respeita isso por design.
          </p>

          <div className="mt-8 space-y-6">
            <label className="block">
              <span className="flex justify-between rotulo-mono">
                <span>Comprimento de escala (L)</span>
                <span className="valor-mono">{escalaMm} mm</span>
              </span>
              <input
                type="range"
                min={ESCALA_MIN_MM}
                max={ESCALA_MAX_MM}
                step={1}
                value={escalaMm}
                onChange={(e) => setEscalaMm(Number(e.target.value))}
                className="mt-2 w-full accent-fosforo"
              />
            </label>

            <label className="block">
              <span className="flex justify-between rotulo-mono">
                <span>Bitola da corda (diâmetro)</span>
                <span className="valor-mono">{bitolaMm.toFixed(2)} mm</span>
              </span>
              <input
                type="range"
                min={BITOLA_MIN_MM}
                max={BITOLA_MAX_MM}
                step={0.01}
                value={bitolaMm}
                onChange={(e) => setBitolaMm(Number(e.target.value))}
                className="mt-2 w-full accent-fosforo"
              />
            </label>

            <label className="block">
              <span className="rotulo-mono">Madeira do corpo (timbre/sustain)</span>
              <select
                value={madeiraId}
                onChange={(e) => setMadeiraId(e.target.value)}
                className="mt-2 w-full rounded-lg border border-neblina/30 bg-grafite px-3 py-2 text-osso"
              >
                {MADEIRAS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nome}
                  </option>
                ))}
              </select>
              <span className="mt-2 block text-sm text-osso/70">{madeira.descricao}</span>
            </label>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-neblina/20 pt-6 text-sm">
            <div>
              <dt className="rotulo-mono">Tensão T (fixa)</dt>
              <dd className="valor-mono">{TENSAO_N} N</dd>
            </div>
            <div>
              <dt className="rotulo-mono">Densidade da corda ρ</dt>
              <dd className="valor-mono">{DENSIDADE_CORDA_KGM3} kg/m³</dd>
            </div>
            <div>
              <dt className="rotulo-mono">Densidade da madeira</dt>
              <dd className="valor-mono">{madeira.densidadeKgM3} kg/m³</dd>
            </div>
            <div>
              <dt className="rotulo-mono">Amortecimento (KS)</dt>
              <dd className="valor-mono">{madeira.amortecimento.toFixed(4)}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-neblina/25 bg-painel p-6 sm:p-8">
          <p className="rotulo-mono">figura de chladni — linhas nodais</p>
          <p className="mt-2 text-sm text-osso/70">
            Padrão de placa vibrante recalculado a partir dos modos derivados da
            frequência atual — a mesma lógica das figuras de areia de Chladni,
            desenhada como curvas de nível topográficas.
          </p>
          <Chladni frequenciaHz={frequenciaHz} className="mt-4 aspect-square w-full rounded-lg" />
        </div>
      </Reveal>
    </section>
  )
}
