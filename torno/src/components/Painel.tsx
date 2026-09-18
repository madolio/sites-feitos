import { useEffect, useState, type ReactNode } from 'react'
import type { Etapa } from '../cena/Atelie'
import { esmaltes, turmas, type Esmalte, type Forma } from '../data'
import { sendToWhatsApp } from '../demo'
import { aplicarForma, medidas } from '../estado'
import { useLateral } from '../lateral'
import Etapas from './Etapas'
import { Termometro } from './Forno'

type Props = {
  etapa: Etapa
  esmalte: Esmalte
  onEsmalte: (e: Esmalte) => void
  onEtapa: (e: Etapa) => void
  onQueimar: () => void
}

const formasProntas: { id: Forma; nome: string }[] = [
  { id: 'vaso', nome: 'Vaso' },
  { id: 'tigela', nome: 'Tigela' },
  { id: 'caneca', nome: 'Caneca' },
]

// Conteúdo rola; a ação principal de cada etapa fica fixa no rodapé — no
// celular o painel é uma folha curta embaixo da peça, e o botão não pode
// sumir atrás de uma rolagem.
export default function Painel({ etapa, esmalte, onEsmalte, onEtapa, onQueimar }: Props) {
  const lateral = useLateral()
  const [m, setM] = useState(medidas)
  const [turma, setTurma] = useState(turmas[0].id)

  // O perfil muda fora do React (a cena escreve direto em `peca`); aqui só
  // uma olhada a cada 150 ms pra atualizar as medidas mostradas.
  useEffect(() => {
    setM(medidas())
    if (etapa !== 'moldar') return
    const id = window.setInterval(() => setM(medidas()), 150)
    return () => window.clearInterval(id)
  }, [etapa])

  const pedir = () => {
    const t = turmas.find((x) => x.id === turma)!
    sendToWhatsApp(
      `Olá, Torno! Fiz um ${m.tipo.toLowerCase()} de ${m.altura} cm de altura e ${m.diametro} cm de diâmetro, ` +
        `com esmalte ${esmalte.nome.toLowerCase()}, no site — e quero aprender de verdade.\n` +
        `Tenho interesse em: ${t.nome} (${t.preco}).`,
    )
  }

  let conteudo: ReactNode
  let rodape: ReactNode = null

  if (etapa === 'moldar') {
    conteudo = (
      <>
        <h2 className="text-2xl lg:text-3xl">Molde a peça</h2>
        <p className="mt-1.5 text-ink/75">
          Arraste na borda do barro enquanto ele gira. Comece perto da boca pra
          puxar a peça pra cima.
        </p>
        <Medidas altura={m.altura} diametro={m.diametro} />
        <p className="mt-4 text-sm font-semibold text-ink/70">Ou comece de uma forma</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {formasProntas.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => aplicarForma(f.id)}
              className="rounded-full border border-ink/20 px-3.5 py-1.5 text-sm font-semibold hover:border-ink"
            >
              {f.nome}
            </button>
          ))}
          <button
            type="button"
            onClick={() => aplicarForma('barro')}
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-ink/60 hover:text-ink"
          >
            Recomeçar
          </button>
        </div>
      </>
    )
    rodape = (
      <button type="button" onClick={() => onEtapa('esmaltar')} className="btn-primary w-full">
        Pronto, esmaltar
      </button>
    )
  } else if (etapa === 'esmaltar') {
    conteudo = (
      <>
        <h2 className="text-2xl lg:text-3xl">Escolha o esmalte</h2>
        <div className="mt-3 grid max-w-72 grid-cols-5 gap-2" role="radiogroup" aria-label="Esmalte">
          {esmaltes.map((e) => (
            <button
              key={e.id}
              type="button"
              role="radio"
              aria-checked={e.id === esmalte.id}
              aria-label={e.nome}
              onClick={() => onEsmalte(e)}
              className={`aspect-square rounded-full border-2 transition-transform ${
                e.id === esmalte.id ? 'scale-105 border-ink' : 'border-transparent hover:scale-105'
              }`}
              style={{ background: e.cor }}
            />
          ))}
        </div>
        <p className="mt-3 font-semibold">{esmalte.nome}</p>
        <p className="mt-0.5 text-ink/75">{esmalte.nota}</p>
        <p className="mt-3 text-sm text-ink/60">
          Cru, o esmalte é um pó claro e fosco — a cor de verdade só aparece no
          forno.
        </p>
      </>
    )
    rodape = (
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => onEtapa('moldar')} className="btn-outline shrink-0">
          Voltar
        </button>
        <button type="button" onClick={onQueimar} className="btn-primary flex-1">
          Levar ao forno
        </button>
      </div>
    )
  } else if (etapa === 'queimando') {
    conteudo = (
      <div aria-live="polite">
        <h2 className="text-2xl lg:text-3xl">No forno</h2>
        <Termometro />
        <p className="mt-2 text-ink/75">
          O esmalte derrete e vira vidro por cima do barro — e o barro, que era
          cinza, fica claro e duro como pedra.
        </p>
      </div>
    )
  } else {
    conteudo = (
      <>
        <h2 className="text-2xl lg:text-3xl">Saiu do forno</h2>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
          <dt className="text-ink/60">Peça</dt>
          <dd className="font-semibold">{m.tipo}</dd>
          <dt className="text-ink/60">Altura</dt>
          <dd className="font-semibold tabular-nums">{m.altura} cm</dd>
          <dt className="text-ink/60">Diâmetro</dt>
          <dd className="font-semibold tabular-nums">{m.diametro} cm</dd>
          <dt className="text-ink/60">Esmalte</dt>
          <dd className="font-semibold">{esmalte.nome}</dd>
        </dl>

        <fieldset className="mt-5">
          <legend className="font-semibold">Quer fazer uma de verdade?</legend>
          <div className="mt-2.5 space-y-2">
            {turmas.map((t) => (
              <label
                key={t.id}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ink ${
                  turma === t.id ? 'border-ink bg-gesso' : 'border-line hover:border-ink/40'
                }`}
              >
                <input type="radio" name="turma" className="sr-only" checked={turma === t.id} onChange={() => setTurma(t.id)} />
                <span>
                  <span className="block text-sm font-semibold">{t.nome}</span>
                  <span className="block text-xs text-ink/60">{t.detalhe}</span>
                </span>
                <span className="shrink-0 text-sm font-semibold tabular-nums">{t.preco}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={() => {
            aplicarForma('barro')
            onEtapa('moldar')
          }}
          className="mt-3 w-full py-2 text-sm font-semibold text-ink/60 hover:text-ink"
        >
          Fazer outra peça
        </button>
      </>
    )
    rodape = (
      <button type="button" onClick={pedir} className="btn-primary w-full">
        Quero aprender no torno
      </button>
    )
  }

  return (
    <aside
      className={`pointer-events-auto absolute flex flex-col rounded-[28px] border border-ink/15 bg-folha ${
        lateral ? 'top-24 right-6 max-h-[calc(100svh-7.5rem)] w-[23rem]' : 'inset-x-3 bottom-3 max-h-[52svh] sm:inset-x-6'
      }`}
    >
      <div className="min-h-0 flex-1 overflow-y-auto p-5 pb-3 sm:p-6 sm:pb-3">
        <Etapas etapa={etapa} onVoltar={onEtapa} />
        <div className="mt-4">{conteudo}</div>
        <p className="mt-4 text-xs text-ink/55">
          Ateliê fictício — conceito criado pela{' '}
          <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">
            Madolio
          </a>
          .
        </p>
      </div>
      {rodape && <div className="shrink-0 border-t border-line px-5 py-3 sm:px-6">{rodape}</div>}
    </aside>
  )
}

function Medidas({ altura, diametro }: { altura: number; diametro: number }) {
  return (
    <div className="mt-3 flex gap-6">
      <div>
        <p className="font-display text-3xl tabular-nums lg:text-4xl">
          {altura}
          <span className="text-base"> cm</span>
        </p>
        <p className="text-xs text-ink/60">de altura</p>
      </div>
      <div>
        <p className="font-display text-3xl tabular-nums lg:text-4xl">
          {diametro}
          <span className="text-base"> cm</span>
        </p>
        <p className="mt-2 text-xs text-ink/65">
          feito com <span aria-hidden="true" className="text-glaze">♥</span>
          <span className="sr-only">amor</span> por{' '}
          <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="underline decoration-glaze/50 underline-offset-4">
            madolio
          </a>
        </p>
        <p className="text-xs text-ink/60">de diâmetro</p>
      </div>
    </div>
  )
}
