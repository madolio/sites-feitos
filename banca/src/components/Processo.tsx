const PASSOS = [
  {
    numero: '01',
    titulo: 'Você anota o pedido',
    texto: 'Pelo WhatsApp: ocasião, orçamento e se tem uma flor que não pode faltar (ou uma que odeia).',
    cor: 'var(--color-marigold)',
    rotacao: -2,
  },
  {
    numero: '02',
    titulo: 'A gente monta na bancada',
    texto: 'Escolhemos direto dos baldes do dia e montamos o buquê na sua frente (ou te mandamos foto, se for retirar depois).',
    cor: 'var(--color-magenta)',
    rotacao: 1.5,
  },
  {
    numero: '03',
    titulo: 'Entrega ainda molhado',
    texto: 'Embrulhado em kraft ou seda, com o caule protegido — pedidos até 15h saem no mesmo dia.',
    cor: 'var(--color-sky)',
    rotacao: -1,
  },
]

// O "como funciona" é o caderno de encomendas da banca: uma folha
// pautada com espiral, cada etapa carimbada como um pedido anotado à
// mão — não uma timeline de passos numerados genérica.
export default function Processo() {
  return (
    <section id="processo" className="scroll-mt-24 bg-ink px-6 py-20 text-bg lg:scroll-mt-28 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="font-display text-sm font-semibold tracking-wide text-marigold">Como funciona</p>
        <h2 className="mt-2 max-w-lg text-4xl font-bold sm:text-5xl">O caderno de encomendas</h2>

        <div className="relative mt-12 rounded-2xl bg-paper text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
          {/* espiral */}
          <div className="absolute top-0 left-6 flex h-full flex-col justify-around py-4 sm:left-10" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="h-3 w-3 rounded-full border-2 border-ink/25 bg-bg" />
            ))}
          </div>

          <div className="grid gap-8 py-10 pr-6 pl-16 sm:pl-20 lg:grid-cols-3 lg:gap-6">
            {PASSOS.map((p) => (
              <div key={p.numero} className="relative">
                <div
                  className="mb-3 inline-flex items-center gap-2 rounded-md border-2 px-2.5 py-1 font-display text-xs font-bold tracking-wide"
                  style={{
                    borderColor: p.cor,
                    color: p.cor,
                    transform: `rotate(${p.rotacao}deg)`,
                  }}
                >
                  PEDIDO Nº {p.numero}
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">{p.titulo}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/70">{p.texto}</p>
              </div>
            ))}
          </div>

          {/* linhas de caderno decorativas */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.35]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, transparent, transparent 34px, var(--color-sky) 34px, var(--color-sky) 35px)',
              maskImage: 'linear-gradient(to bottom, transparent 0, black 60px, black calc(100% - 10px), transparent 100%)',
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
