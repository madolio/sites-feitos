import { FIRM_NAME, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_URL } from '../config/site'

// Substitui o `Nav`/`TopBar` horizontal com menu de âncoras — mesma decisão
// de arquitetura de antes (a página é uma jornada única, não uma coleção de
// seções saltáveis), só que agora a barra carrega o indicador "EM SESSÃO"
// pulsando de verdade, como a barra de status de um painel de controle.
export default function StatusBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-3.5">
        <div className="flex items-center gap-3">
          <span className="font-heading text-base text-ink">{FIRM_NAME}</span>
          <span className="hidden items-center gap-1.5 border-l border-line pl-3 text-[0.6875rem] font-semibold tracking-[0.14em] text-hold uppercase sm:flex">
            <span className="pulse-live h-1.5 w-1.5 rounded-full bg-hold" aria-hidden="true" />
            Em sessão
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={PHONE_HREF}
            className="readout hidden text-sm font-semibold text-ink/80 transition-colors hover:text-ink sm:inline-block"
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
