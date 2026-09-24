import { useEffect, useRef, useState } from 'react'
import { nav, whatsappUrl } from '../config/site'
import { cta, rotulos } from '../data/conteudo'
import { IconClose, IconMenu, Logo } from './ui'

export default function Header() {
  const [aberto, setAberto] = useState(false)
  const [rolou, setRolou] = useState(false)
  const botaoMenu = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  useEffect(() => {
    if (!aberto) return
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setAberto(false)
      botaoMenu.current?.focus()
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [aberto])

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        rolou || aberto ? 'border-border bg-background/95' : 'border-transparent bg-background/70'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 lg:h-20 lg:px-8">
        <a href="#topo" aria-label={rotulos.inicio} className="inline-flex min-h-11 min-w-0 items-center" onClick={() => setAberto(false)}>
          <Logo compact />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="group relative py-3 text-[0.9375rem] font-medium text-foreground/85 hover:text-foreground">
              {n.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#experimental" className="btn btn-primary !min-h-11 !px-4 whitespace-nowrap sm:!px-5" onClick={() => setAberto(false)}>
            <span className="sm:hidden">{rotulos.matriculaCurto}</span>
            <span className="hidden sm:inline">{rotulos.matricula}</span>
          </a>
          <button
            ref={botaoMenu}
            type="button"
            className="grid size-11 shrink-0 place-items-center border border-foreground/25 lg:hidden"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? rotulos.menuFechar : rotulos.menuAbrir}
            onClick={() => setAberto((v) => !v)}
          >
            {aberto ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
          </button>
        </div>
      </div>

      <nav id="menu-mobile" aria-label="Menu móvel" hidden={!aberto} className="border-t border-border bg-background lg:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-3">
          {nav.map((n, i) => (
            <li key={n.href} className="border-b border-border/70">
              <a href={n.href} onClick={() => setAberto(false)} className="flex min-h-14 items-center justify-between font-display text-2xl">
                <span>{n.label}</span>
                <span className="font-body text-sm text-muted tabular-nums">0{i + 1}</span>
              </a>
            </li>
          ))}
          <li className="py-4">
            <a href={whatsappUrl(cta.mensagem)} target="_blank" rel="noreferrer" className="btn btn-primary w-full">
              {cta.botao}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
