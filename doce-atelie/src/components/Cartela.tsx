import { useEffect, useState } from 'react'

// A navegação vira a própria cartela de sabores — o leque de cores que já é
// o mecanismo do Hero (`FanDeck.tsx`) e o vocabulário da marca (`FanMark`).
// Em vez de uma lista de links soltos, cada seção do site é uma tira
// em miniatura do leque, presa numa borda comum e levemente aberta —
// como um leque de tinta de verdade. A seção ativa "sai" da fileira:
// perde a inclinação e sobe, igual a puxar uma tira pra fora do maço.
// Substitui `Nav.tsx` (barra fixa com logo + lista de links + botão,
// igual à de praticamente qualquer site).
const secoes = [
  { href: '#sabores', label: 'Sabores', code: 'DA 401', color: '#f5c93a' },
  { href: '#encomenda', label: 'Encomenda', code: 'DA 402', color: '#c4213a' },
  { href: '#docinhos', label: 'Docinhos', code: 'DA 403', color: '#f4b4bf' },
  { href: '#prazos', label: 'Prazos', code: 'DA 404', color: '#a2bb6f' },
] as const

function tilt(i: number, n: number) {
  return `${(i - (n - 1) / 2) * 6}deg`
}

export function FanMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g transform="translate(14 27)">
        <rect x="-3" y="-24" width="6" height="24" rx="1.2" fill="#f5c93a" transform="rotate(-24)" />
        <rect x="-3" y="-24" width="6" height="24" rx="1.2" fill="#a2bb6f" transform="rotate(4)" />
        <rect x="-3" y="-24" width="6" height="24" rx="1.2" fill="#c4213a" transform="rotate(32)" />
        <circle r="2.2" fill="#33190f" />
      </g>
    </svg>
  )
}

function useSecaoAtiva() {
  const [ativa, setAtiva] = useState<string>(secoes[0].href)

  useEffect(() => {
    const elementos = secoes
      .map((s) => document.getElementById(s.href.slice(1)))
      .filter((el): el is HTMLElement => !!el)
    if (elementos.length === 0) return

    // O callback só reporta os alvos cujo estado MUDOU desde a última
    // chamada, não uma foto completa de quem está visível agora — por isso
    // `visiveis` mantém o próprio registro, atualizado entrada a entrada, em
    // vez de tratar o lote da vez como a lista inteira (senão uma seção já
    // visível nunca é reconfirmada quando outra sai de vista, e a tira ativa
    // trava na antiga — mesmo bug achado e corrigido no Varal.tsx do
    // sabor-da-vila, a partir de um print do usuário).
    const visiveis = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) visiveis.set(e.target.id, e.boundingClientRect.top)
          else visiveis.delete(e.target.id)
        }
        const ordenado = [...visiveis.entries()].sort((a, b) => a[1] - b[1])
        if (ordenado[0]) setAtiva(`#${ordenado[0][0]}`)
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    elementos.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ativa
}

function Tira({
  secao,
  index,
  ativa,
  onClick,
}: {
  secao: (typeof secoes)[number]
  index: number
  ativa: boolean
  onClick?: () => void
}) {
  return (
    <a
      href={secao.href}
      onClick={onClick}
      data-active={ativa}
      aria-current={ativa ? 'true' : undefined}
      style={{ '--tilt': tilt(index, secoes.length) } as React.CSSProperties}
      className="cartela-tab flex w-16 shrink-0 flex-col items-center gap-1 rounded-lg border border-line bg-white px-1 pt-1.5 pb-2 text-center shadow-[-0.1em_0.15em_0.3em_rgb(51_25_15_/_0.1)]"
    >
      <span className="text-[0.6rem] font-semibold tabular-nums text-ink/65">{secao.code}</span>
      <span className="h-6 w-full rounded-[0.3em]" style={{ background: secao.color }} aria-hidden="true" />
      <span className="break-words text-[0.65rem] leading-tight font-semibold tracking-tight text-ink">{secao.label}</span>
    </a>
  )
}

export default function Cartela() {
  const ativa = useSecaoAtiva()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [ativa])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5 sm:px-6">
        <a href="#sabores" className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <FanMark className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
          <span className="display whitespace-nowrap text-xl sm:text-2xl">Doce Ateliê</span>
        </a>

        <nav className="hidden items-end gap-2 md:flex" aria-label="Seções, como uma cartela de sabores">
          {secoes.map((s, i) => (
            <Tira key={s.href} secao={s} index={i} ativa={ativa === s.href} />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a href="#encomenda" className="btn-cherry whitespace-nowrap px-3 py-2.5 text-sm sm:px-4 sm:text-[0.9375rem]">
            Montar meu bolo
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar seções' : 'Ver seções'}
            aria-expanded={open}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-ink/15 text-ink md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" className="h-5 w-5">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Seções, como uma cartela de sabores" className="border-t border-line bg-card px-5 py-4 md:hidden">
          <ul className="grid grid-cols-2 gap-2.5">
            {secoes.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  aria-current={ativa === s.href ? 'true' : undefined}
                  className={`flex items-stretch gap-3 overflow-hidden rounded-lg border transition-colors ${
                    ativa === s.href ? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]' : 'border-line'
                  }`}
                >
                  <span className="w-3 shrink-0" style={{ background: s.color }} aria-hidden="true" />
                  <span className="flex min-w-0 flex-col justify-center py-2">
                    <span className="text-[0.65rem] font-semibold tabular-nums text-ink/65">{s.code}</span>
                    <span className="font-semibold leading-tight">{s.label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
