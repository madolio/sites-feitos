import { sendToWhatsApp } from '../demo'
import { categoriaInfo } from '../data/servicos'

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-linha">
      {/* Faixa de risco: linhas diagonais tipo placa de atenção/sinalização
          de obra, não mais dentes de chave decorativos — reforça "serviço
          técnico rápido", não "vitrine bonita". */}
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-latao/15">
        <defs>
          <pattern
            id="faixa-risco"
            width="42"
            height="42"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="42" height="42" fill="none" />
            <line x1="0" y1="0" x2="0" y2="42" stroke="currentColor" strokeWidth="14" />
          </pattern>
        </defs>
        <rect className="faixa-risco-deriva" width="100%" height="100%" fill="url(#faixa-risco)" />
      </svg>

      <div className="relative mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
        <p className="dado-placa text-emergencia">emergência 24h · agendado · sob medida</p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-6xl">
          Porta trancada não espera. Grade sob medida não se apressa.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-grafite/80">
          Chaveiro e serralheria em Londrina: abertura de porta, troca de segredo, cópia de chave
          comum e codificada, grades e portões sob medida. Diga o que aconteceu, a gente diz o
          que fazer.
        </p>

        {/* Hierarquia deliberadamente assimétrica: a emergência domina, o
            resto é secundário — oposto do par de botões do mesmo tamanho. */}
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <button
            type="button"
            onClick={() => sendToWhatsApp('Olá! Preciso de um chaveiro/serralheiro com urgência.')}
            className="btn-emergencia gap-2 px-8 py-4 text-base shadow-lg shadow-emergencia/20"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
            </svg>
            Falar agora no WhatsApp
          </button>
          <div className="flex flex-col gap-1">
            <a href="#contato" className="text-sm font-semibold text-grafite/70 underline decoration-grafite/30 underline-offset-4 hover:text-grafite">
              Preencher formulário
            </a>
            <span className="dado-placa text-grafite/50">{categoriaInfo.emergencia.tempo}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
