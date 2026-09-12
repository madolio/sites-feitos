import RepCounter from './RepCounter'

export default function Hero() {
  return (
    <section id="inicio" className="scroll-mt-16 pt-24 lg:pt-0 lg:pl-16">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-32">
        <p className="stopwatch text-sm tracking-[0.3em] text-lane-ink">CRONÔMETRO LIGADO</p>
        <h1 className="mt-5 text-5xl leading-[1.05] sm:text-7xl">
          Seu corpo no seu <span className="text-lane-ink">recorde</span> pessoal.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-track/70">
          Treino individual, sem turma e sem ficha genérica — cada programa
          ajustado pro que o seu corpo aguenta essa semana.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#agendar" className="btn-lane">
            Agendar aula grátis
          </a>
          <a href="#programas" className="btn-line">
            Ver programas
          </a>
        </div>

        <div className="mt-20">
          <div className="text-7xl text-track sm:text-8xl">
            <RepCounter target={48213} />
          </div>
          <p className="mt-3 text-sm tracking-widest text-track/60 uppercase">
            repetições treinadas essa semana, entre todos os alunos
          </p>
        </div>
      </div>
    </section>
  )
}
