import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { sendToWhatsApp } from '../demo'

// A navegação vira o próprio esquema P&ID que já é o assunto do site: cada
// seção é um "estágio" ao longo do cano, com um manômetro (não um link de
// texto solto) marcando onde a agulha aponta — cheio no estágio ativo, em
// repouso nos outros. Substitui `Nav.tsx` (barra fixa com logo+links+botão,
// igual à de praticamente qualquer site) por um painel de instrumento.
const estagios = [
  { to: '/', hash: '', label: 'Captação' },
  { to: '/produtos', hash: '', label: 'Filtração' },
  { to: '/produtos#osmose', hash: '#osmose', label: 'Osmose reversa' },
  { to: '/#setores', hash: '#setores', label: 'Aplicação' },
  { to: '/#contato', hash: '#contato', label: 'Atendimento' },
] as const

function useEstagioAtivo() {
  const location = useLocation()
  const [porScroll, setPorScroll] = useState<string | null>(null)

  useEffect(() => {
    setPorScroll(null)
    const ids = estagios.filter((e) => e.hash).map((e) => e.hash.slice(1))
    const elementos = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (elementos.length === 0) return

    const observer = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.find((e) => e.isIntersecting)
        if (visivel) setPorScroll(`#${visivel.target.id}`)
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    elementos.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [location.pathname])

  if (porScroll) return estagios.find((e) => e.hash === porScroll)?.to ?? null
  if (!location.hash) return estagios.find((e) => e.to === location.pathname && !e.hash)?.to ?? null
  return estagios.find((e) => e.to === `${location.pathname}${location.hash}`)?.to ?? null
}

function Manometro({ ativo }: { ativo: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeOpacity={ativo ? 1 : 0.35} strokeWidth="1.4" />
      <path d="M8 15 a5.66 5.66 0 0 1 8 0" fill="none" stroke="currentColor" strokeOpacity={ativo ? 1 : 0.35} strokeWidth="1.2" />
      <line
        x1="12"
        y1="12"
        x2={ativo ? 15.2 : 9.2}
        y2={ativo ? 8.8 : 9.2}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="transition-all duration-300"
      />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" />
    </svg>
  )
}

function Cano() {
  return (
    <svg viewBox="0 0 2 100" preserveAspectRatio="none" className="absolute top-0 left-[1.6rem] -z-10 h-full w-[2px]" aria-hidden="true">
      <line x1="1" y1="0" x2="1" y2="100" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
      <line x1="1" y1="0" x2="1" y2="100" stroke="currentColor" strokeWidth="2" strokeDasharray="3 7" className="painel-fluxo" />
    </svg>
  )
}

export default function Painel() {
  const ativo = useEstagioAtivo()
  const menuRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [ativo])

  const falarNoWhatsApp = () => sendToWhatsApp('Olá, Nascente! Quero saber mais sobre os equipamentos.')

  return (
    <>
      {/* Desktop: coluna fixa à esquerda, sempre visível — o painel de
          instrumento fica montado no equipamento, não escondido atrás de
          scroll. */}
      <header className="fixed inset-y-0 left-0 z-50 hidden w-56 flex-col border-r border-white/10 bg-ink text-white lg:flex">
        <Link to="/" className="flex items-center gap-2 border-b border-white/10 px-6 py-5">
          <span className="font-heading text-lg font-extrabold" style={{ fontStretch: '116%' }}>
            Nascente
          </span>
        </Link>

        <nav aria-label="Estágios do tratamento" className="relative flex-1 py-8 pl-6 text-white/80">
          <Cano />
          <ul className="space-y-7">
            {estagios.map((e) => (
              <li key={e.label}>
                <Link
                  to={e.to}
                  className={`flex items-center gap-3 text-[0.9375rem] font-medium transition-colors ${
                    ativo === e.to ? 'text-water' : 'hover:text-white'
                  }`}
                >
                  <Manometro ativo={ativo === e.to} />
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-5">
          <button type="button" onClick={falarNoWhatsApp} className="btn-primary w-full">
            Falar no WhatsApp
          </button>
        </div>
      </header>

      {/* Mobile/tablet: sem espaço pra coluna — vira uma barra fina no topo
          com só a marca e o CTA, mesmo fallback do Torre. Os estágios ficam
          acessíveis por um menu que abre por baixo, não escondidos. */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-white/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-3.5">
          <Link to="/" className="font-heading text-lg font-extrabold text-ink" style={{ fontStretch: '116%' }}>
            Nascente
          </Link>
          <div className="flex items-center gap-2">
            <button type="button" onClick={falarNoWhatsApp} className="btn-primary px-4 py-2 text-[0.9375rem]">
              WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Fechar estágios' : 'Ver estágios'}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-ink/15 text-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" className="h-5 w-5">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav ref={menuRef} aria-label="Estágios do tratamento" className="border-t border-ink/10 bg-white px-5 py-4">
            <ul className="space-y-1">
              {estagios.map((e) => (
                <li key={e.label}>
                  <Link
                    to={e.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-sm px-2 py-2.5 text-[0.9375rem] font-medium ${
                      ativo === e.to ? 'bg-surface-alt text-accent' : 'text-ink/75'
                    }`}
                  >
                    <Manometro ativo={ativo === e.to} />
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  )
}
