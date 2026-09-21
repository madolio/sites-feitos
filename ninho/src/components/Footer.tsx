export default function Footer() {
  return (
    <footer className="border-t border-linha bg-tinta text-papel/80">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg italic text-papel">Ninho Educação Infantil</p>
            <p className="mt-2 text-sm">Creche e pré-escola, de 0 a 5 anos</p>
            <p className="mt-1 text-sm">Maringá, PR</p>
          </div>
          <div className="text-sm">
            <p className="dado-ficha text-papel/50">Contato</p>
            <p className="mt-2">contato@ninhoeducacaoinfantil.com.br</p>
            <p>(43) 3025-7719</p>
            <p>Rua Piauí, 512, Jardim Leonor</p>
          </div>
          <div className="text-sm">
            <p className="dado-ficha text-papel/50">Coordenação pedagógica</p>
            <p className="mt-2">Fernanda Bittencourt</p>
            <p className="text-papel/60">Pedagoga, especialista em Educação Infantil</p>
          </div>
        </div>

        <p className="mt-10 text-xs text-papel/70">
          Ninho Educação Infantil é um negócio fictício, conceito de site feito com{' '}
          <span aria-hidden="true" className="text-ninho">♥</span>
          <span className="sr-only">amor</span> pela{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-ninho/50 underline-offset-4"
          >
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
