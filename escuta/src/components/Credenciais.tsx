import Reveal from './Reveal'

export default function Credenciais() {
  return (
    <section className="border-b border-linha bg-papel py-20">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 sm:grid-cols-[1fr_1.3fr] sm:px-8">
        <Reveal>
          <div className="flex aspect-square w-full max-w-xs items-center justify-center overflow-hidden rounded-2xl border-2 border-tinta bg-papel-forte p-8">
            <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full text-quieto">
              <defs>
                <path id="selo-topo" d="M18 100 A82 82 0 0 1 182 100" />
                <path id="selo-base" d="M182 100 A82 82 0 0 0 18 100" />
              </defs>
              <g transform="rotate(-3 100 100)" fill="none" stroke="currentColor">
                <circle cx="100" cy="100" r="92" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="82" strokeWidth="1" strokeDasharray="1.5 4" />
                <text className="font-dado" fontSize="8.5" letterSpacing="2" fill="currentColor" stroke="none">
                  <textPath href="#selo-topo" startOffset="50%" textAnchor="middle">
                    DRA. RENATA CASAGRANDE
                  </textPath>
                </text>
                <text className="font-dado" fontSize="7.5" letterSpacing="1.5" fill="currentColor" stroke="none">
                  <textPath href="#selo-base" startOffset="50%" textAnchor="middle">
                    PSICÓLOGA CLÍNICA · CRP 04/118527
                  </textPath>
                </text>
                <line x1="76" y1="100" x2="124" y2="100" strokeWidth="1" opacity="0.4" />
                <text
                  className="font-display"
                  x="100"
                  y="119"
                  textAnchor="middle"
                  fontSize="54"
                  fill="currentColor"
                  stroke="none"
                >
                  RC
                </text>
              </g>
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
