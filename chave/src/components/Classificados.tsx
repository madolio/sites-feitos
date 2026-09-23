import { anuncios, tipos } from '../data'
import TipoIcon from './TipoIcon'
import Reveal from './Reveal'

// Fotografia do anuncio, escolhida pelo TIPO e pelo titulo dele (data.ts nao
// mudou). Sai em preto e branco com contraste, como clichê de jornal de
// classificados: isso mantem a linguagem editorial do projeto e uniformiza fotos
// de origens diferentes. O terreno nao tem foto — uma foto de gramado seria
// enganosa —, entao ganha uma planta de lote desenhada.
const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=700`
const FOTOS: Record<string, { src: string; alt: string }> = {
  'CH-1042': { src: px(18123382), alt: 'Corredor com varandas voltadas para um patio interno de predio, com luz natural' },
  'CH-0988': { src: px(7587880), alt: 'Casa terrea de volume reto com portas de vidro e quintal gramado' },
  'CH-1101': { src: px(15994062), alt: 'Terraco de cobertura com piscina privativa e espreguicadeiras' },
  'CH-0876': { src: px(6933852), alt: 'Studio mobiliado com sala integrada a cozinha, piso de madeira e janelas amplas' },
  'CH-0921': { src: px(7027720), alt: 'Sala ampla de apartamento com sofas e piso claro' },
  'CH-1130': { src: px(7031607), alt: 'Sobrado de dois pavimentos com fachada de madeira e vidro e gramado na frente' },
  'CH-0844': { src: px(3952034), alt: 'Quarto e estar compactos com janela alta, escrivaninha e sofa' },
  'CH-1017': { src: px(18072674), alt: 'Terraco de cobertura com piscina, guarda-corpo de vidro e vista da cidade' },
}

function PlantaLote({ area }: { area: string }) {
  return (
    <div className="flex aspect-[3/2] w-full items-center justify-center border border-line bg-paper" role="img" aria-label={`Planta de lote de ${area}`}>
      <svg viewBox="0 0 120 80" className="h-4/5 w-4/5 text-ink/60" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
        <rect x="14" y="12" width="92" height="56" strokeDasharray="4 3" />
        <path d="M14 22v-10h10M106 22v-10H96M14 58v10h10M106 58v10H96" strokeWidth="2" />
        <text x="60" y="44" textAnchor="middle" fontSize="9" fill="currentColor" stroke="none">{area}</text>
      </svg>
    </div>
  )
}

export default function Classificados() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
          <h2 className="text-3xl">Imóveis desta semana</h2>
          <p className="text-sm text-ink/65">{anuncios.length} anúncios</p>
        </div>

        <Reveal as="div" className="classificados mt-8" stagger={0.08}>
          {anuncios.map((a) => (
            <article key={a.codigo} className="mb-8 border-b border-line pb-6">
              {FOTOS[a.codigo] ? (
                <img
                  src={FOTOS[a.codigo].src}
                  alt={FOTOS[a.codigo].alt}
                  loading="lazy"
                  className="mb-3 aspect-[3/2] w-full border border-line object-cover grayscale contrast-125"
                />
              ) : (
                <div className="mb-3">
                  <PlantaLote area={a.area} />
                </div>
              )}
              <div className="flex items-start gap-3">
                <TipoIcon tipo={a.tipo} className="mt-0.5 h-7 w-7 shrink-0 text-steel" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="text-lg leading-tight font-bold">{a.titulo}</h3>
                    {a.novo && (
                      <span className="rounded-sm bg-ink px-1.5 py-0.5 text-[0.65rem] font-bold tracking-wide text-paper uppercase">
                        Novo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink/65">{a.bairro}</p>
                </div>
              </div>

              <p className="mt-2.5 text-ink/80">{a.descricao}</p>

              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-dotted border-line pt-2.5 text-sm">
                <span className="font-bold text-steel">{a.preco}</span>
                <span className="text-ink/65">
                  {a.area}
                  {a.quartos ? ` · ${a.quartos} quarto${a.quartos > 1 ? 's' : ''}` : ''} · Cód. {a.codigo}
                </span>
              </div>
            </article>
          ))}
        </Reveal>

        <p className="mt-2 text-xs text-ink/65">
          {tipos.map((t) => t.label).join(' · ')} — categorias deste classificado
        </p>
      </div>
    </section>
  )
}
