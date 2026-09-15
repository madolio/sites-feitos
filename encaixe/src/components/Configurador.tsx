import { useMemo, useState } from 'react'
import { cortes, tecidos, tipos } from '../data/configuracao'
import { sendToWhatsApp } from '../demo'
import DesenhoTecnico from './DesenhoTecnico'

const formatoPreco = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

// O coração da segunda reformulação completa: em vez de mostrar peças
// prontas, o visitante monta a própria — peça, tecido, corte — e vê preço
// e prazo estimados na hora, com o figurino técnico atualizando junto.
// Preço e prazo nunca são inventados soltos: partem do preço já publicado
// no catálogo (tipos[].precoBase) multiplicado pelo tecido e pelo corte.
export default function Configurador() {
  const [tipoId, setTipoId] = useState(tipos[0].id)
  const [tecidoId, setTecidoId] = useState(tecidos[0].id)
  const [corteId, setCorteId] = useState(cortes[1].id)

  const tipo = tipos.find((t) => t.id === tipoId)!
  const tecido = tecidos.find((t) => t.id === tecidoId)!
  const corte = cortes.find((c) => c.id === corteId)!

  const preco = Math.round((tipo.precoBase * tecido.multiplicador * corte.multiplicador) / 10) * 10
  const prazo = Math.max(1, Math.round(tipo.prazoBaseSemanas * (corte.id === 'oversized' ? 1.1 : 1)))

  const desenho = useMemo(() => tipo.desenhar(corte.nome), [tipo, corte])

  function pedirOrcamento() {
    sendToWhatsApp(
      `Olá, Encaixe! Quero fazer sob medida:\n` +
        `• Peça: ${tipo.nome}\n` +
        `• Tecido: ${tecido.nome}\n` +
        `• Corte: ${corte.nome}\n` +
        `Vi no site que fica em torno de ${formatoPreco.format(preco)}, prazo de ~${prazo} semanas.`,
    )
  }

  return (
    <div className="grid gap-8 sm:grid-cols-[1fr_1fr]">
      <div className="space-y-6">
        <div>
          <span className="rotulo text-accent">Peça</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {tipos.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTipoId(t.id)}
                aria-pressed={tipoId === t.id}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  tipoId === t.id ? 'border-ink bg-ink text-paper' : 'border-ink/25 text-ink hover:border-ink'
                }`}
              >
                {t.nome}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="rotulo text-accent">Tecido</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {tecidos.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTecidoId(t.id)}
                aria-pressed={tecidoId === t.id}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  tecidoId === t.id ? 'border-ink bg-ink text-paper' : 'border-ink/25 text-ink hover:border-ink'
                }`}
              >
                {t.nome}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="rotulo text-accent">Corte</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {cortes.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCorteId(c.id)}
                aria-pressed={corteId === c.id}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  corteId === c.id ? 'border-ink bg-ink text-paper' : 'border-ink/25 text-ink hover:border-ink'
                }`}
              >
                {c.nome}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-line pt-5">
          <p className="tabular text-4xl font-medium text-ink">{formatoPreco.format(preco)}</p>
          <p className="mt-1 text-sm text-ink/60">
            estimativa · pronto em ~{prazo} semana{prazo > 1 ? 's' : ''} · {tipo.detalhe}
          </p>
          <button type="button" onClick={pedirOrcamento} className="btn-primary mt-5">
            Pedir esse orçamento
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-xs bg-paper-deep/40 p-6">
        <DesenhoTecnico desenho={desenho} nomeJunta={tipo.detalhe} />
      </div>
    </div>
  )
}
