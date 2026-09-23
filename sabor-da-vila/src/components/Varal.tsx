import { useEffect, useState } from 'react'

// Em qualquer chapeiro de hamburgueria de verdade, os pedidos ficam
// pendurados num varal — um arame esticado, cada comanda de papel presa por
// um clipe, balançando um pouco. A navegação vira esse objeto literal do
// balcão em vez da barra de links genérica que praticamente todo site tem
// (substitui `Nav.tsx`). É só a navegação — o carrinho/comanda de verdade já
// existe em `Comanda.tsx` e não é duplicado aqui.
const secoes = [
  { id: 'cardapio', label: 'Cardápio', rot: -3 },
  { id: 'onde', label: 'Onde e horário', rot: 4 },
] as const

// A secao ativa e CALCULADA a partir da posicao de rolagem: a ultima (na ordem
// do documento) cujo topo ja passou de uma linha de leitura a 35% da janela.
// Exatamente uma fica ativa. A versao anterior reconstruia o estado de eventos
// do IntersectionObserver guardando o boundingClientRect.top do instante da
// entrada (nunca atualizado) numa faixa de so 15% da janela, e travava ou
// pulava. Um clique fixa o item no destino enquanto a rolagem acontece e libera
// quando ela realmente para (scrollend, com ociosidade de eventos de fallback).
const LINHA_DE_LEITURA = 0.35

function useSecaoAtiva() {
  const [ativa, setAtiva] = useState<string>('inicio')

  useEffect(() => {
    const ids = ['inicio', ...secoes.map((s) => s.id)]
    const elementos = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (elementos.length === 0) return
    const ultima = elementos[elementos.length - 1].id

    let quadro = 0
    let ociosidade = 0
    let destino: string | null = null

    const calcular = () => {
      quadro = 0
      if (destino) return
      const linha = window.innerHeight * LINHA_DE_LEITURA
      const noFim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let atual = elementos[0].id
      for (const el of elementos) {
        if (el.getBoundingClientRect().top <= linha) atual = el.id
        else break
      }
      setAtiva(noFim ? ultima : atual)
    }
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(calcular)
    }
    const liberar = () => {
      destino = null
      agendar()
    }
    const aoRolar = () => {
      agendar()
      if (destino) {
        window.clearTimeout(ociosidade)
        ociosidade = window.setTimeout(liberar, 140)
      }
    }
    const aoClicar = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]')
      const id = link?.getAttribute('href')?.slice(1)
      if (!id || !ids.includes(id)) return
      destino = id
      setAtiva(id)
      window.clearTimeout(ociosidade)
      ociosidade = window.setTimeout(liberar, 600)
    }

    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('scrollend', liberar)
    window.addEventListener('resize', agendar)
    document.addEventListener('click', aoClicar)
    calcular()

    return () => {
      cancelAnimationFrame(quadro)
      window.clearTimeout(ociosidade)
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('scrollend', liberar)
      window.removeEventListener('resize', agendar)
      document.removeEventListener('click', aoClicar)
    }
  }, [])

  return ativa
}

export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="17" fill="#ffe800" style={{ mixBlendMode: 'multiply' }} />
      <circle cx="17" cy="18" r="17" fill="#ff48b0" style={{ mixBlendMode: 'multiply' }} />
      <circle cx="23" cy="22" r="15" fill="none" stroke="#3255a4" strokeWidth="2.5" />
    </svg>
  )
}

// O prendedor que segura a comanda no arame — um corpo curto em cima do fio
// e um pino descendo até o papel.
function Clipe({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 22" className={className} aria-hidden="true">
      <rect x="4.5" y="0.5" width="7" height="8.5" rx="2" fill="currentColor" />
      <rect x="6.5" y="6.5" width="3" height="15" fill="currentColor" />
    </svg>
  )
}

function Fio() {
  return (
    <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-2.5 w-full text-ink/25" aria-hidden="true">
      <path d="M0,2.5 Q50,9 100,2.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export default function Varal() {
  const ativa = useSecaoAtiva()

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-paper/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex items-center justify-between gap-4 py-2">
          <a href="#inicio" className="flex items-center gap-2">
            <Mark className="h-8 w-8 sm:h-9 sm:w-9" />
            <span className="poster text-xl text-blue sm:text-2xl">Sabor da Vila</span>
          </a>
          <a href="#cardapio" className="btn-blue px-4 py-2 text-[0.9375rem] sm:px-5 sm:py-2.5 sm:text-base">
            Fazer pedido
          </a>
        </div>
      </div>

      {/* O varal em si: um arame com as comandas do cardápio penduradas por
          clipes, balançando levemente — a seção ativa fica "espetada" reta,
          sem balanço, como se tivesse acabado de ser pendurada. */}
      <nav aria-label="Seções" className="relative border-t-[3px] border-blue">
        <Fio />
        <ul className="mx-auto flex max-w-6xl items-start gap-6 px-5 pt-2 pb-3 sm:gap-9 sm:px-6 sm:pt-2.5 sm:pb-3.5">
          {secoes.map((s) => {
            const ativo = ativa === s.id
            return (
              <li key={s.id} className="flex flex-col items-center">
                <Clipe className={`h-3.5 w-3.5 ${ativo ? 'text-pink' : 'text-ink/50'}`} />
                <a
                  href={`#${s.id}`}
                  aria-current={ativo ? 'true' : undefined}
                  className={`ticket -mt-0.5 rounded-sm border-2 px-3 py-1.5 text-sm font-bold whitespace-nowrap sm:text-[0.9375rem] ${
                    ativo ? 'ticket-ativa border-blue bg-blue text-paper' : 'border-blue/70 bg-paper text-ink hover:border-blue hover:text-blue'
                  }`}
                  style={{ '--rot': `${s.rot}deg` } as React.CSSProperties}
                >
                  {s.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
