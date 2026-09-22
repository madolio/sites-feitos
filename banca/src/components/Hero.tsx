import { sendToWhatsApp } from '../demo'

const RAMALHETE = [
  { cor: 'var(--color-magenta)', x: 8, r: 9 },
  { cor: 'var(--color-marigold)', x: 22, r: 11 },
  { cor: 'var(--color-sky)', x: 37, r: 10 },
  { cor: 'var(--color-violeta)', x: 52, r: 9.5 },
  { cor: 'var(--color-folha)', x: 66, r: 6, folha: true },
  { cor: 'var(--color-marigold)', x: 78, r: 8 },
  { cor: 'var(--color-magenta)', x: 91, r: 10 },
]

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pt-32 pb-8 lg:pt-40">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="font-display text-sm font-semibold tracking-wide text-folha-escuro">
            Floricultura de bairro
          </p>
          <h1 className="mt-3 font-display text-[2.6rem] leading-[1.04] font-bold text-ink sm:text-6xl">
            Flor da estação,
            <br />
            escolhida no balde,
            <br />
            montada na hora.
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink/75">
            A Banca vende como banca: cada balde guarda um tipo de flor, com
            preço e ocasião na etiqueta. Você escolhe, a gente monta o
            buquê na sua frente e entrega ainda pingando.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => sendToWhatsApp('Olá! Quero encomendar um buquê da Banca.')}
              className="btn-primario"
            >
              Encomendar pelo WhatsApp
            </button>
            <a href="#vitrine" className="btn-secundario">
              Ver a vitrine
            </a>
          </div>
          <p className="mt-6 text-sm text-ink/70">
            Retirada na banca ou entrega no mesmo dia · pedidos até 15h
          </p>
        </div>

        {/* balde panorâmico: o objeto central do negócio, transbordando */}
        <div className="relative mx-auto w-full max-w-sm">
          <svg viewBox="0 0 100 92" className="w-full" aria-hidden="true">
            <line x1="50" y1="42" x2="50" y2="8" stroke="var(--color-folha)" strokeWidth="1.4" opacity="0.7" />
            {RAMALHETE.map((f, i) => (
              <g key={i}>
                <line x1={f.x} y1="42" x2={f.x} y2={38 - i * 1.6} stroke="var(--color-folha)" strokeWidth="1.4" opacity="0.65" />
                {f.folha ? (
                  <ellipse cx={f.x} cy={38 - i * 1.6 - f.r * 0.4} rx={f.r * 0.55} ry={f.r} fill={f.cor} opacity="0.85" transform={`rotate(20 ${f.x} ${38 - i * 1.6})`} />
                ) : (
                  <>
                    <circle cx={f.x} cy={36 - i * 1.6 - f.r} r={f.r} fill={f.cor} opacity="0.92" />
                    <circle cx={f.x} cy={36 - i * 1.6 - f.r} r={f.r * 0.32} fill="var(--color-paper)" opacity="0.9" />
                  </>
                )}
              </g>
            ))}
            <path d="M14,42 L86,42 L74,88 Q50,96 26,88 Z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="1.6" />
            <rect x="16" y="46" width="68" height="30" fill="var(--color-sky)" opacity="0.4" />
            <ellipse cx="50" cy="42" rx="36" ry="6" fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" strokeWidth="1.6" />
            <path d="M22,43 Q50,20 78,43" fill="none" stroke="var(--color-ink)" strokeOpacity="0.4" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <p className="mt-3 text-center text-sm text-ink/70">
            o que vem no balde depende da semana — hoje: girassol, hortênsia, áster e lisianthus
          </p>
        </div>
      </div>
    </section>
  )
}
