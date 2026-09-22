import { useState } from 'react'
import { tecidos } from '../data/tecidos'

const escalaAbsorcao: Record<string, number> = { baixa: 1, média: 2, alta: 3 }

function Escala({ nivel }: { nivel: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`nível ${nivel} de 3`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`h-2 w-6 rounded-full ${i <= nivel ? 'bg-jeans' : 'bg-linha'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

/** O leitor de etiqueta de cuidado — o wildcard real da Trama. Não é um
 * carrossel de fotos de produto: é a mesma informação que estaria costurada
 * na etiqueta interna da peça, com o significado de cada símbolo escrito
 * por extenso, porque quase ninguém decora o que o triângulo do alvejante
 * ou o ponto no ferro querem dizer de verdade. */
export default function EtiquetaCuidado() {
  const [ativoId, setAtivoId] = useState(tecidos[0].id)
  const ativo = tecidos.find((t) => t.id === ativoId) ?? tecidos[0]

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tecidos da loja">
        {tecidos.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === ativoId}
            onClick={() => setAtivoId(t.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              t.id === ativoId
                ? 'border-jeans bg-jeans text-cru'
                : 'border-linha bg-cartao text-carvao hover:border-jeans/60'
            }`}
          >
            {t.nome}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 rounded-md border border-linha bg-cartao p-6 sm:p-8 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="dado-etiqueta text-mostarda">peça exemplo</p>
          <h3 className="mt-1 text-2xl">{ativo.pecaExemplo}</h3>
          <p className="mt-1 text-sm text-carvao/70">{ativo.fibra}</p>
          <p className="dado-etiqueta mt-4 text-carvao/50">{ativo.composicao}</p>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-carvao/70">Absorção de umidade</dt>
              <dd><Escala nivel={escalaAbsorcao[ativo.absorcao]} /></dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-carvao/70">Elasticidade</dt>
              <dd><Escala nivel={escalaAbsorcao[ativo.elasticidade]} /></dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-carvao/70">Respirabilidade</dt>
              <dd><Escala nivel={escalaAbsorcao[ativo.respirabilidade]} /></dd>
            </div>
          </dl>

          <p className="mt-6 text-sm text-carvao/75">{ativo.observacao}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SimboloCartao titulo="Lavagem" simbolo={ativo.lavagem} tipo="lavagem" />
          <SimboloCartao titulo="Alvejante" simbolo={ativo.alvejante} tipo="alvejante" />
          <SimboloCartao titulo="Secagem" simbolo={ativo.secagem} tipo="secagem" />
          <SimboloCartao titulo="Passar" simbolo={ativo.passar} tipo="passar" />
        </div>
      </div>
    </div>
  )
}

type Tipo = 'lavagem' | 'alvejante' | 'secagem' | 'passar'

function IconeSimbolo({ tipo }: { tipo: Tipo }) {
  const props = {
    viewBox: '0 0 48 48',
    className: 'simbolo-ativo h-10 w-10 shrink-0 text-jeans',
    'aria-hidden': true as const,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
  }
  if (tipo === 'lavagem') {
    return (
      <svg {...props}>
        <rect x="6" y="8" width="36" height="32" rx="4" />
        <path d="M6 18h36" />
        <path d="M14 26c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
      </svg>
    )
  }
  if (tipo === 'alvejante') {
    return (
      <svg {...props}>
        <path d="M24 6 L44 40 L4 40 Z" />
        <path d="M24 18 L24 28" />
        <circle cx="24" cy="33" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  if (tipo === 'secagem') {
    return (
      <svg {...props}>
        <rect x="6" y="6" width="36" height="36" rx="4" />
        <circle cx="24" cy="24" r="10" />
      </svg>
    )
  }
  return (
    <svg {...props}>
      <path d="M8 34 C8 20, 16 12, 32 14 C40 15, 42 22, 38 28 C34 34, 20 36, 8 34 Z" />
      <circle cx="16" cy="22" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="22" cy="26" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="28" cy="22" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

function SimboloCartao({ titulo, simbolo, tipo }: { titulo: string; simbolo: { rotulo: string; detalhe: string }; tipo: Tipo }) {
  return (
    <div className="rounded-sm border border-linha bg-cru p-4">
      <div className="flex items-start gap-3">
        <IconeSimbolo tipo={tipo} />
        <div>
          <p className="dado-etiqueta text-carvao/50">{titulo}</p>
          <p className="mt-1 text-sm font-semibold">{simbolo.rotulo}</p>
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-carvao/65">{simbolo.detalhe}</p>
    </div>
  )
}
