import { estrutura } from '../data/conteudo'
import { Reveal, Rich } from './ui'

export default function Estrutura() {
  const [principal, ...demais] = estrutura.fotos
  return (
    <section id="estrutura" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{estrutura.eyebrow}</p>
            <h2 className="h-section mt-5">
              <Rich text={estrutura.title} />
            </h2>
            <p className="mt-5 text-lg text-muted">{estrutura.text}</p>
            <ul className="mt-8 border-t border-border">
              {estrutura.itens.map((i) => (
                <li key={i.nome} className="flex flex-wrap items-baseline justify-between gap-x-6 border-b border-border py-4">
                  <span className="font-display text-2xl font-bold uppercase">{i.nome}</span>
                  <span className="text-muted">{i.detalhe}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Galeria: a 1ª foto é grande; funciona melhor com 4 fotos */}
          <Reveal delay={100} className="grid grid-cols-2 gap-3 lg:col-span-7">
            {principal && (
              <img
                src={principal.src}
                alt={principal.alt}
                loading="lazy"
                width={1000}
                height={667}
                className="col-span-2 aspect-[16/9] w-full object-cover"
              />
            )}
            {demais.map((f, i) => (
              <img
                key={f.src}
                src={f.src}
                alt={f.alt}
                loading="lazy"
                width={1000}
                height={667}
                className={`aspect-square w-full object-cover ${demais.length % 2 === 1 && i === demais.length - 1 ? 'col-span-2 !aspect-[16/9]' : ''}`}
              />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
