import { useEffect, useState } from 'react'
import { blips } from '../data'
import RadarScreen, { kindColor } from './RadarScreen'

// Antes: hero em duas colunas (manchete de um lado, radar do outro) — igual
// à fórmula de qualquer landing page de SaaS. Agora a tela de radar preenche
// o hero inteiro, como se você já estivesse olhando pro produto ligado, e o
// texto flutua centralizado por cima — reforça a ideia de "instrumento",
// não "site institucional com screenshot ao lado".
export default function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % blips.length), 2600)
    return () => window.clearInterval(id)
  }, [])

  const current = blips[active]

  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden pt-16 lg:pt-0">
      <div className="absolute inset-0 overflow-hidden bg-deck" aria-hidden="true">
        <RadarScreen
          active={active}
          className="absolute top-1/2 left-1/2 aspect-square w-[130vmax] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-80 sm:w-[95vmax] lg:w-[80vmax]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-deck via-deck/60 to-deck/10" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 py-24 text-center sm:px-6">
        <h1 className="text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl lg:text-7xl">
          A agenda do seu negócio, num instrumento só.
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-ink-dim">
          A Torre reúne agendamentos de qualquer canal numa tela só, confirma
          sozinha por WhatsApp e avisa quando algo precisa de atenção — como
          um radar de verdade.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#planos" className="btn-amber">
            Testar 14 dias grátis
          </a>
          <a href="#produto" className="btn-line bg-deck/60 backdrop-blur">
            Ver como funciona
          </a>
        </div>

        <div aria-live="polite" className="panel mono mx-auto mt-14 max-w-md bg-panel/80 px-5 py-4 text-left text-sm backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <span style={{ color: kindColor[current.kind] }} className="font-semibold uppercase">
              {current.kind === 'novo' ? 'novo' : current.kind === 'risco' ? 'confirmar' : 'confirmado'}
            </span>
            <span className="text-ink-dim">{current.time}</span>
          </div>
          <p className="mt-1.5 text-ink">{current.label}</p>
        </div>

        <dl className="mono mx-auto mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-line/70 pt-6 text-sm">
          <div>
            <dt className="text-2xl text-ink">340+</dt>
            <dd className="mt-1 text-ink-dim">negócios na torre</dd>
          </div>
          <div>
            <dt className="text-2xl text-ink">28%</dt>
            <dd className="mt-1 text-ink-dim">menos faltas</dd>
          </div>
          <div>
            <dt className="text-2xl text-ink">99.9%</dt>
            <dd className="mt-1 text-ink-dim">disponibilidade</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
