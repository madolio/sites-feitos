import { sobre } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Sobre() {
  return (
    <section id="sobre" className="bg-sage/60 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <Reveal className="relative lg:col-span-5">
          <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] rounded-tr-[6rem] bg-sage">
            <img
              src={sobre.image.src}
              alt={sobre.image.alt}
              width={1000}
              height={1200}
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -right-2 -bottom-4 rounded-2xl bg-forest px-5 py-4 text-bone shadow-[0_12px_30px_-14px_rgb(18_32_27/0.5)] sm:-right-5"
          >
            <span className="block font-display text-4xl leading-none text-clay-light italic">{sobre.numeros[0].valor}</span>
            <span className="mt-1 block text-xs tracking-wide text-bone/80">{sobre.numeros[0].rotulo}</span>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">{sobre.eyebrow}</p>
            <h2 className="h-section mt-5">
              <Rich text={sobre.title} />
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-6 space-y-4 text-lg text-muted">
            {sobre.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={180}>
            <dl className="mt-10 grid grid-cols-3 border-t border-forest/20">
              {sobre.numeros.map((n, i) => (
                <div key={n.rotulo} className={`pt-6 ${i > 0 ? 'border-l border-forest/20 pl-4 sm:pl-8' : 'pr-2'}`}>
                  <dd className="font-display text-3xl text-forest sm:text-5xl">{n.valor}</dd>
                  <dt className="mt-1 text-xs leading-snug text-muted sm:text-sm">{n.rotulo}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
