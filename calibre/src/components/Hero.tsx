import { useEffect } from 'react'
import gsap from 'gsap'
import { montagem } from '../estado'
import { sendToWhatsApp } from '../demo'
import Vitrine from '../cena/Vitrine'
import Coroa from './Coroa'
import ReservaMarcha from './ReservaMarcha'

// Único movimento não pedido pelo visitante: ao entrar, as peças do calibre
// (explodidas por padrão) se juntam sozinhas, uma vez, num timeline de 2.4s.
// Depois disso o mecanismo só se move em resposta ao que a pessoa faz — girar
// a coroa (Coroa.tsx) e assistir a reserva de marcha subir (ReservaMarcha.tsx).
export default function Hero() {
  useEffect(() => {
    const reduzida = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduzida) {
      montagem.progresso = 1
      return
    }
    const tw = gsap.to(montagem, { progresso: 1, duration: 2.4, delay: 0.5, ease: 'power2.inOut' })
    return () => {
      tw.kill()
    }
  }, [])

  return (
    <section className="relative min-h-[100svh] overflow-hidden border-b border-line">
      <div className="absolute inset-0">
        <Vitrine />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-12 sm:px-10 sm:pb-16">
        <div className="max-w-lg">
          <h1 className="font-heading text-5xl leading-[1.05] font-medium text-cream sm:text-6xl">
            O mecanismo por trás do relógio, à vista
          </h1>
          <p className="mt-5 max-w-md text-lg text-cream/75">
            Relojoaria artesanal em Campinas (SP). Cada calibre é montado à
            mão, peça por peça — e o site mostra exatamente como, em vez de
            só fotografar o resultado.
          </p>

          <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => sendToWhatsApp('Olá! Quero conversar sobre um relógio sob encomenda com a Calibre.')}
              className="btn-primary"
            >
              Encomendar um relógio
            </button>
            <div className="flex items-center gap-4">
              <Coroa />
              <ReservaMarcha />
            </div>
          </div>
          <p className="pointer-events-none mt-3 text-xs text-cream/60">Gire a coroa pra dar corda no mecanismo acima.</p>
        </div>
      </div>
    </section>
  )
}
