import { FIRM_NAME, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_URL } from '../config/site'

// Substitui `StatusBar.tsx` — sem indicador pulsando "ao vivo": a barra fixa
// só identifica o escritório e mantém telefone/CTA sempre à mão, como a
// placa na porta de uma sala de leitura, não um painel de status.
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/15 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-3.5">
        <span className="font-heading text-base font-semibold text-ink">{FIRM_NAME}</span>

        <div className="flex items-center gap-4">
          <a
            href={PHONE_HREF}
            className="hidden text-sm font-medium text-ink/75 transition-colors hover:text-ink sm:inline-block"
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
