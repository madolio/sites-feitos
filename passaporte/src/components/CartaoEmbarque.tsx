import { idiomas } from '../data'

// Cartao de embarque: o objeto de viagem que faltava. Conteudo 100% do que a
// pagina ja diz: os idiomas de data.ts, o teste de nivelamento gratuito de 20
// minutos (Contato) e o CTA que ja existe. Da pagina um CTA no meio do caminho,
// no lugar de so no fim.
export default function CartaoEmbarque() {
  return (
    <aside
      aria-label="Cartão de embarque: comece pelo teste de nível"
      className="relative border-2 border-ink bg-paper text-ink"
    >
      <div className="flex items-center justify-between bg-ink px-5 py-3 text-paper">
        <span className="stamp-number text-xs tracking-[0.3em] uppercase">Cartão de embarque</span>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
        </svg>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 pt-6">
        <div>
          <p className="stamp-number text-[0.65rem] tracking-widest text-ink/60 uppercase">De</p>
          <p className="mt-0.5 font-heading text-3xl leading-none">A1</p>
          <p className="mt-1 text-xs text-ink/70">o primeiro "oi"</p>
        </div>
        <svg viewBox="0 0 48 12" className="h-3 w-12 text-teal" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="M2 6h40M36 1l6 5-6 5" />
        </svg>
        <div className="text-right">
          <p className="stamp-number text-[0.65rem] tracking-widest text-ink/60 uppercase">Para</p>
          <p className="mt-0.5 font-heading text-3xl leading-none">C2</p>
          <p className="mt-1 text-xs text-ink/70">fluência de nativo</p>
        </div>
      </div>

      <dl className="mt-5 space-y-3 px-5 text-sm">
        <div>
          <dt className="stamp-number text-[0.65rem] tracking-widest text-ink/60 uppercase">Destinos</dt>
          <dd className="mt-0.5">{idiomas.join(' · ')}</dd>
        </div>
        <div>
          <dt className="stamp-number text-[0.65rem] tracking-widest text-ink/60 uppercase">Portão de entrada</dt>
          <dd className="mt-0.5">Teste de nível gratuito · 20 minutos</dd>
        </div>
      </dl>

      {/* perfuracao do canhoto: entalhes laterais + linha tracejada */}
      <div className="relative mt-6 border-t-2 border-dashed border-ink/40">
        <span aria-hidden="true" className="absolute -top-2.5 -left-2.5 h-5 w-5 rounded-full border-2 border-ink bg-paper" />
        <span aria-hidden="true" className="absolute -top-2.5 -right-2.5 h-5 w-5 rounded-full border-2 border-ink bg-paper" />
      </div>

      <div className="flex items-center justify-between gap-4 px-5 py-5">
        <a href="#matricula" className="btn-teal">
          Fazer teste de nível
        </a>
        {/* codigo de barras decorativo: so a linguagem do bilhete */}
        <svg viewBox="0 0 60 28" className="h-7 w-14 text-ink/70" fill="currentColor" aria-hidden="true">
          {[0, 4, 7, 12, 15, 19, 24, 27, 32, 35, 40, 44, 47, 52, 56].map((x, i) => (
            <rect key={x} x={x} y="0" width={i % 3 === 0 ? 3 : 1.6} height="28" />
          ))}
        </svg>
      </div>
    </aside>
  )
}
