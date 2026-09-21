import Reveal from './Reveal'

export default function Credenciais() {
  return (
    <section className="border-b border-linha bg-papel py-20">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 sm:grid-cols-[1fr_1.3fr] sm:px-8">
        <Reveal>
          <div className="aspect-square w-full max-w-xs overflow-hidden rounded-2xl border-2 border-tinta bg-papel-forte">
            <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full text-quieto">
              <circle cx="100" cy="78" r="38" fill="none" stroke="currentColor" strokeWidth="3" />
              <path
                d="M40 168c6-38 34-58 60-58s54 20 60 58"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="dado-ficha text-quieto">responsável técnica</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Dra. Renata Casagrande</h2>
          <p className="mt-1 text-tinta/60">Psicóloga clínica · CRP 04/118527</p>
          <p className="mt-5 max-w-lg text-tinta/80">
            Formada em Psicologia, com especialização em Terapia Cognitivo-Comportamental (TCC) e
            mais de 10 anos de atendimento clínico com adultos. Atende ansiedade, esgotamento
            profissional, autoestima e questões de relacionamento, com sessões semanais ou
            quinzenais, online ou presenciais.
          </p>
          <p className="mt-4 max-w-lg text-tinta/80">
            A abordagem é colaborativa: entender o que está acontecendo antes de propor qualquer
            direção, sem fórmula pronta e sem julgamento sobre o que trouxe você até aqui.
          </p>
          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-linha pt-6 text-sm">
            <div>
              <dt className="dado-ficha text-quieto">Atuação</dt>
              <dd className="mt-1">10+ anos</dd>
            </div>
            <div>
              <dt className="dado-ficha text-quieto">Abordagem</dt>
              <dd className="mt-1">TCC</dd>
            </div>
            <div>
              <dt className="dado-ficha text-quieto">Sessão</dt>
              <dd className="mt-1">50 min</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
