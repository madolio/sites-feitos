export default function Footer() {
  return (
    <footer className="border-t border-linha bg-tinta text-marfim/80">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg text-marfim">Renata Bastos Nail Studio</p>
            <p className="mt-2 text-sm">Esmalteria de bairro, esmalte em gel, BIAB e unha em pó</p>
            <p className="mt-1 text-sm">Uberlândia, MG</p>
          </div>
          <div className="text-sm">
            <p className="rotulo-mono text-marfim/50">Contato</p>
            <p className="mt-2">contato@renatabastosnails.com.br</p>
            <p>(34) 3236-9915</p>
            <p>Rua Olegário Maciel, 1220 — Centro</p>
          </div>
          <div className="text-sm">
            <p className="rotulo-mono text-marfim/50">Responsável técnica</p>
            <p className="mt-2">Renata Bastos</p>
            <p className="text-marfim/60">Manicure e nail designer, esmalteria própria desde 2016</p>
          </div>
        </div>
        <p className="mt-10 text-xs text-marfim/70">
          Renata Bastos Nail Studio é um negócio fictício: conceito de site feito com{' '}
          <span aria-hidden="true" className="text-coral">♥</span>
          <span className="sr-only">amor</span> pela{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-coral/50 underline-offset-4"
          >
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
