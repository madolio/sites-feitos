import { useEffect, useState } from 'react'
import Balde from './Balde'
import { secoes } from '../data'
import { sendToWhatsApp } from '../demo'

// A navegação é a própria bancada de feira: uma fileira de baldes
// apoiados numa tábua de madeira, cada um com o nível de água cheio
// quando a seção está em foco (scroll-spy) e baixo em repouso — a mesma
// ideia de "instrumento que reage" de outros conceitos do portfólio,
// mas aqui é literalmente o balde onde aquela flor mora na banca.
export default function Bancada() {
  const [ativo, setAtivo] = useState('topo')
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    const elementos = secoes
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visiveis = entries.filter((e) => e.isIntersecting)
        if (visiveis.length === 0) return
        const maisVisivel = visiveis.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b))
        const id = maisVisivel.target.getAttribute('id')
        if (id) setAtivo(id)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    elementos.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const irPara = (id: string) => {
    setMenuAberto(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Desktop: bancada fixa no topo com os baldes em cima da tábua */}
      <header className="fixed inset-x-0 top-0 z-40 hidden bg-bg/95 backdrop-blur lg:block">
        <div className="mx-auto flex max-w-5xl items-end justify-between px-6 pt-3">
          <button
            onClick={() => irPara('topo')}
            className="pb-3 font-display text-2xl font-bold tracking-tight text-ink"
          >
            Banca
          </button>

          <nav aria-label="Seções da banca" className="flex items-end gap-1">
            {secoes.map((s) => {
              const estaAtivo = ativo === s.id
              return (
                <button
                  key={s.id}
                  onClick={() => irPara(s.id)}
                  className="group flex flex-col items-center gap-1 rounded-t-lg px-3 pt-1 pb-0 transition-transform hover:-translate-y-0.5"
                  aria-current={estaAtivo ? 'true' : undefined}
                >
                  <Balde cor={s.cor} nivel={estaAtivo ? s.nivelAtivo : s.nivelRepouso} ativo={estaAtivo} tamanho={46} />
                  <span
                    className={`-mt-1 text-[0.72rem] font-semibold tracking-wide transition-colors ${
                      estaAtivo ? 'text-ink' : 'text-ink/70 group-hover:text-ink'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              )
            })}
          </nav>

          <button
            onClick={() => sendToWhatsApp('Olá! Quero encomendar um buquê da Banca.')}
            className="mb-3 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
          >
            Encomendar
          </button>
        </div>
        {/* a tábua da bancada */}
        <div className="h-2.5 w-full bg-kraft-escuro/90 shadow-[0_6px_14px_-6px_rgba(0,0,0,0.35)]" />
      </header>

      {/* Mobile: barra fina, os baldes ficam atrás de um menu */}
      <header className="fixed inset-x-0 top-0 z-40 lg:hidden">
        <div className="flex items-center justify-between border-b-2 border-kraft-escuro/80 bg-bg/95 px-4 py-3 backdrop-blur">
          <button onClick={() => irPara('topo')} className="font-display text-xl font-bold text-ink">
            Banca
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => sendToWhatsApp('Olá! Quero encomendar um buquê da Banca.')}
              className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg"
            >
              Encomendar
            </button>
            <button
              onClick={() => setMenuAberto((v) => !v)}
              aria-expanded={menuAberto}
              aria-label="Abrir seções"
              className="rounded-full border-2 border-ink/25 p-2 text-ink"
            >
              <BucketMenuIcon aberto={menuAberto} />
            </button>
          </div>
        </div>
        {menuAberto && (
          <nav aria-label="Seções da banca" className="grid grid-cols-4 gap-2 border-b-2 border-kraft-escuro/80 bg-bg px-4 py-4">
            {secoes.map((s) => {
              const estaAtivo = ativo === s.id
              return (
                <button key={s.id} onClick={() => irPara(s.id)} className="flex flex-col items-center gap-1">
                  <Balde cor={s.cor} nivel={estaAtivo ? s.nivelAtivo : s.nivelRepouso} ativo={estaAtivo} tamanho={40} />
                  <span className={`text-center text-[0.68rem] font-semibold ${estaAtivo ? 'text-ink' : 'text-ink/70'}`}>
                    {s.label}
                  </span>
                </button>
              )
            })}
          </nav>
        )}
      </header>
    </>
  )
}

function BucketMenuIcon({ aberto }: { aberto: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {aberto ? (
        <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path d="M3 6H17M3 10H17M3 14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  )
}
