import { sendToWhatsApp } from '../demo'
import MapaRotas from './MapaRotas'
import Reveal from './Reveal'
import StatGrid from './StatGrid'
import TabelaEntregas from './TabelaEntregas'

export default function Painel() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Painel</h1>
          <p className="mt-1 text-sm text-ink/55">Terça-feira, visão geral da operação de hoje.</p>
        </div>
        <button
          type="button"
          onClick={() => sendToWhatsApp('Olá, Rota! Quero pedir uma demonstração do painel.')}
          className="btn-outline"
        >
          Pedir demonstração
        </button>
      </div>

      <div className="mt-6">
        <StatGrid />
      </div>

      <Reveal className="mt-4 rounded-xl border border-line bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-ink">Rotas ativas</h2>
          <span className="text-xs text-ink/45">atualizado agora</span>
        </div>
        <p className="mt-1 text-sm text-ink/55">
          Otimizadas automaticamente conforme o trânsito e as janelas de
          entrega de cada pedido.
        </p>
        <div className="mt-4">
          <MapaRotas />
        </div>
      </Reveal>

      <Reveal className="mt-4">
        <TabelaEntregas />
      </Reveal>

      <p className="mt-8 text-center text-sm text-ink/45">
        A Rota é um software fictício: um conceito feito com{' '}
        <span aria-hidden="true" className="text-accent">
          ♥
        </span>
        <span className="sr-only">amor</span> pela{' '}
        <a
          href="https://madolio.com.br"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-ink/65 underline underline-offset-4"
        >
          Madolio
        </a>
        .
      </p>
    </div>
  )
}
