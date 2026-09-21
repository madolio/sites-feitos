export default function Footer() {
  return (
    <footer className="border-t border-linha bg-tinta text-papel/80">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg text-papel">Razão Contábil</p>
            <p className="mt-2 text-sm">Contabilidade para MEI, pequenas empresas e autônomos</p>
            <p className="mt-1 text-sm">Sorocaba, SP</p>
          </div>
          <div className="text-sm">
            <p className="dado-fiscal text-papel/50">Contato</p>
            <p className="mt-2">contato@razaocontabil.com.br</p>
            <p>(15) 3212-4470</p>
            <p>Rua Doutor Álvaro Soares, 512</p>
          </div>
          <div className="text-sm">
            <p className="dado-fiscal text-papel/50">Responsável técnico</p>
            <p className="mt-2">Marcos Vieira Andrade</p>
            <p className="text-papel/60">Contador, CRC-SP 1SP298471/O-4</p>
          </div>
        </div>
        <p className="mt-10 text-xs text-papel/70">
          Razão Contábil é um negócio fictício: conceito de site feito com{' '}
          <span aria-hidden="true" className="text-prazo">♥</span>
          <span className="sr-only">amor</span> pela{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-prazo/50 underline-offset-4"
          >
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
