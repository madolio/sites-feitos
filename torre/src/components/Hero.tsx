import RadarScreen from './RadarScreen'

export default function Hero() {
  return (
    <section id="inicio" className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <h1 className="text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl lg:text-7xl">
            A agenda do seu negócio, num instrumento só.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink-dim">
            A Torre reúne agendamentos de qualquer canal numa tela só,
            confirma sozinha por WhatsApp e avisa quando algo precisa de
            atenção — como um radar de verdade.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#planos" className="btn-amber">
              Testar 14 dias grátis
            </a>
            <a href="#produto" className="btn-line">
              Ver como funciona
            </a>
          </div>

          <dl className="mono mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6 text-sm">
            <div>
              <dt className="text-2xl text-ink">340+</dt>
              <dd className="mt-1 text-ink-dim">negócios na torre</dd>
            </div>
            <div>
              <dt className="text-2xl text-ink">28%</dt>
              <dd className="mt-1 text-ink-dim">menos faltas, em média</dd>
            </div>
            <div>
              <dt className="text-2xl text-ink">99.9%</dt>
              <dd className="mt-1 text-ink-dim">disponibilidade</dd>
            </div>
          </dl>
        </div>

        <RadarScreen />
      </div>
    </section>
  )
}
