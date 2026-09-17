import { useEffect, useRef, useState } from 'react'

// A navegação vira o CARIMBO DE PRANCHA (title block) — a caixa no canto
// inferior direito que toda prancha de arquitetura de verdade tem, com o
// índice de pranchas do projeto. Substitui `Nav.tsx` (barra fixa full-width,
// o "tell" de design genérico que o resto do portfólio já vem eliminando).
// Diferente do Cerne (que navega clicando num cômodo da planta baixa): aqui
// é a ficha técnica do desenho, não o desenho em si.
export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M4 28 V6 H20 V28 M4 16 H20 M26 6 V28" fill="none" stroke="#22201b" strokeWidth="1.6" />
      <circle cx="26" cy="6" r="2.2" fill="#c9962d" />
    </svg>
  )
}

const pranchas = [
  { id: 'inicio', num: '01', label: 'Apresentação' },
  { id: 'projetos', num: '02', label: 'Projetos' },
  { id: 'processo', num: '03', label: 'Processo' },
  { id: 'estudio', num: '04', label: 'Estúdio' },
  { id: 'contato', num: '05', label: 'Contato' },
] as const

function usePranchaAtiva() {
  const [ativa, setAtiva] = useState<string>(pranchas[0].id)

  useEffect(() => {
    const elementos = pranchas
      .map((p) => document.getElementById(p.id))
      .filter((el): el is HTMLElement => !!el)
    if (elementos.length === 0) return

    // O callback só reporta os alvos cujo estado MUDOU desde a última
    // chamada, não uma foto completa de quem está visível agora — por isso
    // `visiveis` mantém o próprio registro, atualizado entrada a entrada, em
    // vez de tratar o lote da vez como a lista inteira (senão uma prancha já
    // visível nunca é reconfirmada quando outra sai de vista, e a ativa
    // trava no valor antigo — mesmo bug achado e corrigido no Varal.tsx do
    // sabor-da-vila, a partir de um print do usuário).
    const visiveis = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) visiveis.set(e.target.id, e.boundingClientRect.top)
          else visiveis.delete(e.target.id)
        }
        const ordenado = [...visiveis.entries()].sort((a, b) => a[1] - b[1])
        if (ordenado[0]) setAtiva(ordenado[0][0])
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    elementos.forEach((el) => observer.observe(el))

    // Fallback: a última seção (Contato, o rodapé) costuma ser mais baixa
    // do que a margem inferior da faixa de observação acima — nesse caso
    // ela nunca "entra" na faixa mesmo com a página rolada até o fim, e a
    // prancha anterior fica presa como ativa. Perto do fim real da página,
    // força a última prancha.
    function aoRolar() {
      const pertoDoFim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (pertoDoFim) setAtiva(pranchas[pranchas.length - 1].id)
    }
    window.addEventListener('scroll', aoRolar, { passive: true })
    aoRolar()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', aoRolar)
    }
  }, [])

  return ativa
}

export default function Carimbo() {
  const ativa = usePranchaAtiva()
  const [open, setOpen] = useState(false)
  const painelRef = useRef<HTMLDivElement>(null)
  const atual = pranchas.find((p) => p.id === ativa) ?? pranchas[0]

  useEffect(() => {
    if (!open) return

    function aoClicarFora(e: MouseEvent) {
      if (painelRef.current && !painelRef.current.contains(e.target as Node)) setOpen(false)
    }
    function aoTeclar(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', aoClicarFora)
    document.addEventListener('keydown', aoTeclar)
    return () => {
      document.removeEventListener('mousedown', aoClicarFora)
      document.removeEventListener('keydown', aoTeclar)
    }
  }, [open])

  return (
    <div ref={painelRef} className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      {/* Painel expandido: o carimbo completo, com o índice de pranchas do
          projeto — nome do escritório, lista numerada com a seção atual
          destacada, e o CTA de contato como se fosse o campo de assinatura. */}
      <div
        id="carimbo-painel"
        className={`mb-3 w-64 origin-bottom-right border border-ink bg-paper/97 backdrop-blur transition-all motion-reduce:transition-none ${
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
          <Mark className="h-5 w-5" />
          <span className="font-serif text-base">Traço</span>
          <span className="ml-auto text-[0.6875rem] tracking-wide text-ink/55">ÍNDICE</span>
        </div>

        <nav aria-label="Índice de pranchas" className="px-1 py-1.5">
          <ul>
            {pranchas.map((p) => (
              <li key={p.id}>
                <a
                  href={`#${p.id}`}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className={`flex items-baseline gap-3 px-3 py-2 text-[0.9375rem] transition-colors ${
                    ativa === p.id ? 'bg-ink text-paper' : 'text-ink/80 hover:bg-line/40 hover:text-ink'
                  }`}
                >
                  <span className={`font-serif text-sm ${ativa === p.id ? 'text-ochre' : 'text-blueline'}`}>{p.num}</span>
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="dim-line px-3">
          <span className="text-[0.6875rem]">SP · ESC S/ESC.</span>
        </div>

        <div className="p-3 pt-2.5">
          <a href="#contato" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="btn-ink block w-full py-2.5 text-center text-[0.9375rem]">
            Falar com o estúdio
          </a>
        </div>
      </div>

      {/* Aba recolhida: um carimbo em miniatura, sempre visível, mostrando
          só o número da prancha atual — quem quiser o índice completo clica
          pra abrir; quem só quer saber "onde estou" já vê isso fechado. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="carimbo-painel"
        aria-label={open ? 'Fechar índice de pranchas' : `Abrir índice de pranchas — prancha atual: ${atual.num} ${atual.label}`}
        className="ml-auto flex w-24 flex-col items-end border border-ink bg-paper/95 px-3 py-2 text-right backdrop-blur transition-colors hover:bg-line/30"
      >
        <span className="text-[0.625rem] tracking-wide text-ink/55">PRANCHA</span>
        <span className="font-serif text-2xl leading-none">{atual.num}</span>
      </button>
    </div>
  )
}
