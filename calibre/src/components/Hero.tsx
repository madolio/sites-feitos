import { sendToWhatsApp } from '../demo'
import RelogioNav from './RelogioNav'

// Rework total: a cena 3D do calibre montando (e o gesto de girar a coroa)
// saíram por completo — a pedido do usuário, que não gostou da ideia do
// mecanismo em 3D. No lugar, o mostrador é literal: um relógio analógico
// de verdade, com hora certa, onde os números 12/4/8 são a navegação
// (ver RelogioNav.tsx). Continua sendo sobre "o relógio à vista", só que
// agora é o relógio de verdade funcionando, não uma peça desmontada.
export default function Hero() {
  return (
    <section id="inicio" className="border-b border-line px-6 pt-28 pb-20 sm:px-10 md:pt-36 md:pb-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
        <div>
          <h1 className="font-heading text-5xl leading-[1.05] font-medium text-cream sm:text-6xl">
            O relógio certo, à vista
          </h1>
          <p className="mt-5 max-w-md text-lg text-cream/75">
            Relojoaria artesanal em Campinas (SP). Cada calibre é montado à
            mão, peça por peça — e o mostrador ao lado está correndo no
            horário real agora mesmo.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => sendToWhatsApp('Olá! Quero conversar sobre um relógio sob encomenda com a Calibre.')}
              className="btn-primary"
            >
              Encomendar um relógio
            </button>
          </div>
          <p className="mt-4 text-xs text-cream/55">
            Os números 12, 4 e 8 do mostrador levam pras seções da página.
          </p>
        </div>

        <RelogioNav />
      </div>
    </section>
  )
}
