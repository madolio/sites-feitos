import { useEffect, useState } from 'react'
import { nav, whatsappUrl } from '../config/site'
import { IconClose, IconMenu, Logo } from './ui'

export default function Header() {
  const [aberto, setAberto] = useState(false)
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  useEffect(() => {
    if (!aberto) return
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [aberto])

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        rolou || aberto ? 'border-line bg-bone/92' : 'border-transparent bg-bone/70'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 lg:h-20 lg:px-8">
        <a href="#topo" aria-label="Início" className="shrink-0" onClick={() => setAberto(false)}>
          <Logo compact />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="group relative py-2 text-[0.9375rem] font-medium text-ink/85 hover:text-ink">
              {n.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-clay transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn btn-primary !min-h-11 !px-4 sm:!px-5">
            Agendar
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-ink/20 lg:hidden"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setAberto((v) => !v)}
          >
            {aberto ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
          </button>
        </div>
      </div>

      <nav
        id="menu-mobile"
        aria-label="Menu móvel"
        hidden={!aberto}
        className="border-t border-line bg-bone lg:hidden"
      >
        <ul className="mx-auto max-w-6xl px-5 py-3">
          {nav.map((n, i) => (
            <li key={n.href} className="border-b border-line/70 last:border-0">
              <a
                href={n.href}
                onClick={() => setAberto(false)}
                className="flex min-h-14 items-center justify-between font-display text-2xl"
              >
                <span>{n.label}</span>
                <span className="text-sm font-body text-muted tabular-nums">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
