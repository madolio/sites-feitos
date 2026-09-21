import { sendToWhatsApp } from '../demo'

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-linha">
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-fluxo/15"
      >
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <path
            className="correnteza"
            strokeDasharray="10 14"
            d="M -50 420 C 120 400, 220 440, 340 410 S 560 380, 680 400 S 900 370, 1080 390"
          />
          <path
            className="correnteza"
            strokeDasharray="10 14"
            d="M -50 340 C 140 320, 240 360, 360 330 S 580 300, 700 320 S 920 290, 1080 310"
          />
        </g>
      </svg>

      <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
        <p className="dado-vazao text-fluxo">encanador avulso · Caxias do Sul, RS</p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-6xl">
          Vazamento não espera. A gente também não.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-tinta/80">
          Desentupimento, conserto de vazamento, instalação de metais e louças e revisão de caixa
          d&#8217;água. Emergência tem prioridade de verdade, não é só uma palavra no site.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              sendToWhatsApp(
                'Olá! Tenho um vazamento agora e preciso de atendimento com urgência. Podem me ajudar?',
              )
            }
            className="btn-emergencia"
          >
            Tenho um vazamento agora
          </button>
          <a href="#diagnostico" className="btn-outline">
            Ver diagnóstico de vazão
          </a>
        </div>
      </div>
    </section>
  )
}
