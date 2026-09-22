import { useEffect, useState } from 'react'

export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="none" stroke="#35d6c9" strokeWidth="1.4" opacity="0.5" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="#35d6c9" strokeWidth="1.4" opacity="0.7" />
      <path d="M16 16 L16 4 A12 12 0 0 1 25 9 Z" fill="#35d6c9" opacity="0.5" />
      <circle cx="16" cy="16" r="2.2" fill="#f2a93a" />
    </svg>
  )
}

const links = [
  { href: '#produto', id: 'produto', label: 'Produto' },
  { href: '#planos', id: 'planos', label: 'Planos' },
  { href: '#depoimentos', id: 'depoimentos', label: 'Clientes' },
  { href: '#duvidas', id: 'duvidas', label: 'Dúvidas' },
]

// Substitui a barra horizontal (logo+links+botão, igual a qualquer landing
// page) por uma coluna fixa à esquerda — como o menu de um painel de
// controle de verdade, não uma barra de navegação de site institucional. Um
// canal por seção, com um blip aceso no canal ativo (scroll-spy). No celular,
// vira uma barra fina no topo (sem lugar pra uma coluna inteira), só com a
// marca e o CTA.
export default function Sidebar() {
  const [activeId, setActiveId] = useState('produto')

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => el !== null)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* Desktop: coluna fixa */}
      <header className="fixed inset-y-0 left-0 z-50 hidden w-56 flex-col border-r border-line bg-panel/60 backdrop-blur lg:flex">
        <a href="#inicio" className="flex items-center gap-2.5 border-b border-line px-6 py-5">
          <Mark className="h-7 w-7" />
          <span className="text-lg font-medium tracking-tight">Torre</span>
        </a>

        <nav aria-label="Seções" className="flex-1 px-3 py-6">
          <ul className="space-y-1">
            {links.map((link) => {
              const active = activeId === link.id
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={active ? 'true' : undefined}
                    className={`mono flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm transition-colors ${
                      active ? 'bg-line/60 text-ink' : 'text-ink-dim hover:text-ink'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${active ? 'bg-cyan' : 'bg-line'}`}
                      aria-hidden="true"
                    />
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-line p-4">
          <a href="#planos" className="btn-amber w-full">
            Testar grátis
          </a>
        </div>
      </header>

      {/* Celular/tablet: barra fina no topo */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 border-b border-line bg-deck/90 px-5 py-3 backdrop-blur lg:hidden">
        <a href="#inicio" className="flex items-center gap-2.5">
          <Mark className="h-7 w-7" />
          <span className="text-lg font-medium tracking-tight">Torre</span>
        </a>
        <a href="#planos" className="btn-amber px-4 py-2 text-[0.9375rem]">
          Testar grátis
        </a>
      </header>
    </>
  )
}
