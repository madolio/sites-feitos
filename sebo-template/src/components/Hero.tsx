import { site } from '../config/site'
import { hero, livros } from '../data/conteudo'
import { Preco } from './ui'

export default function Hero() {
  return (
    <section id="inicio" className="px-6 pt-16 pb-20 sm:px-10 sm:pt-24 lg:pl-16 lg:pt-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0">
          {site.logo ? (
            <img src={site.logo.src} alt={site.logo.alt} className="h-12 w-auto" />
          ) : (
            <p className="rotulo-mao text-3xl break-words sm:text-4xl">{hero.rotulo || site.name}</p>
          )}
          <h1 className="mt-4 text-4xl text-foreground sm:text-5xl lg:text-6xl">{hero.title}</h1>
          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">{hero.text}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#acervo" className="btn-carimbo">
              {hero.primary}
            </a>
            <a href="#processo" className="btn-contorno">
              {hero.secondary}
            </a>
          </div>
        </div>

        <FichaDestaque />
      </div>
    </section>
  )
}

/** A ficha ao lado do título mostra um exemplar de `livros` (hero.ficha.livro). */
function FichaDestaque() {
  const livro = livros[hero.ficha.livro] ?? livros[0]
  if (!livro) return null
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="ficha textura-papel relative -rotate-2 p-6 sm:p-7">
        <p className="text-xs tracking-wide text-ink-muted uppercase">{hero.ficha.rotulo}</p>
        <p className="mt-2 font-display text-2xl font-semibold">{livro.titulo}</p>
        <p className="text-sm text-ink-muted">
          {livro.autor} — {livro.edicao}
        </p>

        <div className="mt-5 border-t border-ink/15 pt-4">
          <p className="rotulo-mao !text-accent text-xl">{hero.ficha.citacao || livro.estado}</p>
          {hero.ficha.legenda && <p className="mt-1 text-xs text-ink-muted">— {hero.ficha.legenda}</p>}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xs text-ink-muted">
            {hero.ficha.estado} {livro.estado}
          </span>
          {livro.preco !== undefined && <Preco valor={livro.preco} className="h-14 w-14 -rotate-6 text-sm" />}
        </div>
      </div>

      {/* segunda ficha, espiando atrás, sugerindo pilha/acervo */}
      <div className="ficha absolute inset-0 -z-10 translate-x-3 translate-y-3 rotate-3 opacity-60" aria-hidden="true" />
    </div>
  )
}
