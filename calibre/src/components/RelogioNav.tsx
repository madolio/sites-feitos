import { useEffect, useRef, useState } from 'react'

// A navegação virou o próprio mostrador: um relógio analógico de verdade,
// com ponteiros correndo no horário real (atualizado a cada segundo), e só
// três marcas da hora (12, 4 e 8) são clicáveis — cada uma leva a uma seção.
// Substitui de vez a cena 3D do calibre montando: não é mais sobre ver o
// mecanismo por dentro, é sobre o relógio funcionando de verdade, ao vivo,
// na tela.
const secoes = [
  { id: 'catalogo', label: 'Modelos', angulo: 0 },
  { id: 'processo', label: 'Como nasce', angulo: 120 },
  { id: 'contato', label: 'Encomendar', angulo: 240 },
]

const R_MOSTRADOR = 90
const R_MARCA = 78
const R_LABEL = 112

function ponto(angulo: number, raio: number) {
  const rad = ((angulo - 90) * Math.PI) / 180
  return { x: 100 + Math.cos(rad) * raio, y: 100 + Math.sin(rad) * raio }
}

// `compacto` é a versão que mora na barra fixa (Nav.tsx): sem rótulo de
// texto (só os pontinhos, com `title` pra acessibilidade), porque o
// mostrador grande do Hero desaparece da tela ao rolar — sem essa versão,
// a página ficaria sem navegação persistente nenhuma depois do primeiro
// scroll, diferente do padrão do resto do repositório (nav sempre fixa).
export default function RelogioNav({ compacto = false }: { compacto?: boolean }) {
  const [agora, setAgora] = useState(() => new Date())
  const [ativo, setAtivo] = useState('catalogo')

  useEffect(() => {
    const id = window.setInterval(() => setAgora(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const observando = useRef(false)
  useEffect(() => {
    if (observando.current) return
    observando.current = true
    const alvos = secoes.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entradas) => {
        const visiveis = entradas.filter((e) => e.isIntersecting)
        if (visiveis.length === 0) return
        const maisVisivel = visiveis.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b))
        setAtivo(maisVisivel.target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    alvos.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const horas = agora.getHours() % 12
  const minutos = agora.getMinutes()
  const segundos = agora.getSeconds()

  const anguloHoras = (horas + minutos / 60) * 30
  const anguloMinutos = (minutos + segundos / 60) * 6
  const anguloSegundos = segundos * 6

  const marcas = Array.from({ length: 12 }, (_, i) => {
    const ang = i * 30
    const p1 = ponto(ang, i % 3 === 0 ? 74 : 82)
    const p2 = ponto(ang, 90)
    return { ...p1, x2: p2.x, y2: p2.y, forte: i % 3 === 0 }
  })

  const ph = ponto(anguloHoras, 46)
  const pm = ponto(anguloMinutos, 66)
  const ps = ponto(anguloSegundos, 74)

  return (
    <div className={`relative mx-auto aspect-square ${compacto ? 'w-10' : 'w-full max-w-[22rem]'}`}>
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        <circle cx={100} cy={100} r={R_MOSTRADOR} fill="var(--color-void)" stroke="var(--color-brass)" strokeWidth={compacto ? 4 : 1.5} />
        {!compacto &&
          marcas.map((m, i) => (
            <line key={i} x1={m.x} y1={m.y} x2={m.x2} y2={m.y2} stroke="var(--color-cream)" strokeOpacity={0.4} strokeWidth={m.forte ? 2.5 : 1} strokeLinecap="round" />
          ))}
        <line x1={100} y1={100} x2={ph.x} y2={ph.y} stroke="var(--color-brass)" strokeWidth={compacto ? 10 : 4} strokeLinecap="round" />
        <line x1={100} y1={100} x2={pm.x} y2={pm.y} stroke="var(--color-brass)" strokeWidth={compacto ? 7 : 2.75} strokeLinecap="round" />
        {!compacto && <line x1={100} y1={100} x2={ps.x} y2={ps.y} stroke="var(--color-steel)" strokeWidth={1} strokeLinecap="round" />}
        <circle cx={100} cy={100} r={compacto ? 8 : 3.5} fill="var(--color-brass)" />
      </svg>

      {secoes.map((s) => {
        const p = ponto(s.angulo, compacto ? R_MOSTRADOR : R_MARCA)
        const lbl = ponto(s.angulo, R_LABEL)
        const acesa = ativo === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={acesa ? 'true' : undefined}
            title={compacto ? s.label : undefined}
            className="group contents"
          >
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all"
              style={{
                left: `${(p.x / 200) * 100}%`,
                top: `${(p.y / 200) * 100}%`,
                width: acesa ? 14 : 10,
                height: acesa ? 14 : 10,
                background: acesa ? 'var(--color-brass)' : 'var(--color-cream)',
                opacity: acesa ? 1 : 0.55,
              }}
            />
            {!compacto && (
              <span
                className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium transition-colors ${
                  acesa ? 'text-brass' : 'text-cream/60 group-hover:text-cream'
                }`}
                style={{ left: `${(lbl.x / 200) * 100}%`, top: `${(lbl.y / 200) * 100}%` }}
              >
                {s.label}
              </span>
            )}
          </a>
        )
      })}
    </div>
  )
}
