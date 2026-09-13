import { sendToWhatsApp } from '../demo'

// Sem barra de navegação: só a marca discreta no canto e o CTA de WhatsApp
// flutuante — o resto da tela é sempre o conteúdo (a planta interativa).
export default function Chrome() {
  return (
    <>
      <div className="fixed top-5 left-5 z-50 rounded-full bg-paper px-3.5 py-1.5 shadow-sm shadow-ink/10 sm:top-6 sm:left-6">
        <span className="font-display text-lg text-ink">Cerne</span>
      </div>

      <div className="fixed right-5 bottom-5 z-50 sm:right-6 sm:bottom-6">
        <button
          type="button"
          onClick={() => sendToWhatsApp('Olá, Cerne! Quero conversar sobre um projeto de interiores.')}
          className="btn-primary shadow-lg shadow-ink/15"
        >
          Falar no WhatsApp
        </button>
      </div>
    </>
  )
}
