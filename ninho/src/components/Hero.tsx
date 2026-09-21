import { sendToWhatsApp } from '../demo'

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-linha">
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-broto/20"
      >
        <g className="trilha-deriva" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M-40 90 q60 -40 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0" />
          <path d="M-40 250 q60 40 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0" />
          <path d="M-40 410 q60 -40 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0 t120 0" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
        <p className="dado-ficha text-broto">educação infantil · 0 a 5 anos</p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-6xl">
          Cada fase da infância tem o que aprender. A gente sabe exatamente o quê.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-tinta/80">
          O Ninho Educação Infantil acompanha bebês, crianças bem pequenas e crianças pequenas com
          uma rotina pensada por faixa etária, não uma creche genérica de "cuidar até os pais
          voltarem".
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              sendToWhatsApp('Olá! Gostaria de conhecer o Ninho Educação Infantil e agendar uma visita.')
            }
            className="btn-ninho"
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
