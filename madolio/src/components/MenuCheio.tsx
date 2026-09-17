import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { WHATSAPP_URL } from '../constants'

// Menu em tela cheia, no espírito do "immersive full-screen nav" que o
// usuário mandou de referência — mas ADICIONAL ao chrome mínimo que já
// existe (`Chrome.tsx`: logo + WhatsApp flutuante), não um substituto. A
// home continua sem barra de navegação tradicional por padrão; isto é só
// uma segunda forma de explorar, atrás de um botão.
const links = [
  { href: '/#trabalhos', label: 'Trabalhos', n: '01' },
  { href: '/#sobre', label: 'Sobre', n: '02' },
  { href: '/#faq', label: 'Perguntas', n: '03' },
  { href: '/#contato', label: 'Contato', n: '04' },
]

export default function MenuCheio() {
  const [open, setOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const lista = linksRef.current
    if (!overlay || !lista) return

    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const itens = gsap.utils.toArray<HTMLElement>(lista.children)

    if (open) {
      document.body.style.overflow = 'hidden'
      if (reduzido) {
        gsap.set(overlay, { clipPath: 'circle(150% at 100% 0%)' })
        gsap.set(itens, { opacity: 1, y: 0 })
      } else {
        gsap.fromTo(
          overlay,
          { clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' },
          { clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)', duration: 0.65, ease: 'power3.inOut' },
        )
        gsap.fromTo(
          itens,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, delay: 0.22, ease: 'power3.out' },
        )
      }
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={open}
        className="fixed top-5 right-5 z-50 rounded-full bg-paper px-4 py-1.5 text-sm font-semibold text-ink shadow-sm shadow-ink/10 transition-colors hover:text-accent sm:top-6 sm:right-6"
      >
        Menu
      </button>

      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-void text-white"
          style={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
        >
          <div className="flex items-center justify-between px-6 py-5 sm:px-10 sm:py-6">
            <Link to="/" onClick={() => setOpen(false)} className="font-poster text-xl tracking-wide text-white uppercase">
              madolio<span className="text-accent-hero">.</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:border-white/50"
            >
              Fechar
            </button>
          </div>

          <nav aria-label="Menu principal" className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10">
            <ul ref={linksRef} className="space-y-1 sm:space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 py-1"
                  >
                    <span className="font-body w-8 shrink-0 text-sm font-medium text-fog sm:w-10">{l.n}</span>
                    <span className="font-poster text-5xl tracking-tight text-white uppercase transition-colors group-hover:text-accent-hero sm:text-7xl">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-6 text-sm text-fog sm:px-10">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
            >
              Falar no WhatsApp
            </a>
            <span>madolio.com.br</span>
          </div>
        </div>
      )}
    </>
  )
}
