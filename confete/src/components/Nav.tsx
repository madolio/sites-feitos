export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="4" fill="var(--color-sun)" stroke="var(--color-carbon)" strokeWidth="1.4" />
      <circle cx="23" cy="9" r="3" fill="var(--color-sky)" stroke="var(--color-carbon)" strokeWidth="1.4" />
      <circle cx="16" cy="22" r="5" fill="var(--color-ember)" stroke="var(--color-carbon)" strokeWidth="1.4" />
    </svg>
  )
}

// Barra flutuante em formato de pílula (radius bem alto), com contorno
// preto — não uma barra full-width comum, no espírito do estilo de
// referência (cantos de 1600px em nav/botões).
export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <div className="flex items-center gap-4 rounded-full border-[1.5px] border-carbon bg-cream px-4 py-2 shadow-none sm:gap-6 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2">
          <Mark className="h-7 w-7" />
          <span className="font-display text-lg font-bold">Confete</span>
        </a>
        <a href="#contato" className="btn-sticker px-4 py-2 text-sm">
          Peça um orçamento
        </a>
      </div>
    </header>
  )
}
