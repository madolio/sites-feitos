import { acervo, livros } from '../data/conteudo'
import { Preco } from './ui'

export default function Catalogo() {
  return (
    <section id="acervo" className="px-6 py-20 sm:px-10 lg:pl-16">
      <div className="mx-auto max-w-6xl">
        <p className="rotulo-mao">{acervo.rotulo}</p>
        <h2 className="mt-2 max-w-2xl text-3xl text-foreground sm:text-4xl">{acervo.title}</h2>
        <p className="mt-3 max-w-2xl text-muted">{acervo.intro}</p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {livros.map((livro) => (
            <li key={livro.titulo}>
              <article className="ficha textura-papel flex h-full flex-col p-5">
                <p className="text-xs tracking-wide text-ink-muted uppercase">{livro.edicao}</p>
                <h3 className="mt-1.5 text-xl text-ink">{livro.titulo}</h3>
                <p className="text-sm text-ink-muted">{livro.autor}</p>

                <p className="mt-3 flex-1 border-t border-ink/15 pt-3 text-sm text-ink-muted">{livro.nota}</p>

                <div className="mt-4 flex items-end justify-between gap-3">
                  <span className="inline-block rounded-sm border border-ink/30 px-2.5 py-1 text-xs text-ink-muted">{livro.estado}</span>
                  {livro.preco !== undefined && <Preco valor={livro.preco} className="h-12 w-12 text-xs" />}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
