// A seção-assinatura do site: a ocular do telescópio focando os anéis de
// Saturno conforme a página rola. Ilustração autoral em SVG (nada de
// screenshot/stock), dado real em data/ceu.ts. Ver ContainerScroll.tsx pro
// motor e zenite/CLAUDE.md pra justificativa completa do reuso.
import { ContainerScroll } from './ContainerScroll'
import { anelSaturno } from '../data/ceu'

function SaturnoIlustracao() {
  return (
    <svg viewBox="0 0 300 300" className="h-[70%] w-[70%]" role="img" aria-label="Ilustração de Saturno e seus anéis">
      <defs>
        <radialGradient id="corpo-saturno" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#e4c98a" />
          <stop offset="55%" stopColor="#c9a361" />
          <stop offset="100%" stopColor="#8f6d3a" />
        </radialGradient>
      </defs>

      {/* Faixa traseira dos anéis, atrás do planeta */}
      <ellipse cx="150" cy="150" rx="128" ry="30" fill="none" stroke="#b28a4a" strokeWidth="14" opacity="0.55" />
      <ellipse cx="150" cy="150" rx="128" ry="30" fill="none" stroke="#7fd9a0" strokeWidth="1.5" opacity="0.35" />

      {/* Corpo do planeta */}
      <circle cx="150" cy="150" r="62" fill="url(#corpo-saturno)" />
      <ellipse cx="150" cy="150" rx="62" ry="62" fill="none" stroke="#3a2c14" strokeOpacity="0.25" />

      {/* Faixa dianteira dos anéis, sobre o planeta */}
      <ellipse cx="150" cy="150" rx="128" ry="30" fill="none" stroke="#e0954a" strokeWidth="6" opacity="0.9"
        style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }} />
      <ellipse cx="150" cy="150" rx="128" ry="30" fill="none" stroke="#f0e9da" strokeWidth="2" opacity="0.7"
        style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }} />
    </svg>
  )
}

export default function Foco() {
  return (
    <section id="foco" className="relative">
      <ContainerScroll
        titleComponent={
          <>
            <p className="font-display text-sm tracking-wide text-latao">Gire a roda de foco</p>
            <h2 className="mt-3 font-display text-3xl text-marfim sm:text-4xl md:text-5xl">
              Role a página como quem foca uma ocular
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-neblina">
              O mesmo gesto que endireita esta moldura é o gesto de girar o foco de um telescópio de verdade —
              até {anelSaturno.nome.toLowerCase()} ganharem nitidez.
            </p>
          </>
        }
      >
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-1 px-8 text-center sm:gap-2">
          <SaturnoIlustracao />
          <p className="max-w-[60%] text-[0.62rem] leading-snug text-neblina sm:max-w-[55%] sm:text-xs">
            <span className="text-latao">{anelSaturno.diametroAneis}</span>
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            {anelSaturno.distanciaTerra}
          </p>
        </div>
      </ContainerScroll>
    </section>
  )
}
