import { useEffect, useRef } from 'react'
import { sendToWhatsApp } from '../demo'

// Paralaxe simples e barata: a imagem de fundo se move mais lento que o
// scroll (transform, sem reflow), só enquanto está na viewport — nada de
// libs pesadas pra um efeito cinematográfico de hero automotivo.
export function Hero() {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduzido) return

    let raf = 0
    function tick() {
      const el = imgRef.current
      if (el) {
        const y = Math.min(window.scrollY * 0.35, 220)
        el.style.transform = `translate3d(0, ${y}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-preto">
      <div ref={imgRef} className="absolute inset-0 -top-16 h-[calc(100%+8rem)] w-full">
        <img src="/carros/hero.jpg" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-preto via-preto/50 to-preto/10" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-20">
        <p className="font-mono text-sm tracking-widest text-acento uppercase">Concessionária de esportivos</p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-tight text-marfim sm:text-6xl">
          Cada carro daqui já foi feito pra ser dirigido rápido.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-marfim/70">
          Estoque selecionado, ficha técnica real de cada unidade e um simulador de financiamento que calcula a
          parcela de verdade — não uma estimativa solta.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#estoque" className="btn-acento">
            Ver estoque
          </a>
          <button
            type="button"
            onClick={() => sendToWhatsApp('Olá! Quero agendar um test-drive.')}
            className="btn-contorno"
          >
            Agendar test-drive
          </button>
        </div>
      </div>
    </section>
  )
}
