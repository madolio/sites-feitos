import { useEffect, useState } from 'react'

// A navegação do Sebo Marginália não é uma barra — é uma fileira de orelhas
// de página dobradas, presa na borda da tela, exatamente como as dobras que
// um leitor deixa num livro usado pra marcar onde parou. A seção ativa fica
// "mais dobrada" (maior, com o vinco em carimbo) que as outras.
const SECOES = [
  { id: 'inicio', label: 'capa' },
  { id: 'acervo', label: 'acervo' },
  { id: 'processo', label: 'avaliação' },
  { id: 'contato', label: 'contato' },
] as const

function useSecaoAtiva() {
  const [ativa, setAtiva] = useState<string>('inicio')

  useEffect(() => {
    const elementos = SECOES.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setAtiva(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    elementos.forEach((el) => observer.observe(el))

    // A última seção (contato) fica mais baixa que a faixa de observação e
    // pode nunca "entrar" nela — força quando chega perto do fim da página.
    const onScroll = () => {
      const fimDaPagina = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      if (fimDaPagina) setAtiva('contato')
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return ativa
}

function Dobra({ ativa, sobrePano }: { ativa: boolean; sobrePano: boolean }) {
  return (
    <span
      className="relative block shrink-0 transition-[width,height] duration-300 ease-out"
      style={{ width: ativa ? 30 : 22, height: ativa ? 30 : 22 }}
      aria-hidden="true"
    >
      {/* a página, vista de baixo */}
      <span
        className="absolute inset-0"
        style={{
          background: sobrePano ? 'var(--color-pagina)' : 'var(--color-pagina-2)',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.35)',
        }}
      />
      {/* a dobra em si, triângulo cortado no canto */}
      <span
        className="absolute inset-0 transition-colors duration-300"
        style={{
          background: ativa ? 'var(--color-carimbo)' : 'var(--color-grafite-escuro)',
          clipPath: 'polygon(100% 0, 100% 100%, 40% 100%)',
          opacity: ativa ? 0.9 : 0.55,
        }}
      />
    </span>
  )
}

export default function Orelha() {
  const ativa = useSecaoAtiva()

  const ir = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav aria-label="Navegação principal">
      {/* Desktop: empilhada na borda direita, como orelhas subindo a lateral de um livro fechado */}
      <ul className="fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 flex-col gap-3 pr-1 lg:flex">
        {SECOES.map((s) => {
          const estaAtiva = ativa === s.id
          return (
            <li key={s.id} className="flex items-center justify-end gap-2">
              <span
                className={`rotulo-mao whitespace-nowrap transition-opacity duration-200 ${
                  estaAtiva ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {s.label}
              </span>
              <button
                type="button"
                onClick={() => ir(s.id)}
                aria-current={estaAtiva ? 'true' : undefined}
                aria-label={`Ir para ${s.label}`}
                className="cursor-pointer p-1"
              >
                <Dobra ativa={estaAtiva} sobrePano />
              </button>
            </li>
          )
        })}
      </ul>

      {/* Mobile/tablet: fileira fixa no rodapé, dobras "sobem" da borda inferior */}
      <ul className="fixed inset-x-0 bottom-0 z-40 flex items-end justify-center gap-6 border-t border-creme/10 bg-pano/95 px-4 pt-2 pb-2 backdrop-blur-sm lg:hidden">
        {SECOES.map((s) => {
          const estaAtiva = ativa === s.id
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => ir(s.id)}
                aria-current={estaAtiva ? 'true' : undefined}
                aria-label={`Ir para ${s.label}`}
                className="flex cursor-pointer flex-col items-center gap-1"
              >
                <Dobra ativa={estaAtiva} sobrePano />
                <span className={`rotulo-mao text-lg ${estaAtiva ? 'opacity-100' : 'opacity-60'}`}>{s.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
