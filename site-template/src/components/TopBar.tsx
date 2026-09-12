import { FIRM_NAME, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_URL } from '../config/site'

// Substitui o Nav horizontal com menu de âncoras (#atuacao, #atendimento,
// #contato) — a página não é mais uma coleção de seções saltáveis, é uma
// jornada única de cima a baixo (o quadro de partidas, depois o trajeto do
// atendimento, depois o bilhete de contato). Sem menu, sem hambúrguer: só o
// nome do escritório, o telefone e o CTA, sempre à mão.
export default function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-3.5">
        <span className="flex items-center gap-2 font-heading text-base text-ink">
          <span className="rivet" aria-hidden="true" />
          {FIRM_NAME}
        </span>

        <div className="flex items-center gap-4">
          <a
            href={PHONE_HREF}
            className="hidden text-sm font-semibold tabular-nums text-ink/80 transition-colors hover:text-ink sm:inline-block"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="bg-ink px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-ink/85"
          >
            Agendar consulta
          </a>
        </div>
      </div>
    </header>
  )
}
