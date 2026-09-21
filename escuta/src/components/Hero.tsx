import { sendToWhatsApp } from '../demo'

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-linha">
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-quieto/20"
      >
        <g className="pauta-deriva" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M0 70 H1000" />
          <path d="M0 134 H1000" />
          <path d="M0 198 H1000" />
          <path d="M0 262 H1000" />
          <path d="M0 326 H1000" />
          <path d="M0 390 H1000" />
          <path d="M0 454 H1000" />
        </g>
        <path d="M90 0 V500" fill="none" stroke="var(--color-acolhe)" strokeOpacity="0.25" strokeWidth="1.5" />
      </svg>

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
        <p className="dado-ficha text-quieto">psicoterapia individual · online e presencial</p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-6xl">
          Um espaço fixo, toda semana, pra colocar em palavras o que ainda não tem nome.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-tinta/80">
          Atendimento psicológico para ansiedade, esgotamento, autoestima e relacionamentos, com
          escuta clínica e sem julgamento. Marque uma primeira conversa, sem burocracia.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              sendToWhatsApp('Olá! Gostaria de agendar uma primeira conversa com a Dra. Renata.')
            }
            className="btn-acolhe"
          >
            Falar no WhatsApp
          </button>
          <a href="#contato" className="btn-outline">
            Preencher formulário
          </a>
        </div>
      </div>
    </section>
  )
}
