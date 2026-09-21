import { sendToWhatsApp } from '../demo'

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-linha">
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-latao/15"
      >
        <g className="dentes-deriva" fill="none" stroke="currentColor" strokeWidth="6">
          <path d="M0 60 h40 v20 h20 v-20 h30 v30 h20 v-30 h40 v15 h25 v-15 h1000" />
          <path d="M0 200 h50 v25 h15 v-25 h35 v10 h20 v-10 h50 v20 h30 v-20 h1000" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
        <p className="dado-placa text-emergencia">emergência 24h · agendado · sob medida</p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-6xl">
          Porta trancada não espera. Grade sob medida não se apressa.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-grafite/80">
          Chaveiro e serralheria em Londrina: abertura de porta, troca de segredo, cópia de chave
          comum e codificada, grades e portões sob medida. Diga o que aconteceu, a gente diz o
          que fazer.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => sendToWhatsApp('Olá! Preciso de um chaveiro/serralheiro com urgência.')}
            className="btn-emergencia"
          >
            Falar agora no WhatsApp
          </button>
          <a href="#contato" className="btn-outline">
            Preencher formulário
          </a>
        </div>
      </div>
    </section>
  )
}
