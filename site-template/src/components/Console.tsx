import {
  ADDRESS,
  CASE_REF,
  COORDINATES,
  EMAIL,
  EMAIL_HREF,
  FIRM_NAME,
  LAWYER_NAME,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_URL,
} from '../config/site'
import LiveClock from './LiveClock'
import Reveal from './Reveal'

// Substitui `Footer.tsx` (talão de bilhete de trem) — o wildcard agora é um
// console de controle: coordenadas, código de processo e um relógio de
// verdade correndo a cada segundo, no lugar da textura de bilhete perfurado.
// A citação da advogada virou uma entrada de log, não uma "About" solta.
export default function Console() {
  return (
    <footer id="contato" className="scroll-mt-20 bg-ink text-paper">
      <div className="mx-auto max-w-3xl px-6 pt-20 pb-10 md:pt-24">
        <Reveal className="grid gap-0 border border-paper/20 md:grid-cols-[1.4fr_1fr]">
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-2 text-[0.6875rem] tracking-[0.14em] text-paper/50 uppercase">
              <span className="pulse-live h-1.5 w-1.5 rounded-full bg-hold" aria-hidden="true" />
              Canal aberto <LiveClock className="ml-1 text-precision" />
            </div>

            <h2 className="mt-4 text-3xl text-paper md:text-4xl">Abrir canal de contato</h2>
            <p className="mt-4 max-w-md text-paper/70">
              Conte o que está acontecendo — a gente responde em até 24h com
              um caminho claro pro seu caso.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-paper px-6 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-paper/85"
              >
                Falar no WhatsApp
              </a>
              <a
                href={PHONE_HREF}
                className="readout inline-flex items-center justify-center border border-paper/25 px-6 py-3 text-[0.9375rem] font-semibold text-paper transition-colors hover:border-paper/60"
              >
                {PHONE_DISPLAY}
              </a>
            </div>

            <div className="mt-10 border-t border-paper/15 pt-6">
              <p className="text-[0.6875rem] tracking-[0.14em] text-paper/50 uppercase">Log</p>
              <p className="mt-2 font-heading text-lg leading-relaxed text-paper/90 normal-case">
                "Boa parte dos processos que eu vejo começou com um contrato
                mal escrito. Meu trabalho é resolver isso antes — não depois."
              </p>
              <p className="mt-3 text-sm text-paper/60">
                {LAWYER_NAME}, à frente do escritório desde 2013
              </p>
            </div>
          </div>

          <div className="border-t border-paper/15 p-8 md:border-t-0 md:border-l md:p-10">
            <dl className="space-y-6">
              <div>
                <dt className="text-[0.6875rem] tracking-[0.14em] text-paper/50 uppercase">
                  Coordenadas
                </dt>
                <dd className="readout mt-1 text-paper">{COORDINATES}</dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] tracking-[0.14em] text-paper/50 uppercase">
                  Endereço
                </dt>
                <dd className="mt-1 text-paper">{ADDRESS}</dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] tracking-[0.14em] text-paper/50 uppercase">
                  E-mail
                </dt>
                <dd className="mt-1">
                  <a href={EMAIL_HREF} className="text-paper transition-colors hover:text-paper/80">
                    {EMAIL}
                  </a>
                </dd>
              </div>
            </dl>

            <p className="readout mt-8 border-t border-paper/15 pt-6 text-xs text-paper/55">
              Processo nº {CASE_REF}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-paper/60">
          <span className="font-heading text-paper/70">{FIRM_NAME}</span>
          <span>© {new Date().getFullYear()} {FIRM_NAME}. Todos os direitos reservados.</span>
        </div>

        <p className="mt-3 text-sm text-paper/60">
          feito com <span aria-hidden="true" className="text-precision">♥</span>
          <span className="sr-only">amor</span> por{' '}
          <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="underline decoration-paper/50 underline-offset-4">
            madolio
          </a>
        </p>
      </div>
    </footer>
  )
}
