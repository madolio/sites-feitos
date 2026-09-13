import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import type { Etapa } from './cena/Atelie'
import DemoDialog from './components/DemoDialog'
import Painel from './components/Painel'
import Turmas from './components/Turmas'
import { esmaltes } from './data'
import { forno, peca } from './estado'
import { useLateral } from './lateral'

// A cena 3D (three + postprocessing) é o pedaço pesado do bundle — carrega
// separada, com o barro "preparando" no lugar enquanto isso.
const Atelie = lazy(() => import('./cena/Atelie'))

const PE = 0.09

export default function App() {
  const [etapa, setEtapa] = useState<Etapa>('moldar')
  const [esmalte, setEsmalte] = useState(esmaltes[0])
  const [turmasAberto, setTurmasAberto] = useState(false)
  const dicaRef = useRef<HTMLDivElement>(null)
  const tituloRef = useRef<HTMLDivElement>(null)
  const queima = useRef<gsap.core.Timeline | null>(null)

  // O estúdio escurece com o calor do forno (não com a etapa em si — no
  // começo e no fim da queima o fundo ainda está claro), então o título
  // acompanha o mesmo valor, quadro a quadro.
  useEffect(() => {
    const el = tituloRef.current
    if (!el) return
    if (etapa !== 'queimando') {
      el.style.color = ''
      return
    }
    let raf = 0
    const tick = () => {
      el.style.color = forno.calor > 0.45 ? 'var(--color-folha)' : ''
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [etapa])

  // A cor de destaque da interface inteira é o esmalte escolhido.
  useEffect(() => {
    const root = document.documentElement.style
    root.setProperty('--color-glaze', esmalte.cor)
    root.setProperty('--color-on-glaze', esmalte.onCor)
  }, [esmalte])

  useEffect(() => () => void queima.current?.kill(), [])

  const irPara = (e: Etapa) => {
    queima.current?.kill()
    forno.frente = PE
    forno.calor = 0
    forno.temperatura = 20
    setEtapa(e)
  }

  const queimar = () => {
    irPara('queimando')
    const topo = peca.altura + 0.15
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tl = gsap.timeline({ onComplete: () => setEtapa('pronta') })
    if (reduzido) {
      tl.to(forno, { frente: topo, temperatura: 1250, duration: 0.6, ease: 'none' })
    } else {
      tl.to(forno, { temperatura: 1250, duration: 2.8, ease: 'power1.in' }, 0)
        .to(forno, { calor: 1, duration: 2.3, ease: 'power2.in' }, 0)
        .to(forno, { frente: topo, duration: 2.4, ease: 'power2.inOut' }, 0.7)
        .to(forno, { calor: 0, duration: 1.4, ease: 'power2.out' }, 3.1)
    }
    queima.current = tl
  }

  return (
    <div className="relative h-svh w-full overflow-hidden select-none">
      <div className="absolute inset-0">
        <Suspense fallback={<Preparando />}>
          <Atelie etapa={etapa} esmalte={esmalte} dicaRef={dicaRef} />
        </Suspense>
      </div>

      <div
        ref={dicaRef}
        aria-hidden="true"
        className="pointer-events-none absolute opacity-0 transition-opacity duration-500"
        style={{ left: '-100px', top: '-100px' }}
      >
        <div className="dedo -translate-x-1/2 -translate-y-1/2">
          <span className="block h-9 w-9 rounded-full border-2 border-ink/70 bg-folha/70" />
        </div>
      </div>

      <header className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
        <div ref={tituloRef} className="text-ink transition-colors duration-500">
          <h1 className="text-3xl leading-none">Torno</h1>
          <p className="mt-1 text-sm opacity-70">ateliê de cerâmica</p>
        </div>
        <button
          type="button"
          onClick={() => setTurmasAberto(true)}
          className="pointer-events-auto rounded-full border border-ink/25 bg-folha px-4 py-2 text-sm font-semibold hover:border-ink"
        >
          Turmas
        </button>
      </header>

      <Painel etapa={etapa} esmalte={esmalte} onEsmalte={setEsmalte} onEtapa={irPara} onQueimar={queimar} />

      <Turmas aberto={turmasAberto} onFechar={() => setTurmasAberto(false)} />
      <DemoDialog />
    </div>
  )
}

function Preparando() {
  const lateral = useLateral()
  return (
    <div className={`flex h-full items-center justify-center ${lateral ? 'pr-[24rem]' : ''}`}>
      <div className={`flex flex-col items-center gap-4 ${lateral ? '' : 'pb-[50svh]'}`}>
        <span className="h-20 w-20 animate-pulse rounded-full bg-barro/60" />
        <p className="text-sm text-ink/60">Preparando o barro…</p>
      </div>
    </div>
  )
}
