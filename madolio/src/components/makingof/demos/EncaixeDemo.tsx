import { useState } from 'react'

// Espelha encaixe/src/data/configuracao.ts (preço base, prazo base e
// multiplicadores) e a conta de encaixe/src/components/Configurador.tsx:
//   preco = round(base × tecido × corte / 10) × 10
//   prazo = max(1, round(prazoBase × (oversized ? 1,1 : 1)))
const tipos = [
  { id: 'blazer', nome: 'Blazer', base: 2400, prazo: 4 },
  { id: 'calca', nome: 'Calça', base: 980, prazo: 2 },
  { id: 'colete', nome: 'Colete', base: 780, prazo: 2 },
  { id: 'camisa', nome: 'Camisa social', base: 590, prazo: 2 },
]
const tecidos = [
  { id: 'la-fria', nome: 'Lã fria', m: 1 },
  { id: 'linho', nome: 'Linho', m: 0.9 },
  { id: 'flanela', nome: 'Flanela', m: 1.1 },
  { id: 'tweed', nome: 'Tweed', m: 1.2 },
  { id: 'algodao-egipcio', nome: 'Algodão egípcio', m: 0.85 },
]
const cortes = [
  { id: 'slim', nome: 'Slim', m: 1.05 },
  { id: 'classico', nome: 'Clássico', m: 1 },
  { id: 'oversized', nome: 'Oversized', m: 1.15 },
]
const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
const mult = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 })
const foco = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-hero'

function Grupo({
  id,
  rotulo,
  itens,
  atual,
  onChange,
}: {
  id: string
  rotulo: string
  itens: { id: string; nome: string }[]
  atual: string
  onChange: (v: string) => void
}) {
  return (
    <div role="group" aria-labelledby={id}>
      <p id={id} className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">
        {rotulo}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {itens.map((i) => (
          <button
            key={i.id}
            type="button"
            aria-pressed={atual === i.id}
            onClick={() => onChange(i.id)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${foco} ${
              atual === i.id ? 'border-accent-hero bg-accent-hero text-void' : 'border-paper/30 text-paper hover:border-paper/60'
            }`}
          >
            {i.nome}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function EncaixeDemo() {
  const [t, setT] = useState('blazer')
  const [f, setF] = useState('la-fria')
  const [c, setC] = useState('classico')
  const tipo = tipos.find((x) => x.id === t) ?? tipos[0]
  const tec = tecidos.find((x) => x.id === f) ?? tecidos[0]
  const cor = cortes.find((x) => x.id === c) ?? cortes[0]
  const bruto = tipo.base * tec.m * cor.m
  const preco = Math.round(bruto / 10) * 10
  const fatorPrazo = c === 'oversized' ? 1.1 : 1
  const prazo = Math.max(1, Math.round(tipo.prazo * fatorPrazo))

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="min-w-0 space-y-6">
        <Grupo id="encaixe-peca" rotulo="Peça" itens={tipos} atual={t} onChange={setT} />
        <Grupo id="encaixe-tecido" rotulo="Tecido" itens={tecidos} atual={f} onChange={setF} />
        <Grupo id="encaixe-corte" rotulo="Corte" itens={cortes} atual={c} onChange={setC} />
      </div>
      <div aria-live="polite" className="min-w-0 rounded-xl border border-paper/15 bg-paper/5 p-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-fog uppercase">Estimativa</p>
        <p className="mt-1 font-poster text-6xl leading-none text-white md:text-7xl">{brl.format(preco)}</p>
        <p className="mt-2 text-sm text-fog">
          pronto em ~{prazo} semana{prazo > 1 ? 's' : ''}
        </p>
        <pre className="mt-5 overflow-x-auto rounded-lg bg-void p-4 font-mono text-[13px] leading-relaxed text-accent-hero">
{`preço = ${tipo.base} × ${mult.format(tec.m)} × ${mult.format(cor.m)}
      = ${mult.format(bruto)} → arredonda p/ 10 → ${preco}
prazo = ${tipo.prazo} × ${mult.format(fatorPrazo)} → arredonda → ${prazo}`}
        </pre>
      </div>
    </div>
  )
}
