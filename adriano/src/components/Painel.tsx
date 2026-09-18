import { useEffect, useState, type ComponentType } from 'react'
import { linkWhatsApp } from '../contato'
import { PROFISSIONAL } from '../dados'
import { Amperimetro, Horimetro, Manometro, Sinaleiro } from './Instrumentos'

// A navegação é o painel de instrumentos da instalação, não uma barra de
// links: cada seção é um estágio marcado pelo instrumento do seu ofício —
// manômetro na água (P&ID), amperímetro na elétrica (unifilar) — e a agulha
// aponta cheio só no estágio em que a página está.
//
// Cada estágio carrega SÓ a cor do próprio ofício, inclusive no trilho
// tracejado que desce atrás dos instrumentos: a coluna em si é neutra
// (grafite + branco), então nenhum elemento mistura água com elétrica.
type Cor = 'agua' | 'eletrica' | 'neutro'

type Estagio = {
  id: string
  label: string
  Instrumento: ComponentType<{ ativo: boolean }>
  cor: Cor
}

const estagios: Estagio[] = [
  { id: 'agua', label: 'Água', Instrumento: Manometro, cor: 'agua' },
  { id: 'eletrica', label: 'Elétrica', Instrumento: Amperimetro, cor: 'eletrica' },
  { id: 'sobre', label: 'Experiência', Instrumento: Horimetro, cor: 'neutro' },
  { id: 'contato', label: 'Contato', Instrumento: Sinaleiro, cor: 'neutro' },
]

// Sobre o grafite do painel as versões de texto (`agua`, `eletrica`) não
// alcançam 4.5:1 — aqui valem só as versões `-luz`, medidas em 6.8:1 e 8.6:1.
const noEscuro: Record<Cor, string> = {
  agua: 'text-agua-luz',
  eletrica: 'text-eletrica-luz',
  neutro: 'text-white',
}

const noClaro: Record<Cor, string> = {
  agua: 'text-agua',
  eletrica: 'text-eletrica',
  neutro: 'text-grafite',
}

const trilho: Record<Cor, string> = {
  agua: 'var(--color-agua-luz)',
  eletrica: 'var(--color-eletrica-luz)',
  neutro: 'rgb(255 255 255 / 0.4)',
}

function useEstagioAtivo() {
  const [ativo, setAtivo] = useState<string | null>(null)

  useEffect(() => {
    const alvos = estagios
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null)
    if (alvos.length === 0) return

    // O callback só reporta o que MUDOU desde a chamada anterior, não uma
    // foto de quem está visível agora — por isso o registro próprio, que é
    // atualizado entrada a entrada (mesmo bug já corrigido no Nascente: sem
    // isso o estágio ativo trava no antigo quando outro sai de vista).
    const visiveis = new Map<string, number>()

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) visiveis.set(e.target.id, e.boundingClientRect.top)
          else visiveis.delete(e.target.id)
        }
        const ordenado = [...visiveis.entries()].sort((a, b) => a[1] - b[1])
        setAtivo(ordenado[0]?.[0] ?? null)
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    alvos.forEach((el) => observador.observe(el))
    return () => observador.disconnect()
  }, [])

  return ativo
}

export default function Painel() {
  const ativo = useEstagioAtivo()
  const [aberto, setAberto] = useState(false)

  const whatsapp = linkWhatsApp(
    'Olá! Vi seu site e gostaria de saber mais sobre os serviços.',
  )

  return (
    <>
      {/* Desktop: a coluna fica montada na lateral, sempre visível — um
          painel de instrumentos não some quando o operador anda pela casa. */}
      <header className="escuro fixed inset-y-0 left-0 z-50 hidden w-56 flex-col border-r border-white/10 bg-grafite text-white lg:flex">
        <a href="#inicio" className="block border-b border-white/10 px-6 py-5">
          <span className="font-heading text-[0.9375rem] leading-tight font-extrabold">
            {PROFISSIONAL.nome}
          </span>
          <span className="mt-1 block text-xs text-white/55">{PROFISSIONAL.regiao}</span>
        </a>

        <nav aria-label="Seções" className="flex-1 py-8 pl-6 pr-4">
          <ul className="space-y-7">
            {estagios.map((e, i) => {
              const estaAtivo = ativo === e.id
              return (
                <li key={e.id} className="relative">
                  {i < estagios.length - 1 && (
                    <>
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-7 left-[9px] top-5 w-[2px] bg-white/12"
                      />
                      <span
                        aria-hidden="true"
                        style={{ color: trilho[e.cor] }}
                        className="painel-trilho absolute -bottom-7 left-[9px] top-5 w-[2px]"
                      />
                    </>
                  )}
                  <a
                    href={`#${e.id}`}
                    aria-current={estaAtivo ? 'location' : undefined}
                    className={`relative flex items-center gap-3 text-[0.9375rem] font-medium transition-colors ${
                      estaAtivo ? noEscuro[e.cor] : 'text-white/65 hover:text-white'
                    } ${e.cor === 'eletrica' ? 'foco-eletrica' : ''}`}
                  >
                    <e.Instrumento ativo={estaAtivo} />
                    {e.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-5">
          <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-claro w-full">
            Falar no WhatsApp
          </a>
        </div>
      </header>

      {/* Mobile/tablet: sem espaço pra coluna — vira uma barra fina com o
          nome e o WhatsApp, e os estágios abrem num menu logo abaixo. */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-linha bg-white/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-3">
          <a
            href="#inicio"
            className="min-w-0 truncate font-heading text-sm font-extrabold text-grafite"
          >
            {PROFISSIONAL.nome}
          </a>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn-escuro px-4 py-2 text-sm"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-label={aberto ? 'Fechar seções' : 'Ver seções'}
              aria-expanded={aberto}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-grafite/20 text-grafite"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                {aberto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {aberto && (
          <nav aria-label="Seções" className="border-t border-linha bg-white px-5 py-3">
            <ul>
              {estagios.map((e) => {
                const estaAtivo = ativo === e.id
                return (
                  <li key={e.id}>
                    <a
                      href={`#${e.id}`}
                      onClick={() => setAberto(false)}
                      aria-current={estaAtivo ? 'location' : undefined}
                      className={`flex items-center gap-3 rounded-sm px-2 py-2.5 text-[0.9375rem] font-medium ${
                        estaAtivo ? `bg-superficie ${noClaro[e.cor]}` : 'text-fumo'
                      } ${e.cor === 'eletrica' ? 'foco-eletrica' : ''}`}
                    >
                      <e.Instrumento ativo={estaAtivo} />
                      {e.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        )}
      </header>
    </>
  )
}
