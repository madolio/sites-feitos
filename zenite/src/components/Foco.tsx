// A secao-assinatura do site: a ocular de um telescopio com uma roda de foco de
// verdade. Voce arrasta o foco; conforme Saturno ganha nitidez, os dados reais
// dele (data/ceu.ts) ao lado tambem "resolvem". O gesto e o mesmo de girar o
// foco de um telescopio, e a imagem e o dado sao a mesma coisa ficando nitidos.
//
// Antes esta secao era o ContainerScroll: uma moldura circular que se
// endireitava com a rolagem, num trecho longo de rolagem vazia, com Saturno
// pequeno e a legenda DENTRO da area borrada, ilegivel. A rolagem era so um
// pretexto pro gesto de focar. Aqui o gesto e o controle. Prioridade: clareza.
import { useState } from 'react'
import { anelSaturno } from '../data/ceu'

// Cada dado "resolve" quando o foco passa do limiar dele.
const DADOS = [
  { limiar: 0.4, rotulo: 'Sistema de anéis', valor: `${anelSaturno.designacao} · ${anelSaturno.diametroAneis}` },
  { limiar: 0.6, rotulo: 'Distância', valor: anelSaturno.distanciaTerra },
  { limiar: 0.78, rotulo: 'Composição', valor: anelSaturno.composicao },
  { limiar: 0.9, rotulo: 'Espessura', valor: anelSaturno.espessura },
] as const

function Saturno() {
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full" role="img" aria-label="Ilustração de Saturno e seus anéis">
      <defs>
        <radialGradient id="corpo-saturno" cx="35%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#efd9a0" />
          <stop offset="55%" stopColor="#c9a361" />
          <stop offset="100%" stopColor="#7d5c2e" />
        </radialGradient>
        <clipPath id="recorte-planeta">
          <circle cx="150" cy="150" r="64" />
        </clipPath>
        <clipPath id="metade-frente">
          <rect x="0" y="150" width="300" height="150" />
        </clipPath>
      </defs>

      <g transform="rotate(-18 150 150)">
        {/* anel, parte de tras */}
        <ellipse cx="150" cy="150" rx="132" ry="34" fill="none" stroke="#b28a4a" strokeWidth="13" opacity="0.55" />
        <ellipse cx="150" cy="150" rx="106" ry="27" fill="none" stroke="#d7b672" strokeWidth="9" opacity="0.5" />

        {/* planeta com bandas */}
        <circle cx="150" cy="150" r="64" fill="url(#corpo-saturno)" />
        <g clipPath="url(#recorte-planeta)" opacity="0.5">
          <rect x="80" y="112" width="140" height="7" fill="#8d6a35" />
          <rect x="80" y="131" width="140" height="10" fill="#b48f4f" />
          <rect x="80" y="156" width="140" height="6" fill="#8d6a35" />
          <rect x="80" y="176" width="140" height="9" fill="#a17c42" />
        </g>
        <circle cx="150" cy="150" r="64" fill="none" stroke="#2e2210" strokeOpacity="0.35" />

        {/* anel, parte da frente (sobre o planeta) */}
        <g clipPath="url(#metade-frente)">
          <ellipse cx="150" cy="150" rx="132" ry="34" fill="none" stroke="#e0954a" strokeWidth="7" opacity="0.92" />
          <ellipse cx="150" cy="150" rx="106" ry="27" fill="none" stroke="#f0e9da" strokeWidth="4" opacity="0.7" />
        </g>
      </g>
    </svg>
  )
}

export default function Foco() {
  // 0 = totalmente desfocado, 1 = nitido. Comeca desfocado de proposito.
  const [foco, setFoco] = useState(0.1)
  const desfoque = Math.pow(1 - foco, 1.6) * 11
  const nitido = foco >= 0.98

  return (
    <section id="foco" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
        <div>
          {/* A ocular: bisel de latao, campo escuro, retículo fino. */}
          <div className="mx-auto aspect-square w-full max-w-[22rem] rounded-full bg-gradient-to-br from-latao via-latao-fundo to-latao p-2.5 shadow-[0_0_60px_-10px_rgba(178,138,74,0.35)]">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-cupula">
              <div
                className="h-full w-full p-[12%] motion-reduce:transition-none"
                style={{ filter: `blur(${desfoque.toFixed(2)}px)`, transition: 'filter 120ms linear' }}
              >
                <Saturno />
              </div>
              <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                <g stroke="#f0e9da" strokeOpacity="0.16" strokeWidth="0.25" fill="none">
                  <line x1="50" y1="4" x2="50" y2="96" />
                  <line x1="4" y1="50" x2="96" y2="50" />
                  <circle cx="50" cy="50" r="22" />
                </g>
              </svg>
              <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_38px_10px_rgba(4,7,14,0.85)]" />
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-[22rem]">
            <div className="flex items-baseline justify-between text-sm">
              <label htmlFor="roda-de-foco" className="font-display tracking-wide text-latao">
                Roda de foco
              </label>
              <span className={nitido ? 'text-fosforo' : 'text-neblina'}>
                {nitido ? 'em foco' : `${Math.round(foco * 100)}% nítido`}
              </span>
            </div>
            <input
              id="roda-de-foco"
              type="range"
              min={0}
              max={100}
              step={1}
              value={Math.round(foco * 100)}
              onChange={(e) => setFoco(Number(e.target.value) / 100)}
              aria-valuetext={nitido ? 'Saturno em foco' : `${Math.round(foco * 100)} por cento nítido`}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-cupula accent-[var(--color-fosforo)]"
            />
            <div className="mt-1.5 flex justify-between text-xs text-neblina/70" aria-hidden="true">
              <span>desfocado</span>
              <span>nítido</span>
            </div>
          </div>
        </div>

        <div>
          <p className="font-display text-sm tracking-wide text-latao">Gire a roda de foco</p>
          <h2 className="mt-3 font-display text-3xl text-marfim sm:text-4xl">Foque Saturno com as próprias mãos</h2>
          <p className="mt-4 max-w-md text-neblina">
            É o mesmo gesto de girar o foco de um telescópio de verdade: quanto mais nítido o planeta, mais do que
            ele é aparece aqui do lado.
          </p>

          <dl className="mt-8 space-y-4">
            {DADOS.map((d) => {
              const resolvido = foco >= d.limiar
              return (
                <div key={d.rotulo} className="border-t border-latao-fundo/40 pt-4">
                  <dt className="text-xs tracking-wide text-latao uppercase">{d.rotulo}</dt>
                  <dd
                    className="mt-1 text-marfim motion-reduce:transition-none"
                    style={{
                      filter: resolvido ? 'none' : 'blur(6px)',
                      opacity: resolvido ? 1 : 0.35,
                      transition: 'filter 400ms ease, opacity 400ms ease',
                    }}
                  >
                    {d.valor}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </section>
  )
}
