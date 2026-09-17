import { useEffect, useRef, useState } from 'react'

// A navegação vira a própria linha de fundeio da âncora que dá nome à marca:
// uma corrente descendo verticalmente, marcada por elos a cada profundidade —
// exatamente como uma linha de fundeio real é marcada em metros pra quem
// solta a âncora saber quanto já pagou de corrente. Dupla leitura: é a
// "profundidade" financeira (deitar âncora = segurança patrimonial) e é o
// próprio objeto da marca, não decoração solta. Substitui `Nav.tsx`
// (barra fixa full-width com logo + links + botão, o mesmo "tell" de
// genérico que o resto do portfólio já vem eliminando).
export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="9" r="3.2" fill="none" stroke="#ab8a53" strokeWidth="1.6" />
      <path
        d="M16 12.5 V26 M8 19 a8 8 0 0 0 16 0 M4 19 h6 M22 19 h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

const profundidades = [
  { hash: '#inicio', label: 'Início', metros: '0 m' },
  { hash: '#servicos', label: 'Serviços', metros: '8 m' },
  { hash: '#processo', label: 'Como funciona', metros: '16 m' },
  { hash: '#equipe', label: 'Equipe', metros: '24 m' },
  { hash: '#contato', label: 'Contato', metros: '32 m' },
] as const

function useProfundidadeAtiva() {
  const [ativo, setAtivo] = useState<string>(profundidades[0].hash)

  useEffect(() => {
    const elementos = profundidades
      .map((p) => document.getElementById(p.hash.slice(1)))
      .filter((el): el is HTMLElement => !!el)
    if (elementos.length === 0) return

    // O callback só reporta os alvos cujo estado MUDOU desde a última
    // chamada, não uma foto completa de quem está visível agora — por isso
    // `visiveis` mantém o próprio registro, atualizado entrada a entrada,
    // em vez de tratar o lote da vez como a lista inteira. Sem isso, uma
    // seção que já estava visível (típico logo após um pulo direto pra uma
    // #âncora) nunca é reconfirmada quando outra sai de vista, e o estado
    // ativo trava no valor antigo (mesmo bug achado e corrigido no Varal.tsx
    // do sabor-da-vila, a partir de um print do usuário).
    const visiveis = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) visiveis.set(e.target.id, e.boundingClientRect.top)
          else visiveis.delete(e.target.id)
        }
        const ordenado = [...visiveis.entries()].sort((a, b) => a[1] - b[1])
        if (ordenado[0]) setAtivo(`#${ordenado[0][0]}`)
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    elementos.forEach((el) => observer.observe(el))

    // A última profundidade (#contato) é o próprio <footer>, o fim do
    // documento — a página não rola além dele, então o topo dessa seção
    // pode nunca entrar na faixa -20%/-60% do observer acima (rodapé curto
    // demais pra empurrar o próprio topo até lá). Sem isso, chegar no fim
    // da página pelo link "Contato" deixa o nav preso na profundidade
    // anterior (reportado pelo usuário com print: clicou "Contato", o site
    // foi pra lá, mas "Equipe" continuou marcada).
    const ultima = profundidades[profundidades.length - 1].hash
    const checarFim = () => {
      const noFim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (noFim) setAtivo(ultima)
    }
    window.addEventListener('scroll', checarFim, { passive: true })
    checarFim()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', checarFim)
    }
  }, [])

  return ativo
}

// Elo da corrente: dois anéis entrelaçados, o vocabulário visual de uma
// corrente de âncora de verdade — não um ponto ou traço genérico.
function Elo({ ativo }: { ativo: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <ellipse
        cx="9"
        cy="12"
        rx="5.2"
        ry="3.3"
        transform="rotate(38 9 12)"
        fill="none"
        stroke="currentColor"
        strokeOpacity={ativo ? 1 : 0.4}
        strokeWidth="1.6"
      />
      <ellipse
        cx="15"
        cy="12"
        rx="5.2"
        ry="3.3"
        transform="rotate(38 15 12)"
        fill="none"
        stroke="currentColor"
        strokeOpacity={ativo ? 1 : 0.4}
        strokeWidth="1.6"
      />
    </svg>
  )
}

// A corda/corrente atrás dos elos: um traço fraco do topo ao fundo (a linha
// de fundeio inteira, ainda enrolada) e um traço latão sólido sobrepondo até
// a profundidade ativa (a corrente já paga pra fora) — o próprio scroll-spy
// vira o indicador de progresso, sem precisar de uma barra separada.
function Corda({ progresso }: { progresso: number }) {
  return (
    <div className="absolute top-2 bottom-2 left-[1.6rem] -z-10 w-[2px] bg-paper/15" aria-hidden="true">
      <div
        className="fundeio-progresso w-full bg-brass"
        style={{ height: `${progresso * 100}%` }}
      />
    </div>
  )
}

export default function Fundeio() {
  const ativo = useProfundidadeAtiva()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const indiceAtivo = profundidades.findIndex((p) => p.hash === ativo)
  const progresso = indiceAtivo <= 0 ? 0 : indiceAtivo / (profundidades.length - 1)

  useEffect(() => {
    setOpen(false)
  }, [ativo])

  return (
    <>
      {/* Desktop: coluna fixa à esquerda, sempre visível — a linha de
          fundeio fica montada, não escondida atrás de scroll. */}
      <header className="fixed inset-y-0 left-0 z-50 hidden w-56 flex-col border-r border-paper/10 bg-indigo text-paper lg:flex">
        <a href="#inicio" className="flex items-center gap-2.5 border-b border-paper/10 px-6 py-5">
          <Mark className="h-7 w-7" />
          <span className="font-serif text-xl">Âncora</span>
        </a>

        <nav aria-label="Seções, marcadas por profundidade" className="relative flex-1 py-8 pl-6 text-paper/80">
          <Corda progresso={progresso} />
          <ul className="space-y-7">
            {profundidades.map((p) => (
              <li key={p.hash}>
                <a
                  href={p.hash}
                  className={`flex items-center gap-3 text-[0.9375rem] font-medium transition-colors ${
                    ativo === p.hash ? 'text-brass' : 'hover:text-paper'
                  }`}
                >
                  <Elo ativo={ativo === p.hash} />
                  <span className="flex flex-col leading-tight">
                    {p.label}
                    <span className="mono text-[0.6875rem] text-paper/50">{p.metros}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-paper/10 p-5">
          <a href="#contato" className="btn-brass w-full">
            Agendar diagnóstico
          </a>
        </div>
      </header>

      {/* Mobile/tablet: sem espaço pra coluna — vira uma barra fina no topo
          com só a marca e o CTA. As profundidades ficam acessíveis por um
          menu que abre por baixo, não escondidas sem pista nenhuma. */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-3.5">
          <a href="#inicio" className="flex items-center gap-2.5 text-indigo">
            <Mark className="h-7 w-7" />
            <span className="font-serif text-xl">Âncora</span>
          </a>
          <div className="flex items-center gap-2">
            <a href="#contato" className="btn-brass px-4 py-2 text-[0.9375rem]">
              Agendar
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Fechar seções' : 'Ver seções'}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-indigo/15 text-indigo"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" className="h-5 w-5">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav ref={menuRef} aria-label="Seções, marcadas por profundidade" className="border-t border-line bg-paper px-5 py-4">
            <ul className="space-y-1">
              {profundidades.map((p) => (
                <li key={p.hash}>
                  <a
                    href={p.hash}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-sm px-2 py-2.5 text-[0.9375rem] font-medium ${
                      ativo === p.hash ? 'bg-indigo/5 text-brass' : 'text-indigo/75'
                    }`}
                  >
                    <Elo ativo={ativo === p.hash} />
                    {p.label}
                    <span className="mono ml-auto text-[0.6875rem] text-indigo/45">{p.metros}</span>
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
