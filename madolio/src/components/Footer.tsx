import { EMAIL, EMAIL_HREF, WHATSAPP_URL } from '../constants'
import Reveal from './Reveal'

export default function Footer() {
  return (
    <footer id="contato" className="scroll-mt-20 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-10 md:pt-24">
        <Reveal className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Bora conversar sobre o seu site?
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Manda uma mensagem agora e conta um pouco sobre o seu negócio.
              Eu te devolvo uma proposta rápida.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-white/85"
              >
                Falar no WhatsApp
              </a>
              <a
                href={EMAIL_HREF}
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-[0.9375rem] font-semibold text-white transition-colors hover:border-white/60"
              >
                Enviar e-mail
              </a>
            </div>
          </div>

          <div className="md:pt-2">
            <h3 className="font-semibold text-white/60">E-mail</h3>
            <a href={EMAIL_HREF} className="mt-1 inline-block text-lg text-white transition-colors hover:text-white/80">
              {EMAIL}
            </a>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-sm text-white/50">
          <span className="font-heading font-semibold text-white">
            madolio<span className="text-white/50">.</span>
          </span>
          <span>© {new Date().getFullYear()} Madolio. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  )
}
