import { luminarias, type Luminaria } from '../data/luminarias'
import { kelvinParaCss } from '../cor'
import Reveal from './Reveal'

// O cone de cada card é geometria real, não decoração: a abertura do
// triângulo é o ângulo de feixe de catálogo da luminária (trigonometria
// simples a partir da altura), e a cor do gradiente vem de
// kelvinParaCss — a mesma temperatura de cor informada na especificação.
function ConeDeLuz({ luminaria }: { luminaria: Luminaria }) {
  const altura = 110
  const meioAngulo = (luminaria.anguloFeixe / 2) * (Math.PI / 180)
  const meiaLargura = Math.min(70, altura * Math.tan(meioAngulo))
  const apiceX = 80
  const apiceY = 14
  const baseY = apiceY + altura
  const gradId = `feixe-${luminaria.id}`
  const cor = kelvinParaCss(luminaria.kelvin)

  return (
    <svg viewBox="0 0 160 140" className="h-36 w-full">
      <defs>
        <radialGradient id={gradId} cx={apiceX / 160} cy={apiceY / 140} r="0.9">
          <stop offset="0%" stopColor={cor} stopOpacity="0.55" />
          <stop offset="100%" stopColor={cor} stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d={`M ${apiceX} ${apiceY} L ${apiceX - meiaLargura} ${baseY} L ${apiceX + meiaLargura} ${baseY} Z`}
        fill={`url(#${gradId})`}
      />
      <circle cx={apiceX} cy={apiceY} r="4" fill={cor} />
    </svg>
  )
}

export function Catalogo() {
  return (
    <section id="catalogo" className="border-t border-fio bg-noite px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-sm tracking-widest text-acento uppercase">Catálogo</p>
          <h2 className="mt-3 text-3xl">Cada luminária tem um feixe diferente</h2>
          <p className="mt-3 max-w-2xl text-fumo">
            O cone é desenhado a partir do ângulo de feixe real de cada peça, e a cor vem da temperatura de cor exata
            (Kelvin) — não é ilustração livre.
          </p>
        </Reveal>

        <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {luminarias.map((l) => (
            <article key={l.id} className="border border-fio bg-carvao p-5">
              <ConeDeLuz luminaria={l} />
              <h3 className="mt-3 font-display text-xl">{l.nome}</h3>
              <p className="text-sm text-fumo">{l.categoria}</p>
              <p className="mt-2 text-sm text-marfim/80">{l.descricao}</p>
              <dl className="tabular mt-4 grid grid-cols-2 gap-2 text-xs text-fumo">
                <div>
                  <dt className="uppercase">Fluxo</dt>
                  <dd className="text-marfim">{l.lumens}lm</dd>
                </div>
                <div>
                  <dt className="uppercase">Potência</dt>
                  <dd className="text-marfim">{l.watts}W</dd>
                </div>
                <div>
                  <dt className="uppercase">Feixe</dt>
                  <dd className="text-marfim">{l.anguloFeixe}°</dd>
                </div>
                <div>
                  <dt className="uppercase">Temperatura</dt>
                  <dd className="text-marfim">{l.kelvin}K</dd>
                </div>
              </dl>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
