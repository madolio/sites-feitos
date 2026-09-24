export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="18" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="8" cy="9" r="3.4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="9" r="3.4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="18" r="1.6" fill="#b8432e" stroke="none" />
    </svg>
  )
}

const tabs = [
  { href: '#inicio', label: 'Ficha' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#cuidados', label: 'Cuidados' },
]

// Substitui a barra de navegação comum por uma fileira de abas de pasta
// suspensa (como as divisórias de um fichário físico) — cada seção é uma
// aba, não um link de menu. Sem hambúrguer: no celular as abas encolhem e
// ficam só com o rótulo, sem quebrar linha.
export default function FolderTabs() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[color-mix(in_srgb,var(--color-line)_65%,var(--color-paper))] backdrop-blur-md">
      {/* Faixa solida atras das abas: antes so as abas tinham fundo, entao o
      conteudo passava por tras da barra (e do botao Agendar) ao rolar. O tom mistura
      line com paper pra as abas de pasta (bg-paper) continuarem se destacando. */}
      <div className="mx-auto flex max-w-3xl items-end gap-1 px-2.5 pt-3 sm:px-6">
        {tabs.map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className="rounded-t-xl border border-b-0 border-line bg-paper px-2 py-2.5 text-[13px] font-semibold text-ink/75 shadow-[0_-2px_6px_rgba(43,58,58,0.06)] transition-colors hover:text-ink sm:px-6 sm:text-base"
          >
            {tab.label}
          </a>
        ))}
        <a
          href="#agendar"
          className="btn-accent ml-auto mb-1 px-3 py-2 text-sm sm:px-5"
        >
          Agendar
        </a>
      </div>
      <div className="border-b border-line bg-paper" />
    </header>
  )
}
