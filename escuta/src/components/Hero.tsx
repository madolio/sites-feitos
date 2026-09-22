import { sendToWhatsApp } from '../demo'

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-linha">
      <div className="relative mx-auto max-w-2xl px-6 py-24 text-center sm:px-8 sm:py-36">
        <p className="dado-ficha text-quieto">psicoterapia individual · online e presencial</p>
        <h1 className="mx-auto mt-6 text-4xl leading-relaxed sm:text-6xl sm:leading-relaxed">
          Um espaço fixo, toda semana, pra colocar em palavras o que ainda não tem nome.
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-tinta/80">
          Atendimento psicológico para ansiedade, esgotamento, autoestima e relacionamentos, com
          escuta clínica e sem julgamento. Marque uma primeira conversa, sem burocracia.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() =>
              sendToWhatsApp('Olá! Gostaria de agendar uma primeira conversa com a Dra. Renata.')
            }
            className="btn-acolhe"
          >
            Falar no WhatsApp
          </button>
          <a href="#contato" className="link-sutil text-sm">
            Preencher formulário
          </a>
        </div>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        className="pauta-deriva absolute inset-x-0 bottom-0 h-16 w-full text-quieto/15 sm:h-24"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M0 20 H1000" />
          <path d="M0 50 H1000" />
          <path d="M0 80 H1000" />
          <path d="M0 110 H1000" />
        </g>
      </svg>
    </section>
  )
}
