import { sendToWhatsApp } from '../demo'

export default function Hero() {
  return (
    <header className="relative overflow-hidden px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="rotulo-mono">Meridiana Odontologia · Curitiba, PR</p>
          <h1 className="mt-3 text-5xl leading-[1.05] sm:text-6xl">
            Sua arcada tem 32 dentes. Cada um pede um cuidado diferente.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-tinta/75">
            Em vez de listar serviços genéricos, montamos um mapa clicável da sua arcada
            dentária — incisivos, caninos, pré-molares, molares e sisos, cada um com a
            notação real (FDI) e os procedimentos que fazem sentido pra ele. Explore antes
            de marcar a consulta.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#arcada" className="btn-esmalte">
              Explorar o mapa da arcada
            </a>
            <button
              type="button"
              onClick={() =>
                sendToWhatsApp(
                  'Olá! Quero agendar uma avaliação na Meridiana Odontologia.',
                )
              }
              className="btn-contorno"
            >
              Agendar avaliação
            </button>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm" aria-hidden="true">
          <div className="meridiana-anel absolute inset-0 rounded-full border border-contorno/40" />
          <div className="meridiana-anel meridiana-anel-2 absolute inset-6 rounded-full border border-esmalte/30" />
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
            <g stroke="var(--color-contorno)" strokeWidth="0.75" fill="none" opacity="0.55">
              <ellipse cx="100" cy="100" rx="92" ry="40" />
              <ellipse cx="100" cy="100" rx="92" ry="65" />
              <ellipse cx="100" cy="100" rx="92" ry="92" transform="rotate(0 100 100)" />
              <line x1="100" y1="8" x2="100" y2="192" />
              <line x1="8" y1="100" x2="192" y2="100" />
            </g>
            <circle cx="100" cy="100" r="4" fill="var(--color-esmalte)" className="meridiana-ponto" />
          </svg>
        </div>
      </div>
    </header>
  )
}
