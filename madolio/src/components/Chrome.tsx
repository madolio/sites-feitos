import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WHATSAPP_URL } from '../constants'

// Substitui a barra de navegação tradicional (logo+links+botão, igual em
// praticamente todo site) por dois elementos fixos e discretos: a marca no
// canto, sempre visível, e um CTA que só aparece depois que a pessoa já
// passou da tela de abertura — não compete com o gesto de abertura do Hero.
export default function Chrome() {
  const [pastHero] = useCtaVisibility()

  return (
    <>
      <Link
        to="/"
        className="fixed top-5 left-5 z-50 rounded-full bg-paper px-3 py-1.5 font-heading text-lg font-extrabold text-ink shadow-sm shadow-ink/10 transition-colors hover:text-accent sm:top-6 sm:left-6"
      >
        madolio<span className="text-accent">.</span>
      </Link>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className={`fixed right-5 bottom-5 z-50 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:bg-accent-hover sm:right-6 sm:bottom-6 ${
          pastHero ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        Falar no WhatsApp
      </a>
    </>
  )
}

function useCtaVisibility() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return [visible] as const
}
