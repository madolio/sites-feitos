import Reveal from './Reveal'

export default function Credenciais() {
  return (
    <section className="border-b border-linha bg-papel py-20">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 sm:grid-cols-[1fr_1.3fr] sm:px-8">
        <Reveal>
          <div className="aspect-square w-full max-w-xs overflow-hidden rounded-2xl border-2 border-tinta bg-papel-forte">
            <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full text-agua">
              <path
                d="M60 90c-8-22 8-38 26-30 4-18 30-18 34 0 18-8 34 8 26 30 10 16-2 34-22 32-8 12-26 12-34 0-20 2-32-16-22-32z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <circle cx="100" cy="112" r="6" fill="currentColor" />
            </svg>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="dado-ficha text-agua">responsável técnica</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Bianca Torres</h2>
          <p className="mt-1 text-tinta/60">Tosadora profissional · 9 anos de estúdio</p>
          <p className="mt-5 max-w-lg text-tinta/80">
            Formada em curso técnico de tosa e estética animal, com especialização em hand-stripping
            (tosa manual de pelagem áspera) e de-shedding de pelagem dupla. Já cuidou de mais de
            3 mil pets no estúdio, do Poodle ao Husky.
          </p>
          <p className="mt-4 max-w-lg text-tinta/80">
            A regra da casa: nunca tosar pelagem dupla igual à pelagem crespa. Cada tipo de pelo
            tem sua técnica, e usar a errada compromete o pelo por meses.
          </p>
          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-linha pt-6 text-sm">
            <div>
              <dt className="dado-ficha text-agua">Atuação</dt>
              <dd className="mt-1">9 anos</dd>
            </div>
            <div>
              <dt className="dado-ficha text-agua">Especialidade</dt>
              <dd className="mt-1">Hand-stripping</dd>
            </div>
            <div>
              <dt className="dado-ficha text-agua">Pets atendidos</dt>
              <dd className="mt-1">3.000+</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
