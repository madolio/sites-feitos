import { useEffect, useState } from 'react'
import { nav } from '../config/site'
import { rotulos } from '../data/conteudo'

// A navegação não é uma barra: é uma fileira de orelhas de página dobradas, presa
// na borda da tela, como as dobras que um leitor deixa num livro usado para marcar
// onde parou. A seção ativa fica "mais dobrada" (maior, com o vinco em destaque).
// Os itens vêm de `nav` em site.ts; `href` é o id da seção.
const SECOES = nav.map((n) => ({ ...n, id: n.href.replace('#', '') }))

function useSecaoAtiva() {
  const [ativa, setAtiva] = useState<string>(SECOES[0]?.id ?? '')

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

    // A última seção fica mais baixa que a faixa de observação e pode nunca
    // "entrar" nela: força quando chega perto do fim da página.
    const onScroll = () => {
      const fimDaPagina = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      const ultima = SECOES[SECOES.length - 1]
      if (fimDaPagina && ultima) setAtiva(ultima.id)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return ativa
}

function Dobra({ ativa }: { ativa: boolean }) {
  return (
    <span
      className="relative block shrink-0 transition-[width,height] duration-300 ease-out"
      style={{ width: ativa ? 30 : 22, height: ativa ? 30 : 22 }}
      aria-hidden="true"
    >
      {/* a página, vista de baixo */}
      <span className="absolute inset-0 bg-paper shadow-[2px_2px_4px_rgba(0,0,0,0.35)]" />
      {/* a dobra em si, triângulo cortado no canto */}
      <span
        className={`absolute inset-0 transition-colors duration-300 ${ativa ? 'bg-accent opacity-90' : 'bg-idle opacity-60'}`}
        style={{ clipPath: 'polygon(100% 0, 100% 100%, 40% 100%)' }}
      />
    </span>
  )
}

export default function Orelha() {
  const ativa = useSecaoAtiva()

  return (
    <nav aria-label={rotulos.navegacao}>
      {/* Desktop: empilhada na borda direita, como orelhas subindo a lateral de um livro fechado */}
      <ul className="fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 flex-col gap-1 pr-1 lg:flex">
        {SECOES.map((s) => {
          const estaAtiva = ativa === s.id
          return (
            <li key={s.id}>
              <a
                href={s.href}
                aria-current={estaAtiva ? 'location' : undefined}
                aria-label={`${rotulos.irPara} ${s.label}`}
                className="relative flex min-h-11 min-w-11 items-center justify-center"
              >
                <span
                  className={`rotulo-mao pointer-events-none absolute right-full mr-1 whitespace-nowrap transition-opacity duration-200 ${estaAtiva ? 'opacity-100' : 'opacity-0'}`}
                >
                  {s.label}
                </span>
                <Dobra ativa={estaAtiva} />
              </a>
            </li>
          )
        })}
      </ul>

      {/* Mobile/tablet: fileira fixa no rodapé, dobras "sobem" da borda inferior */}
      <ul className="fixed inset-x-0 bottom-0 z-40 flex items-end justify-evenly gap-1 border-t border-foreground/10 bg-background/95 px-2 pt-1 pb-1 backdrop-blur-sm lg:hidden">
        {SECOES.map((s) => {
          const estaAtiva = ativa === s.id
          return (
            <li key={s.id} className="min-w-0">
              <a
                href={s.href}
                aria-current={estaAtiva ? 'location' : undefined}
                aria-label={`${rotulos.irPara} ${s.label}`}
                className="flex min-h-11 min-w-11 flex-col items-center justify-end gap-1 px-1"
              >
                <Dobra ativa={estaAtiva} />
                <span className={`rotulo-mao !text-base sm:!text-xl ${estaAtiva ? 'opacity-100' : 'opacity-75'}`}>{s.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
