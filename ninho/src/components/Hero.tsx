import { sendToWhatsApp } from '../demo'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-papel-forte">
      <svg
        aria-hidden="true"
        viewBox="0 0 300 300"
        className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 text-broto/25 sm:-right-16 sm:-top-16 sm:h-80 sm:w-80"
      >
        <g className="trilha-deriva" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M-20 60 q40 -30 80 0 t80 0 t80 0 t80 0 t80 0" />
          <path d="M-20 150 q40 30 80 0 t80 0 t80 0 t80 0 t80 0" />
          <path d="M-20 240 q40 -30 80 0 t80 0 t80 0 t80 0 t80 0" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-24 sm:px-8 sm:pb-32 sm:pt-28">
        <p className="dado-ficha inline-block -rotate-2 rounded-full border border-broto/40 bg-papel px-3 py-1 text-broto shadow-sm">
          educação infantil · 0 a 5 anos
        </p>
        <h1 className="mt-6 max-w-2xl text-4xl leading-tight sm:-ml-1 sm:mt-8 sm:text-6xl">
          Cada fase da infância tem o que aprender. A gente sabe exatamente o quê.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-tinta/80 sm:ml-6">
          O Ninho Educação Infantil acompanha bebês, crianças bem pequenas e crianças pequenas com
          uma rotina pensada por faixa etária, não uma creche genérica de "cuidar até os pais
          voltarem".
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4 sm:ml-6">
          <button
            type="button"
            onClick={() =>
              sendToWhatsApp('Olá! Gostaria de conhecer o Ninho Educação Infantil e agendar uma visita.')
            }
            className="btn-ninho"
          >
            Falar no WhatsApp
          </button>
          <a href="#contato" className="btn-outline sm:-rotate-1">
            Preencher formulário
          </a>
        </div>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-10 w-full text-papel sm:h-14"
      >
        <path fill="currentColor" d="M0,32 C240,80 480,0 720,24 C960,48 1200,8 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </section>
  )
}
