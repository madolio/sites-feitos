export default function Hero() {
  return (
    <section id="inicio" className="scroll-mt-10 px-6 pt-16 pb-20 sm:px-10 sm:pt-24 lg:pl-16 lg:pt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="rotulo-mao text-3xl sm:text-4xl">sebo marginália</p>
          <h1 className="mt-4 text-4xl text-pagina sm:text-5xl lg:text-6xl">
            Livro usado não é livro velho.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-grafite sm:text-xl">
            É livro com história. Cada exemplar que passa pelo nosso balcão chega com o grifo, a dedicatória ou a
            orelha dobrada de quem leu antes — a gente não apaga isso, cataloga. E vende por um preço que cabe no
            bolso de quem vai continuar a história.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#acervo" className="btn-carimbo">
              Ver o acervo
            </a>
            <a href="#processo" className="btn-contorno">
              Como avaliamos seu acervo
            </a>
          </div>
        </div>

        <FichaDestaque />
      </div>
    </section>
  )
}

function FichaDestaque() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="ficha textura-papel relative -rotate-2 p-6 sm:p-7">
        <p className="text-xs tracking-wide text-tinta/60 uppercase">Ficha de venda nº 0412</p>
        <h2 className="mt-2 text-2xl text-tinta">Cem Anos de Solidão</h2>
        <p className="text-sm text-tinta/70">Gabriel García Márquez — Record, 1985</p>

        <div className="mt-5 border-t border-tinta/15 pt-4">
          <p className="rotulo-mao text-xl text-carimbo/90">"Pra Helena, no seu aniversário — 1998."</p>
          <p className="mt-1 text-xs text-tinta/55">— dedicatória na folha de guarda, encontrada intacta</p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-tinta/60">estado: com dedicatória</span>
          <span className="carimbo-preco flex h-14 w-14 shrink-0 -rotate-6 items-center justify-center text-carimbo">
            <span className="text-center text-sm leading-tight font-semibold">
              R$
              <br />
              65
            </span>
          </span>
        </div>
      </div>

      {/* segunda ficha, espiando atrás, sugerindo pilha/acervo */}
      <div
        className="ficha absolute inset-0 -z-10 translate-x-3 translate-y-3 rotate-3 opacity-60"
        aria-hidden="true"
      />
    </div>
  )
}
