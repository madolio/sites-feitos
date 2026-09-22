import { livros } from '../data/livros'

export default function Catalogo() {
  return (
    <section id="acervo" className="scroll-mt-10 px-6 py-20 sm:px-10 lg:pl-16">
      <div className="mx-auto max-w-6xl">
        <p className="rotulo-mao text-2xl text-carimbo/90">acervo desta semana</p>
        <h2 className="mt-2 max-w-2xl text-3xl text-pagina sm:text-4xl">
          Seis exemplares, seis histórias diferentes.
        </h2>
        <p className="mt-3 max-w-2xl text-grafite">
          Nunca reimprimimos condição — o que está na ficha é exatamente o que chegou no balcão. Se sumir daqui, é
          porque alguém já levou aquele exemplar específico.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {livros.map((livro) => (
            <article key={livro.titulo} className="ficha textura-papel flex flex-col p-5">
              <p className="text-xs tracking-wide text-tinta/55 uppercase">{livro.edicao}</p>
              <h3 className="mt-1.5 text-xl text-tinta">{livro.titulo}</h3>
              <p className="text-sm text-tinta/70">{livro.autor}</p>

              <p className="mt-3 flex-1 border-t border-tinta/12 pt-3 text-sm text-tinta/75">{livro.nota}</p>

              <div className="mt-4 flex items-end justify-between gap-3">
                <span className="inline-block rounded-sm border border-tinta/25 px-2.5 py-1 text-xs text-tinta/65">
                  {livro.estado}
                </span>
                <span className="carimbo-preco flex h-12 w-12 shrink-0 items-center justify-center text-carimbo">
                  <span className="text-center text-xs leading-tight font-semibold">
                    R$
                    <br />
                    {livro.preco}
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
