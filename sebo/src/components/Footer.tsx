export default function Footer() {
  return (
    <footer className="border-t border-creme/10 px-6 py-10 pb-24 text-sm text-grafite sm:px-10 lg:pr-16 lg:pl-16 lg:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Sebo Marginália é uma livraria/sebo fictício: este site é um conceito criado pela{' '}
          <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="underline hover:text-pagina">
            Madolio
          </a>
          .
        </p>
        <p className="rotulo-mao text-lg text-grafite/80">livro lido é livro vivido</p>
      </div>
    </footer>
  )
}
