import { useState } from 'react'
import { fases, DISTANCIA_TOTAL_KM, type Fase } from '../data/fases'
import { pontosDoAnel, pathSuaveFechado } from '../lib/curva'

// O mapa topográfico da trilha: o mecanismo central do site.
//
// Diferença técnica em relação ao Ressoa (luthier), que também usa
// linguagem de curva de nível: lá as linhas nodais vêm de uma superposição
// de dois modos senoidais numa grade quadrada (Z = cos(nπx)cos(mπy) −
// cos(mπx)cos(nπy)), o jeito real de aproximar uma figura de Chladni.
// Aqui as curvas de nível são anéis fechados ao redor de um único pico,
// com raio perturbado por harmônicos senoidais determinísticos:
//   r(θ, anel) = raioBase(anel) + a1·sin(3θ + anel) + a2·sin(5θ + 2·anel)
// — a forma real como um mapa topográfico representa elevação ao redor de
// um cume: anéis concêntricos irregulares, não uma grade de nós de
// vibração. Cada anel é convertido de pontos polares pra um path SVG
// suave via interpolação Catmull-Rom → Bézier cúbica. A matemática em si
// (pontosDoAnel/pathSuaveFechado) mora em lib/curva.ts, reaproveitada
// também pelas miniaturas de especialidade em CurvaEspecialidade.tsx.

const PICO = { x: 780, y: 120 }
const ANEIS = [70, 130, 190, 250, 310, 370, 430]

const OPCOES_ANEL = { cx: PICO.x, cy: PICO.y, escalaX: 1.15, escalaY: 0.72, deriva: 6 }

const contornos = ANEIS.map((raio, i) => pathSuaveFechado(pontosDoAnel(raio, i, OPCOES_ANEL)))

// Posições visuais dos marcos (aproximadas sobre a trilha desenhada à mão
// abaixo — não recalculadas geometricamente, é um traçado de mapa, não uma
// função paramétrica de percurso).
const posicoesMarco: Record<string, { x: number; y: number }> = {
  aguda: { x: 90, y: 470 },
  amplitude: { x: 330, y: 380 },
  fortalecimento: { x: 560, y: 250 },
  funcional: { x: 800, y: 90 },
}

const TRILHA_D =
  'M 90 470 C 180 460, 230 410, 280 400 S 400 390, 440 360 S 510 280, 560 250 S 680 170, 720 150 S 780 100, 800 90'

export default function TrilhaMapa() {
  const [selecionada, setSelecionada] = useState<Fase>(fases[2])

  const fracao = selecionada.km / DISTANCIA_TOTAL_KM

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-linha bg-papel-forte">
        <svg
          viewBox="0 0 980 540"
          role="img"
          aria-label={`Mapa topográfico da trilha de recuperação. Trecho atual em destaque: fase ${selecionada.numero}, ${selecionada.nome}, quilômetro ${selecionada.km} de ${DISTANCIA_TOTAL_KM}.`}
          className="w-full"
        >
          {/* curvas de nível */}
          <g aria-hidden="true" className="text-contorno/35" fill="none" stroke="currentColor" strokeWidth="1.4">
            {contornos.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          {/* trilha completa (traço de referência, fraco) */}
          <path
            d={TRILHA_D}
            fill="none"
            stroke="var(--color-tinta)"
            strokeOpacity="0.18"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="1 9"
          />

          {/* trilha percorrida até a fase selecionada */}
          <path
            d={TRILHA_D}
            pathLength={1}
            fill="none"
            stroke="var(--color-trilha)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${fracao} 1`}
            className="trilha-percorrida"
          />

          {/* marcos de fase */}
          {fases.map((fase) => {
            const pos = posicoesMarco[fase.id]
            const ativa = fase.id === selecionada.id
            const concluida = fase.km <= selecionada.km
            return (
              <g key={fase.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={ativa ? 15 : 11}
                  fill={concluida ? 'var(--color-trilha)' : 'var(--color-papel)'}
                  stroke="var(--color-tinta)"
                  strokeWidth={ativa ? 3 : 2}
                  className={ativa ? 'marco-ativo' : undefined}
                />
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={concluida ? 'var(--color-papel)' : 'var(--color-tinta)'}
                  aria-hidden="true"
                >
                  {fase.numero}
                </text>
                <text
                  x={pos.x}
                  y={pos.y - 22}
                  textAnchor="middle"
                  fontSize="12"
                  className="hidden font-dado sm:block"
                  fill="var(--color-tinta)"
                  aria-hidden="true"
                >
                  {fase.km} km
                </text>
                {/* alvo clicável acessível */}
                <foreignObject x={pos.x - 22} y={pos.y - 22} width="44" height="44" className="overflow-visible">
                  <button
                    type="button"
                    aria-pressed={ativa}
                    onClick={() => setSelecionada(fase)}
                    className="relative h-full w-full rounded-full before:absolute before:-inset-[43px] before:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-trilha focus-visible:outline-offset-2"
                    aria-label={`Ver fase ${fase.numero}: ${fase.nome}`}
                  />
                </foreignObject>
              </g>
            )
          })}
        </svg>
      </div>

      <p className="dado-mapa mt-3 text-tinta/70">
        {selecionada.km} km percorridos de {DISTANCIA_TOTAL_KM} km · altitude {selecionada.altitude}
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Fases da recuperação">
        {fases.map((fase) => (
          <button
            key={fase.id}
            type="button"
            role="tab"
            aria-selected={fase.id === selecionada.id}
            onClick={() => setSelecionada(fase)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              fase.id === selecionada.id
                ? 'border-trilha bg-trilha text-papel'
                : 'border-linha text-tinta/70 hover:border-contorno hover:text-tinta'
            }`}
          >
            {fase.numero}. {fase.nome}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-linha bg-white/50 p-6">
        <p className="dado-mapa text-altitude">{selecionada.semanas}</p>
        <h3 className="mt-1 text-2xl">{selecionada.nome}</h3>
        <p className="mt-3 text-tinta/80">{selecionada.objetivo}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-tinta/70">
          {selecionada.marcos.map((marco) => (
            <li key={marco} className="flex gap-2">
              <span aria-hidden="true" className="text-contorno">
                ▸
              </span>
              {marco}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
