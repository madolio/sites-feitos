import {
  ADDRESS,
  EMAIL,
  EMAIL_HREF,
  FIRM_NAME,
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_URL,
} from '../config/site'
import Reveal from './Reveal'

// O rodapé é formatado como um talão de bilhete de trem — a borda pontilhada
// e o "número de protocolo" são o wildcard da página: um detalhe que não
// "combina" com um site jurídico, mas fecha a colisão vagão-leito × wayfinding.
export default function Footer() {
  return (
    <footer id="contato" className="scroll-mt-20 bg-ink text-paper">
      <div className="mx-auto max-w-3xl px-6 pt-20 pb-10 md:pt-24">
        <Reveal className="grid gap-0 border border-paper/20 md:grid-cols-[1.4fr_1fr]">
          <div className="p-8 md:p-10">
            <h2 className="text-3xl text-paper md:text-4xl">Agende uma consulta</h2>
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
                className="inline-flex items-center justify-center border border-paper/25 px-6 py-3 text-[0.9375rem] font-semibold text-paper transition-colors hover:border-paper/60"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="relative border-t border-dashed border-paper/25 p-8 md:border-t-0 md:border-l md:p-10">
            <span
              aria-hidden="true"
              className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-ink md:left-0 md:top-1/2 md:-translate-x-1.5 md:-translate-y-1/2"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-ink md:hidden"
            />
            <p className="text-xs text-paper/60">Protocolo Nº SP-2026-00184</p>

            <dl className="mt-6 space-y-6">
              <div>
                <dt className="text-sm text-paper/65">E-mail</dt>
                <dd className="mt-1">
                  <a href={EMAIL_HREF} className="text-paper transition-colors hover:text-paper/80">
                    {EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-paper/65">Endereço</dt>
                <dd className="mt-1 text-paper">{ADDRESS}</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-paper/60">
          <span className="font-heading text-paper/70">{FIRM_NAME}</span>
          <span>© {new Date().getFullYear()} {FIRM_NAME}. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  )
}
