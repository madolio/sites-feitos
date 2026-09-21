export default function Footer() {
  return (
    <footer className="border-t border-linha bg-tinta text-papel/80">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg italic text-papel">Estúdio Pelagem</p>
            <p className="mt-2 text-sm">Banho e tosa, por tipo de pelagem</p>
            <p className="mt-1 text-sm">Joinville, SC</p>
          </div>
          <div className="text-sm">
            <p className="dado-ficha text-papel/50">Contato</p>
            <p className="mt-2">contato@estudiopelagem.com.br</p>
            <p>(54) 3221-7740</p>
            <p>Rua Os Dezoito do Forte, 512</p>
          </div>
          <div className="text-sm">
            <p className="dado-ficha text-papel/50">Responsável técnica</p>
            <p className="mt-2">Bianca Torres</p>
            <p className="text-papel/60">Tosadora profissional, 9 anos de estúdio</p>
          </div>
        </div>

        <p className="mt-8 text-xs text-papel/70">
          Estúdio Pelagem é um negócio fictício, conceito de site feito com{' '}
          <span aria-hidden="true" className="text-pelo">♥</span>
          <span className="sr-only">amor</span> pela{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-pelo/50 underline-offset-4"
          >
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
