export default function Footer() {
  return (
    <footer className="border-t-2 border-crosta py-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-crosta/60">
        <span className="font-display text-crosta/80">Fornada</span>
      </div>
      <p className="mx-auto mt-4 max-w-5xl px-6 text-sm text-crosta/70">
        Negócio fictício — conceito de site feito com{' '}
        <span aria-hidden="true" className="text-forno">♥</span>
        <span className="sr-only">amor</span> por{' '}
        <a href="https://madolio.com.br" target="_blank" rel="noreferrer" className="underline decoration-crosta/50 underline-offset-4">
          madolio
        </a>
        .
      </p>
    </footer>
  )
}
