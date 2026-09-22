// O selo de cada etapa é literalmente um carimbo (imitando o carimbo de
// tinta que sebos de verdade usam na página de rosto) — não ícone em
// caixinha nem numeração circular genérica.
const ETAPAS = [
  {
    carimbo: 'RECEBIDO',
    titulo: 'Você traz a caixa, a gente abre na hora',
    texto:
      'Sem agendar avaliação com uma semana de antecedência: trazendo até 3 caixas, a triagem acontece na hora, no balcão, na sua frente.',
  },
  {
    carimbo: 'AVALIADO',
    titulo: 'Cada exemplar é folheado, não só pesado',
    texto:
      'Miolo, lombada, grifos, anotações — a condição real é o que define o preço, não uma tabela por editora. Livro com dedicatória de outra pessoa vale mais, não menos: é história, não defeito.',
  },
  {
    carimbo: 'CATALOGADO',
    titulo: 'A ficha registra o que faz aquele exemplar único',
    texto:
      'Não escrevemos "bom estado" — escrevemos "grifo a lápis até a pág. 114" ou "mancha de café no canto". Quem compra sabe exatamente o que está levando.',
  },
  {
    carimbo: 'À VENDA',
    titulo: 'No balcão — ou trocado no nosso sarau',
    texto:
      'Uma vez por mês, o sarau de troca: você leva 3 livros que já leu e sai com 3 outros da nossa curadoria, sem dinheiro trocando de mão.',
  },
]

export default function Processo() {
  return (
    <section id="processo" className="scroll-mt-10 bg-pano-2 px-6 py-20 sm:px-10 lg:pl-16">
      <div className="mx-auto max-w-6xl">
        <p className="rotulo-mao text-2xl text-carimbo/90">como avaliamos um acervo</p>
        <h2 className="mt-2 max-w-2xl text-3xl text-pagina sm:text-4xl">
          Da sua estante pro nosso balcão, em quatro carimbos.
        </h2>
        <p className="mt-3 max-w-2xl text-grafite">
          Curadoria de Theo Marins, ex-bibliotecário — 14 anos catalogando acervo público antes de abrir o sebo.
        </p>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPAS.map((etapa, i) => (
            <li key={etapa.carimbo} className="relative">
              <span
                className="inline-block -rotate-3 rounded-sm border-2 px-3 py-1.5 text-xs font-bold tracking-wider text-carimbo"
                style={{ borderColor: 'var(--color-carimbo)' }}
              >
                {String(i + 1).padStart(2, '0')} · {etapa.carimbo}
              </span>
              <h3 className="mt-4 text-lg text-pagina">{etapa.titulo}</h3>
              <p className="mt-2 text-sm text-grafite">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
