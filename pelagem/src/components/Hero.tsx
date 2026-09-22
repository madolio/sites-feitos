import { sendToWhatsApp } from '../demo'

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-linha">
      <div className="relative mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="dado-ficha text-agua">banho e tosa · atendimento por tipo de pelagem</p>
          <h1 className="mt-4 text-4xl leading-tight sm:text-6xl">
            Cada pelo pede um cuidado diferente. O seu pet merece o certo.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-tinta/80">
            Estúdio Pelagem: banho, tosa e escovação com a técnica certa pra cada tipo de pelo, do
            curto ao crespo. Veja abaixo como cuidamos do seu.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => sendToWhatsApp('Olá! Gostaria de agendar banho e tosa pro meu pet.')}
              className="btn-pelo"
            >
              Falar no WhatsApp
            </button>
            <a href="#contato" className="btn-outline">
              Preencher formulário
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-agua/15" />
          <svg
            aria-hidden="true"
            viewBox="0 0 200 200"
            className="agua-deriva absolute -bottom-8 -left-8 h-32 w-32 text-agua/30"
          >
            <g fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M0 60 Q 50 40 100 60 T 200 60" />
              <path d="M0 100 Q 50 80 100 100 T 200 100" />
              <path d="M0 140 Q 50 120 100 140 T 200 140" />
            </g>
          </svg>
          <img
            src="https://images.pexels.com/photos/6131161/pexels-photo-6131161.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Cachorro sendo enxaguado com cuidado durante o banho no pet shop"
            loading="eager"
            className="relative h-72 w-full rounded-[2rem] border-4 border-papel object-cover shadow-lg sm:h-96 lg:h-[26rem]"
          />
        </div>
      </div>
    </section>
  )
}
