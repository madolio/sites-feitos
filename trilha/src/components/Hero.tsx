// Layout de 2 colunas: texto de um lado, do outro um perfil de elevação real
// (não fundo decorativo full-bleed atrás do texto) — os marcos da trilha
// batem literalmente com as fases citadas no texto (dor → amplitude → força
// → retorno), como um mapa de altimetria de percurso.
const MARCOS = [
  { x: 14, y: 176, label: 'dor sob controle' },
  { x: 108, y: 118, label: 'amplitude de volta' },
  { x: 202, y: 62, label: 'força reconstruída' },
  { x: 296, y: 20, label: 'retorno' },
]

export default function Hero() {
  return (
    <section className="border-b border-linha bg-papel">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
        <div>
          <p className="dado-mapa text-altitude">reabilitação · trilha topográfica</p>
          <h1 className="mt-4 max-w-xl text-4xl leading-tight sm:text-5xl">
            A sua recuperação, vista como um percurso que dá pra acompanhar.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-tinta/80">
            Cada fase do seu tratamento é um trecho de trilha real: dor sob controle, amplitude de
            volta, força reconstruída, retorno ao que você fazia antes. Você vê em que ponto está e
            quanto falta pra chegar lá.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#trilha" className="btn-trilha">
              Ver o mapa da recuperação
            </a>
            <a href="#contato" className="btn-outline">
              Agendar avaliação
            </a>
          </div>
        </div>

        <div aria-hidden="true" className="hidden rounded border border-linha bg-papel-forte p-5 lg:block">
          <p className="dado-mapa text-tinta/50">perfil da recuperação</p>
          <svg viewBox="0 0 320 200" className="mt-3 w-full">
            <g className="contorno-deriva" fill="none" stroke="var(--color-contorno)" strokeOpacity="0.18" strokeWidth="1">
              <path d="M0 40 H320 M0 90 H320 M0 140 H320 M0 190 H320" />
            </g>
            <path
              d="M14 176 C 60 176, 75 130, 108 118 S 170 70, 202 62 S 260 30, 296 20"
              fill="none"
              stroke="var(--color-contorno)"
              strokeWidth="2.5"
              className="trilha-percorrida"
            />
            {MARCOS.map((m) => (
              <circle
                key={m.label}
                cx={m.x}
                cy={m.y}
                r={5}
                fill="var(--color-trilha)"
                className={m.label === 'retorno' ? 'marco-ativo' : undefined}
              />
            ))}
          </svg>
          <p className="dado-mapa mt-3 text-tinta/50">dor → amplitude → força → retorno</p>
        </div>
      </div>
    </section>
  )
}
