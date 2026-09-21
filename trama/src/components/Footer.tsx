export default function Footer() {
  return (
    <footer className="border-t border-linha bg-carvao text-cru/80">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg italic text-cru">Trama</p>
            <p className="mt-2 text-sm">Loja de roupa de bairro, pronta-entrega do P ao GG</p>
            <p className="mt-1 text-sm">Bairro Floresta, Belo Horizonte, MG</p>
          </div>
          <div className="text-sm">
            <p className="dado-etiqueta text-cru/50">Contato</p>
            <p className="mt-2">contato@lojatrama.com.br</p>
            <p>(31) 3221-4477</p>
            <p>Rua Piauí, 942</p>
          </div>
          <div className="text-sm">
            <p className="dado-etiqueta text-cru/50">Responsável</p>
            <p className="mt-2">Marlene Aparecida Souza</p>
            <p className="text-cru/60">Proprietária, atendendo o bairro desde 2011</p>
          </div>
        </div>
        <p className="mt-10 text-xs text-cru/70">
          Trama é um negócio fictício, conceito de site feito com{' '}
          <span aria-hidden="true" className="text-ferrugem">♥</span>
          <span className="sr-only">amor</span> pela{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-ferrugem/50 underline-offset-4"
          >
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
