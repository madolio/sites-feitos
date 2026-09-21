import { sendToWhatsApp } from '../demo'

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-linha">
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-agua/15"
      >
        <g className="agua-deriva" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M-50 90 Q 200 60 450 90 T 1050 90" />
          <path d="M-50 190 Q 200 160 450 190 T 1050 190" />
          <path d="M-50 290 Q 200 260 450 290 T 1050 290" />
          <path d="M-50 390 Q 200 360 450 390 T 1050 390" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
        <p className="dado-ficha text-agua">banho e tosa · atendimento por tipo de pelagem</p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-6xl">
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
    </section>
  )
}
