import { sendToWhatsApp } from '../demo'

// Sem barra de navegação: só a marca discreta no canto e o CTA de WhatsApp
// flutuante — o resto da tela é sempre o conteúdo (a planta interativa).
export default function Chrome() {
  return (
    <>
      <div className="fixed top-5 left-5 z-50 rounded-full bg-paper px-3.5 py-1.5 shadow-sm shadow-ink/10 sm:top-6 sm:left-6">
        <h1 className="font-display text-lg text-ink">
          Cerne
          <span className="sr-only"> — Design de interiores</span>
        </h1>
      </div>

      <div className="fixed right-5 bottom-5 z-50 sm:right-6 sm:bottom-6">
        <button
          type="button"
          onClick={() => sendToWhatsApp('Olá, Cerne! Quero conversar sobre um projeto de interiores.')}
          aria-label="Falar no WhatsApp"
          className="btn-primary h-12 w-12 px-0 shadow-lg shadow-ink/15 sm:h-auto sm:w-auto sm:px-5"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current sm:hidden">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.4-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.1.1.6-.1 1.2Z" />
          </svg>
          <span className="sr-only sm:not-sr-only">Falar no WhatsApp</span>
        </button>
      </div>
    </>
  )
}
