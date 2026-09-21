export default function Footer() {
  return (
    <footer className="border-t-2 border-preto/20 bg-preto py-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-cinza">
        <span className="font-display text-lg font-bold text-branco">Ferro</span>
      </div>
      <p className="mx-auto mt-4 max-w-5xl px-6 text-sm text-cinza">
        Negócio fictício — conceito de site feito com{' '}
        <span aria-hidden="true" className="text-lima">♥</span>
        <span className="sr-only">amor</span> por{' '}
        <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="underline decoration-cinza/50 underline-offset-4">
          madolio
        </a>
        .
      </p>
    </footer>
  )
}
