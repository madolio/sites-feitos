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

      <div className="relative mx-auto grid max-w-5xl gap-10 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_280px] lg:items-center lg:gap-14">
        <div>
          <p className="dado-vazao text-fluxo">encanador avulso · Caxias do Sul, RS</p>

          <div className="mt-3 flex items-center gap-2">
            <span className="dado-vazao text-vazamento">vazamento</span>
            <span aria-hidden="true" className="dado-vazao text-tinta/30">
              →
            </span>
            <span className="dado-vazao text-fluxo">diagnóstico</span>
            <span aria-hidden="true" className="dado-vazao text-tinta/30">
              →
            </span>
            <span className="dado-vazao text-tinta">conserto</span>
          </div>

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

        <div
          aria-hidden="true"
          className="rounded-2xl border border-linha bg-papel/85 p-5 shadow-sm backdrop-blur-sm"
        >
          <p className="dado-vazao text-tinta/50">escala de referência · L/min</p>
          <div className="mt-4 flex gap-4">
            <div className="relative h-48 w-3 shrink-0 overflow-hidden rounded-full bg-linha/60 sm:h-56">
              <div className="absolute inset-x-0 bottom-0 h-[15%] bg-atencao" />
              <div className="absolute inset-x-0 bottom-[15%] h-[55%] bg-fluxo" />
              <div className="absolute inset-x-0 bottom-[70%] h-[30%] bg-vazamento" />
            </div>
            <div className="flex h-48 flex-col justify-between py-0.5 font-dado text-[0.7rem] text-tinta/50 sm:h-56">
              <span>20</span>
              <span>14</span>
              <span>8</span>
              <span>3</span>
              <span>0</span>
            </div>
          </div>
          <dl className="mt-5 grid grid-cols-3 gap-2 text-center text-[0.65rem]">
            <div>
              <dt className="dado-vazao text-[#8a6008]">abaixo</dt>
            </div>
            <div>
              <dt className="dado-vazao text-fluxo">normal</dt>
            </div>
            <div>
              <dt className="dado-vazao text-vazamento">acima</dt>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
