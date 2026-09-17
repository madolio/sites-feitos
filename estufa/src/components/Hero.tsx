import Reveal from './Reveal'
import { sendToWhatsApp } from '../demo'

// Abundância como estrutura, não decoração: a estufa cheia de verdade,
// silhuetas de folhagem densa preenchendo o hero de ponta a ponta (não uma
// planta única centralizada no vazio), atrás das grades de vidro do teto.
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-mata text-vidro">
      <img
        src="/especies/strelitzia.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <GrandeEstufa className="pointer-events-none absolute inset-0 h-full w-full opacity-70 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-mata via-mata/60 to-mata/20" />
      <div className="absolute inset-0 bg-mata/25" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-5xl flex-col justify-end px-6 pt-24 pb-16 sm:px-8">
        <Reveal as="p" className="dado-ficha text-vidro/60">
          Floricultura &amp; paisagismo — Nova Friburgo, RJ
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-3 max-w-2xl text-5xl leading-[1.05] sm:text-6xl">
            Cada arranjo começa numa espécie de verdade.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-lg text-vidro/85">
            A Estufa Cheia trabalha com nome científico, estação de floração e
            exigência de luz reais — como um catálogo botânico, não uma
            vitrine de flores genéricas. Cultivo próprio, projeto de
            paisagismo e encomendas sob medida.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              sendToWhatsApp('Olá! Quero encomendar um arranjo ou um projeto de paisagismo com a Estufa Cheia.')
            }
            className="btn-terracota"
          >
            Fazer encomenda
          </button>
          <a href="#especies" className="btn-outline border-vidro/40 text-vidro hover:border-vidro">
            Ver espécies do catálogo
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function GrandeEstufa({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <defs>
        <pattern id="vidraca" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M0 0H80V80" fill="none" stroke="#f3efe1" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="1200" height="800" fill="url(#vidraca)" />

      {/* Arcos de estrutura da estufa, sugerindo o teto de vidro visto de dentro */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${i * 260 - 40} 260 Q${i * 260 + 90} -20 ${i * 260 + 220} 260`}
          fill="none"
          stroke="#f3efe1"
          strokeOpacity="0.14"
          strokeWidth="3"
        />
      ))}

      {/* Densidade de folhagem preenchendo a base do hero — silhuetas variadas,
          sobrepostas, sem espaço vazio (a abundância é a própria composição) */}
      <g opacity="0.9">
        {Array.from({ length: 22 }).map((_, i) => {
          const x = (i * 57) % 1200
          const h = 160 + ((i * 37) % 220)
          const flip = i % 2 === 0
          return (
            <path
              key={i}
              d={`M${x} 800 C ${x + (flip ? -40 : 40)} ${800 - h * 0.5}, ${x + (flip ? -10 : 10)} ${800 - h}, ${x} ${800 - h * 1.1}`}
              fill="none"
              stroke="#c17a3a"
              strokeOpacity={0.12 + (i % 3) * 0.05}
              strokeWidth="2"
            />
          )
        })}
        {Array.from({ length: 26 }).map((_, i) => {
          const x = (i * 47 + 20) % 1200
          const h = 90 + ((i * 29) % 180)
          return (
            <path
              key={`b-${i}`}
              d={`M${x} 800 C ${x - 30} ${800 - h * 0.6}, ${x + 30} ${800 - h * 0.8}, ${x} ${800 - h}`}
              fill="none"
              stroke="#4c7a3f"
              strokeOpacity={0.16 + (i % 4) * 0.05}
              strokeWidth="2.5"
            />
          )
        })}
      </g>
    </svg>
  )
}
