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
        className="fixed top-5 left-5 z-50 rounded-full bg-paper px-3.5 py-1.5 font-poster text-xl tracking-wide text-ink uppercase shadow-sm shadow-ink/10 transition-colors hover:text-accent sm:top-6 sm:left-6"
      >
        madolio<span className="text-accent">.</span>
      </Link>

      {/* O `fixed` fica num wrapper sem transform/transition — animar o
          transform (translate-y) direto num elemento `position: fixed` é um
          bug conhecido do Safari/iOS: o WebKit às vezes "descola" o elemento
          do viewport durante a transição e ele passa a rolar junto com a
          página (relatado pelo usuário: o botão aparecia no meio da tela,
          no meio de outro conteúdo, em vez de fixo no canto). Separando quem
          é fixed (não anima) de quem anima (não é fixed) evita o bug. */}
      <div className="fixed right-5 bottom-5 z-50 sm:right-6 sm:bottom-6">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          // Invisível = fora da ordem de tabulação e da árvore de acessibilidade.
          tabIndex={pastHero ? undefined : -1}
          aria-hidden={pastHero ? undefined : true}
          className={`block rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-300 hover:bg-accent-hover ${
            pastHero ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
          }`}
        >
          Falar no WhatsApp
        </a>
      </div>
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
