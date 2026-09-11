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

export default function Footer() {
  return (
    <footer id="contato" className="scroll-mt-20 bg-ink text-paper">
      <div className="mx-auto max-w-3xl px-6 pt-20 pb-10 md:pt-24">
        <Reveal>
          <h2 className="text-3xl font-semibold md:text-4xl">Agende uma consulta</h2>
          <p className="mt-4 max-w-md text-paper/70">
            Conte o que está acontecendo — a gente responde em até 24h com um
            caminho claro pro seu caso.
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

          <dl className="mt-14 grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-paper/50">E-mail</dt>
              <dd className="mt-1">
                <a href={EMAIL_HREF} className="text-paper transition-colors hover:text-paper/80">
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-paper/50">Endereço</dt>
              <dd className="mt-1 text-paper">{ADDRESS}</dd>
            </div>
          </dl>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6 text-sm text-paper/45">
          <span className="font-heading">{FIRM_NAME}</span>
          <span>© {new Date().getFullYear()} {FIRM_NAME}. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  )
}
