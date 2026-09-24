import { ambiente } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Ambiente() {
  return (
    <section id="ambiente" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">{ambiente.eyebrow}</p>
          <h2 className="h-section mt-5">
            <Rich text={ambiente.title} />
          </h2>
        </Reveal>

        {/* 1ª foto grande, a última ocupa a linha inteira: 4 fotos é o ideal */}
        <ul className="mt-12 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] lg:grid-cols-4 lg:gap-4">
          {ambiente.fotos.map((f, i) => (
            <Reveal
              as="li"
              key={f.src}
              delay={(i % 4) * 60}
              className={`relative overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 row-span-2' : ''} last:col-span-2`}
            >
              <figure className="size-full">
                <img src={f.src} alt={f.alt} loading="lazy" className="absolute inset-0 size-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-4 pt-10 pb-3 text-sm text-foreground">
                  {f.legenda}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
