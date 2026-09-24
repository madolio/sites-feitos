import { galeria } from '../data/conteudo'
import { Reveal, Rich } from './ui'

// Grade assimétrica: a primeira foto ocupa 2x2; as outras se encaixam ao redor.
const cel = [
  'col-span-2 row-span-2 md:col-span-2 md:row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2 md:row-span-2',
  'col-span-1 row-span-1 md:col-span-1',
]

export default function Galeria() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="galeria-titulo">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{galeria.eyebrow}</p>
          <h2 id="galeria-titulo" className="h-section mt-5">
            <Rich text={galeria.title} />
          </h2>
        </Reveal>

        <Reveal className="mt-12 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:auto-rows-[13rem] md:grid-cols-4 md:gap-4">
          {galeria.fotos.map((f, i) => (
            <figure key={f.src} className={`group relative overflow-hidden rounded-2xl bg-sage ${cel[i]}`}>
              <img
                src={f.src}
                alt={f.alt}
                loading="lazy"
                className="size-full object-cover transition duration-700 [@media(hover:hover)]:group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-4 pt-10 pb-3 text-sm text-bone">
                {f.legenda}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
