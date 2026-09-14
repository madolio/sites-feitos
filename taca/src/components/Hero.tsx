import { useRef } from 'react'
import { taca } from '../estado'
import { sendToWhatsApp } from '../demo'
import Vitrine from '../cena/Vitrine'

// A interação inteira do hero é arrastar a taça pros lados — não tem
// nenhuma animação automática além da cena respirar sozinha (a luz e o céu
// já bastam de "movimento não pedido"; o vinho só se mexe quando alguém
// mexe nele).
export default function Hero() {
  const ultimoX = useRef<number | null>(null)
  const ultimoT = useRef(0)

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    taca.arrastando = true
    ultimoX.current = e.clientX
    ultimoT.current = performance.now()
  }

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!taca.arrastando || ultimoX.current === null) return
    const agora = performance.now()
    const dt = Math.max(0.001, (agora - ultimoT.current) / 1000)
    const dx = e.clientX - ultimoX.current
    const dAngulo = dx * 0.012
    taca.angulo += dAngulo
    taca.velocidade = dAngulo / dt
    ultimoX.current = e.clientX
    ultimoT.current = agora
  }

  const onUp = () => {
    taca.arrastando = false
    ultimoX.current = null
  }

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-dusk">
      <div
        className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <Vitrine />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dusk via-dusk/5 to-transparent" />

      <div className="pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-between px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex items-center justify-between">
          <span className="font-heading text-xl font-medium text-parchment">Taça</span>
          <nav className="pointer-events-auto flex gap-6 text-sm text-parchment/80">
            <a href="#rotulos" className="transition-colors hover:text-parchment">
              Rótulos
            </a>
            <a href="#processo" className="hidden transition-colors hover:text-parchment sm:inline">
              Como nasce
            </a>
            <a href="#contato" className="transition-colors hover:text-parchment">
              Visitar
            </a>
          </nav>
        </div>

        <div className="max-w-lg">
          <h1 className="font-heading text-5xl leading-[1.05] font-medium text-parchment sm:text-6xl">
            Gire a taça. O vinho gira de verdade.
          </h1>
          <p className="mt-5 max-w-md text-lg text-parchment/80">
            Vinícola de altitude na Serra Catarinense. Arraste a taça pro lado
            e solte — o giro, a demora do vinho pra acompanhar e as lágrimas
            na parede depois são física, não são vídeo.
          </p>
          <div className="pointer-events-auto mt-8">
            <button
              type="button"
              onClick={() => sendToWhatsApp('Olá! Quero agendar uma visita com degustação na Taça.')}
              className="btn-primary"
            >
              Agendar uma degustação
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
