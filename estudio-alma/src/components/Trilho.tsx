import { useEffect, useState } from 'react'
import { Mark } from './Mark'

// A navegação vira o próprio aparelho do pilates: o reformer é um carrinho
// (carriage) que desliza sobre um trilho, preso por molas de tensão — o
// equipamento mais reconhecível da modalidade, não um ícone genérico de
// "boneco fazendo pose" (esse já é o assunto do Hero, em Figure.tsx).
// Substitui `Nav.tsx` (barra fixa full-width com logo + links + botão, o
// mesmo "tell" de design genérico que o resto do portfólio já vem
// eliminando projeto por projeto — ver `Painel.tsx` do Nascente, a
// referência de método).
//
// Cada seção é um "ponto de tensão" ao longo do trilho, marcado por uma
// mola (`Mola`, zigue-zague em SVG) na cor daquela mola do reformer — as
// mesmas quatro cores já usadas no resto do site (Aulas.tsx, Instrutora.tsx).
// O "carrinho" (`Carrinho`) é a barra que desliza e se alinha com a seção
// ativa, pousada sobre o trilho.
const paradas = [
  { id: 'inicio', label: 'Início', cor: 'var(--color-amarela)' },
  { id: 'aulas', label: 'Aulas', cor: 'var(--color-verde)' },
  { id: 'horarios', label: 'Horários', cor: 'var(--color-azul)' },
  { id: 'helena', label: 'Instrutora', cor: 'var(--color-vermelha)' },
  { id: 'experimental', label: 'Experimental', cor: 'var(--color-amarela)' },
] as const

function useParadaAtiva() {
  const [ativo, setAtivo] = useState<string>(paradas[0].id)

  useEffect(() => {
    const elementos = paradas.map((p) => document.getElementById(p.id)).filter((el): el is HTMLElement => !!el)
    if (elementos.length === 0) return

    const observer = new IntersectionObserver(
      (entradas) => {
        const visiveis = entradas.filter((e) => e.isIntersecting)
        if (visiveis.length === 0) return
        const maisVisivel = visiveis.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        setAtivo(maisVisivel.target.id)
      },
      { rootMargin: '-15% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    elementos.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ativo
}

// Zigue-zague vertical: a mola de tensão em cada parada. Comprime (traço
// mais grosso, opacidade cheia) quando a parada está ativa — a mesma ideia
// das molas reais do reformer, que ficam mais "carregadas" sob tensão.
function Mola({ cor, ativa }: { cor: string; ativa: boolean }) {
  return (
    <svg viewBox="0 0 20 40" className="h-9 w-5 shrink-0" aria-hidden="true">
      <path
        d="M10 1 V6 L16 10 L4 14 L16 18 L4 22 L16 26 L4 30 L10 34 V39"
        fill="none"
        stroke={cor}
        strokeOpacity={ativa ? 1 : 0.4}
        strokeWidth={ativa ? 2.75 : 1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="motion-safe:transition-[stroke-width,stroke-opacity] motion-safe:duration-300"
      />
    </svg>
  )
}

// Os dois trilhos metálicos paralelos, de ponta a ponta da coluna.
function Trilhos() {
  return (
    <svg
      viewBox="0 0 20 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-y-0 left-2.5 -z-10 h-full w-5 text-gesso"
      aria-hidden="true"
    >
      <line x1="2" y1="0" x2="2" y2="100" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="18" y1="0" x2="18" y2="100" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
    </svg>
  )
}

const PASSO = 4.75 // rem — distância vertical entre o centro de cada parada

// A barra que desliza sobre o trilho até a parada ativa — o carrinho do
// reformer. Em rem (não medido em px via DOM) porque o ritmo vertical das
// paradas é fixo por CSS; evita ResizeObserver só pra isso.
function Carrinho({ indice, cor }: { indice: number; cor: string }) {
  return (
    <div
      aria-hidden="true"
      className="motion-safe:transition-[top] motion-safe:duration-500 motion-safe:ease-out absolute left-0 h-14 w-full border-y-2"
      style={{ top: `${indice * PASSO}rem`, borderColor: cor, background: 'color-mix(in srgb, var(--color-gesso) 12%, transparent)' }}
    >
      <span className="absolute top-1/2 left-2.5 h-1.5 w-1.5 -translate-y-1/2 rounded-full" style={{ background: cor }} />
      <span className="absolute top-1/2 right-2.5 h-1.5 w-1.5 -translate-y-1/2 rounded-full" style={{ background: cor }} />
    </div>
  )
}

export default function Trilho() {
  const ativo = useParadaAtiva()
  const indiceAtivo = paradas.findIndex((p) => p.id === ativo)
  const corAtiva = paradas[Math.max(indiceAtivo, 0)].cor
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [ativo])

  return (
    <>
      {/* Desktop: coluna fixa à esquerda, sempre visível — o trilho do
          reformer fica montado ali, não escondido atrás de scroll. */}
      <header className="fixed inset-y-0 left-0 z-50 hidden w-56 flex-col border-r-2 border-ink bg-ink text-gesso lg:flex">
        <a href="#inicio" className="flex items-center gap-2.5 border-b border-gesso/15 px-6 py-5">
          <Mark className="h-8 w-8" />
          <span className="text-lg font-medium tracking-tight">estúdio alma</span>
        </a>

        <nav aria-label="Seções" className="relative flex-1 py-9 pl-8 pr-5">
          <Trilhos />
          <Carrinho indice={Math.max(indiceAtivo, 0)} cor={corAtiva} />
          <ul className="relative" style={{ height: `${(paradas.length - 1) * PASSO + 3.5}rem` }}>
            {paradas.map((p, i) => (
              <li key={p.id} className="absolute inset-x-0 flex items-center" style={{ top: `${i * PASSO}rem`, height: '3.5rem' }}>
                <a href={`#${p.id}`} className="flex w-full items-center gap-3 pl-1">
                  <Mola cor={p.cor} ativa={ativo === p.id} />
                  <span className={`text-[0.9375rem] font-medium transition-colors ${ativo === p.id ? 'text-gesso' : 'text-gesso/65 hover:text-gesso'}`}>
                    {p.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* O footbar do reformer: a barra onde se apoia o pé — aqui, o CTA
            fixo no pé da coluna. */}
        <a href="#experimental" className="border-t-2 border-gesso/15 bg-amarela px-6 py-4 text-center font-medium text-ink transition-colors hover:bg-gesso">
          Aula experimental
        </a>
      </header>

      {/* Mobile/tablet: sem espaço pra coluna — vira uma barra fina no topo
          com só a marca e o CTA. As paradas ficam acessíveis por um menu que
          abre embaixo, não escondidas sem pista nenhuma. */}
      <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-ink bg-gesso/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-3">
          <a href="#inicio" className="flex items-center gap-2">
            <Mark className="h-7 w-7" />
            <span className="text-lg font-medium tracking-tight">estúdio alma</span>
          </a>
          <div className="flex items-center gap-2">
            <a href="#experimental" className="btn-ink px-4 py-2 text-[0.9375rem]">
              Aula experimental
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Fechar seções' : 'Ver seções'}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center border-2 border-ink text-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" className="h-5 w-5">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav aria-label="Seções" className="border-t-2 border-ink bg-gesso px-5 py-3">
            <ul className="space-y-1">
              {paradas.map((p) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-2 py-2.5 text-[0.9375rem] font-medium ${
                      ativo === p.id ? 'bg-ink text-gesso' : 'text-ink/75'
                    }`}
                  >
                    <Mola cor={p.cor} ativa={ativo === p.id} />
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  )
}
