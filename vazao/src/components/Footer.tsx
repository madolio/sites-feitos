export default function Footer() {
  return (
    <footer className="border-t border-linha bg-tinta text-papel/80">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-papel">Vazão Encanamentos</p>
            <p className="mt-2 text-sm">Encanador avulso, residencial e pequeno comercial</p>
            <p className="mt-1 text-sm">Caxias do Sul, RS</p>
          </div>
          <div className="text-sm">
            <p className="dado-vazao text-papel/50">Contato</p>
            <p className="mt-2">contato@vazaoencanamentos.com.br</p>
            <p>(54) 3222-8871</p>
          </div>
          <div className="text-sm">
            <p className="dado-vazao text-papel/50">Responsável</p>
            <p className="mt-2">Ailton Rezende Marques</p>
            <p className="text-papel/60">Encanador, 17 anos de ofício</p>
          </div>
        </div>
        <p className="mt-10 text-xs text-papel/70">
          Vazão Encanamentos é um negócio fictício — conceito de site feito com{' '}
          <span aria-hidden="true" className="text-emergencia">♥</span>
          <span className="sr-only">amor</span> pela{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-fluxo/50 underline-offset-4"
          >
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
