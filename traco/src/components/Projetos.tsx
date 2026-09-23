import { projetos } from '../data'
import ProjetoPlan from './ProjetoPlan'
import Reveal from './Reveal'

// Fotografia de arquitetura/interiores (Pexels, uso livre) escolhida por TIPO de
// projeto, a partir dos dados que ja existem em data.ts. Sao imagens de
// referencia: o Traco e um escritorio ficticio, e a secao avisa isso. A planta
// baixa de cada projeto continua aqui, como insercao sobre a foto.
const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`
const FOTOS: Record<string, { src: string; alt: string }> = {
  jaguare: { src: px(35361412), alt: 'Casa residencial contemporanea com estrutura de madeira, pedra e vidro, aberta para um patio gramado' },
  aimores: { src: px(8092189), alt: 'Sala de apartamento reformado com parede de tijolo aparente, piso de madeira e estante branca embutida' },
  ferradura: { src: px(7031604), alt: 'Casa moderna de madeira e vidro com deck e espelho dagua, sob ceu aberto' },
  'atelie-luz': { src: px(6000854), alt: 'Estacao de trabalho minimalista com mesa branca, cadeira e prateleira, para um ambiente comercial pequeno' },
  'varanda-alta': { src: px(15210485), alt: 'Varanda envidracada de cobertura com vista noturna para os predios da cidade' },
  'patio-central': { src: px(13041118), alt: 'Casa de concreto de volumes retos, com patio central e mobiliario de descanso' },
}

export default function Projetos() {
  return (
    <section id="projetos" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal as="h2" className="text-4xl md:text-5xl">Projetos</Reveal>
        <p className="mt-3 max-w-xl text-sm text-ink/70">
          Projetos de exemplo: as fotografias sao imagens de referencia, nao obras de um cliente real.
        </p>

        <Reveal stagger={0.08} className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {projetos.map((p, i) => (
            <article key={p.id}>
              <div className="relative">
                <img
                  src={FOTOS[p.id].src}
                  alt={FOTOS[p.id].alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <ProjetoPlan
                  index={i}
                  className="absolute right-3 bottom-3 h-auto w-24 border border-line bg-paper/90 p-1.5 sm:w-28"
                />
              </div>
              <div className="dim-line mt-5">
                <span>{p.area} m²</span>
              </div>
              <h3 className="mt-3 text-2xl">{p.nome}</h3>
              <p className="mt-1 text-ink/75">
                {p.tipo} · {p.local} · {p.ano}
              </p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
