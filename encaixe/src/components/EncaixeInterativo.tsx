import { useState } from 'react'
import { encaixes } from '../data/encaixes'

// O coração da reformulação: em vez de um movimento automático que toca
// uma vez só (a versão anterior), o visitante ARRASTA o controle e monta o
// encaixe no próprio ritmo, pra qualquer um dos 4 tipos — de passivo pra
// exploratório. É essa troca de interação, não só de ilustração, que
// reorganiza o site inteiro: o tipo escolhido aqui também filtra o
// catálogo abaixo (ver App.tsx/Catalogo.tsx).
type Props = {
  selecionado: string
  onSelecionar: (id: string) => void
}

export default function EncaixeInterativo({ selecionado, onSelecionar }: Props) {
  const [progresso, setProgresso] = useState(30)
  const atual = encaixes.find((e) => e.id === selecionado) ?? encaixes[0]
  // avanco 0 = totalmente separado (peça móvel na posição de repouso, mais
  // à direita); avanco 1 = totalmente encaixado (translateX máximo pra
  // esquerda). Cada ilustração define sua peça móvel NA POSIÇÃO DE
  // REPOUSO (avanco 0) e recebe translateX(-avanco * amplitude).
  const avanco = progresso / 100

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tipo de encaixe">
        {encaixes.map((e) => (
          <button
            key={e.id}
            type="button"
            role="tab"
            aria-selected={selecionado === e.id}
            onClick={() => onSelecionar(e.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selecionado === e.id ? 'border-ink bg-ink text-paper' : 'border-ink/25 text-ink hover:border-ink'
            }`}
          >
            {e.nome}
          </button>
        ))}
      </div>

      <p className="mt-4 max-w-md text-ink/75">{atual.descricao}</p>

      <div className="mt-6 w-full max-w-md">
        {/* overflow-hidden recorta a peça móvel quando ela está bem
            separada (avanco baixo) — sem isso, as coordenadas fora do
            viewBox vazam pra direita e criam overflow horizontal na
            página, especialmente no celular. */}
        <div className="overflow-hidden">
          <svg viewBox="0 0 320 200" className="h-auto w-full" aria-hidden="true">
            <Ilustracao tipo={selecionado} avanco={avanco} />
          </svg>
        </div>

        <label className="mt-2 block">
          <span className="sr-only">Arraste pra montar o encaixe</span>
          <input
            type="range"
            min={0}
            max={100}
            value={progresso}
            onChange={(e) => setProgresso(Number(e.target.value))}
            className="w-full accent-[var(--color-wood)]"
          />
        </label>
        <div className="flex justify-between text-xs text-ink/50">
          <span>Separado</span>
          <span>Arraste pra montar</span>
          <span>Encaixado</span>
        </div>
      </div>
    </div>
  )
}

function Ilustracao({ tipo, avanco }: { tipo: string; avanco: number }) {
  const estiloFixo = { fill: 'none', stroke: 'var(--color-ink)', strokeWidth: 2, strokeLinejoin: 'round' as const }
  const estiloMovel = { fill: 'var(--color-wood)', stroke: 'var(--color-wood-dark)', strokeWidth: 2, strokeLinejoin: 'round' as const }
  const transformar = (amplitude: number) => ({
    transform: `translateX(${-avanco * amplitude}px)`,
    transition: 'transform 0.05s linear',
  })

  if (tipo === 'espiga-e-furo') {
    // Peça fixa com um furo (notch) entre x140–160; a espiga em repouso
    // fica 60px à direita da posição encaixada, e desliza até preencher o
    // furo exatamente.
    return (
      <>
        <path d="M20,40 H160 V80 H140 V120 H160 V160 H20 Z" {...estiloFixo} />
        <g style={transformar(60)}>
          <path d="M280,70 H340 V130 H280 V120 H260 V80 H280 Z" {...estiloMovel} />
        </g>
      </>
    )
  }

  if (tipo === 'meia-madeira') {
    // A perde a metade de cima a partir de x90 (o "rebaixo"); B, em
    // repouso 70px à direita, tem a metade de baixo rebaixada no mesmo
    // trecho — as duas metades se completam quando avanco = 1.
    return (
      <>
        <path d="M20,40 H90 V80 H160 V120 H20 Z" {...estiloFixo} />
        <g style={transformar(70)}>
          <path d="M230,40 H360 V120 H300 V80 H230 Z" {...estiloMovel} />
        </g>
      </>
    )
  }

  if (tipo === 'cavilha') {
    // Duas tábuas retas topo a topo; os pinos (cavilhas) da peça móvel
    // entram nos furos já marcados na peça fixa.
    return (
      <>
        <path d="M20,40 H150 V160 H20 Z" {...estiloFixo} />
        <circle cx={150} cy={70} r={6} fill="none" stroke="var(--color-ink)" strokeWidth={1.5} />
        <circle cx={150} cy={130} r={6} fill="none" stroke="var(--color-ink)" strokeWidth={1.5} />
        <g style={transformar(70)}>
          <path d="M220,40 H350 V160 H220 Z" {...estiloFixo} />
          <circle cx={220} cy={70} r={5} fill="var(--color-wood)" stroke="var(--color-wood-dark)" strokeWidth={1.5} />
          <circle cx={220} cy={130} r={5} fill="var(--color-wood)" stroke="var(--color-wood-dark)" strokeWidth={1.5} />
        </g>
      </>
    )
  }

  // rabo-de-andorinha (padrão) — dentes triangulares entrelaçando.
  return (
    <>
      <path d="M20,40 H150 L130,60 L150,80 L130,100 L150,120 L130,140 L150,160 H20 Z" {...estiloFixo} />
      <g style={transformar(70)}>
        <path d="M290,40 L270,60 L290,80 L270,100 L290,120 L270,140 L290,160 L370,160 L370,40 Z" {...estiloMovel} />
      </g>
    </>
  )
}
