import Reveal from './Reveal'

// Prova social como registro de casos arquivados — cada depoimento é uma
// ficha encerrada, com número de chamada (mesmo esquema CDU do `Catalog.tsx`)
// e um selo "ARQUIVADO" no canto, como o carimbo de baixa de um processo,
// em vez de um card de citação genérico com aspas grandes.
const casos = [
  {
    cliente: 'Renata M.',
    callNumber: 'CDU 347.44',
    area: 'Direito Contratual',
    texto:
      'Um fornecedor tentou renovar o contrato sozinho, com uma cláusula de multa que eu nem tinha visto. A revisão pegou o problema antes da assinatura e a negociação foi resolvida sem processo.',
  },
  {
    cliente: 'Diego A.',
    callNumber: 'CDU 347.7',
    area: 'Direito Societário',
    texto:
      'Saí de uma sociedade de oito anos sem entender o valor da minha cota. O acordo de saída ficou pronto em três semanas, com os números explicados um a um antes de eu assinar qualquer coisa.',
  },
  {
    cliente: 'Fernanda B.',
    callNumber: 'CDU 347.9',
    area: 'Contencioso Cível',
    texto:
      'Uma cobrança indevida ia virar execução contra minha empresa. A defesa foi protocolada a tempo e o processo terminou em acordo, bem abaixo do valor cobrado inicialmente.',
  },
]

export default function Registro() {
  return (
    <section id="registro" className="scroll-mt-20 border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <Reveal>
          <p className="catalog-code text-xs tracking-[0.14em] text-accent-hover uppercase">
            Registro de casos
          </p>
          <h2 className="mt-3 text-3xl text-ink md:text-4xl">Fichas encerradas do acervo</h2>
          <p className="mt-4 max-w-xl text-ink/70">
            Casos reais, com nomes abreviados por sigilo — cada um catalogado
            na mesma área em que foi resolvido.
          </p>
        </Reveal>

        <Reveal delay={0.08} stagger={0.08} className="mt-10 grid gap-5 md:grid-cols-3">
          {casos.map((c) => (
            <figure
              key={c.cliente}
              className="relative flex flex-col border border-ink/15 bg-paper p-6"
            >
              <span
                aria-hidden="true"
                className="catalog-code absolute top-5 right-5 rotate-6 rounded border-2 border-stamp/60 px-2 py-0.5 text-[0.625rem] tracking-[0.1em] text-stamp/70 uppercase"
              >
                arquivado
              </span>

              <span className="catalog-code text-xs text-accent-hover">{c.callNumber}</span>

              <blockquote className="mt-4 flex-1 pr-6 text-sm text-ink/80">
                &ldquo;{c.texto}&rdquo;
              </blockquote>

              <figcaption className="mt-5 border-t border-ink/10 pt-3">
                <span className="font-heading text-sm text-ink">{c.cliente}</span>
                <span className="block text-xs text-ink/55">{c.area}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
