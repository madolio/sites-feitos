import { sendToWhatsApp } from '../demo'

// Sem barra de navegação: só a marca discreta no canto e o CTA de WhatsApp
// flutuante — o resto da tela é sempre o conteúdo (a coluna dupla de Obra.tsx).
export default function Chrome() {
  return (
    <>
      <div className="fixed top-5 left-5 z-50 rounded-sm bg-paper/90 px-3 py-1.5 shadow-sm shadow-ink/10 backdrop-blur-sm sm:top-6 sm:left-6">
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
