export default function Footer() {
  return (
    <footer className="border-t border-linha bg-grafite text-limalha/80">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg text-limalha">Trinco Chaveiro e Serralheria</p>
            <p className="mt-2 text-sm">Chaveiro e serralheria, emergência 24h e serviço sob medida</p>
            <p className="mt-1 text-sm">Londrina, PR · atendimento residencial e comercial</p>
          </div>
          <div className="text-sm">
            <p className="dado-placa text-limalha/50">Contato</p>
            <p className="mt-2">contato@trincochaveiro.com.br</p>
            <p>(43) 99112-8845</p>
            <p>Zona Sul de Londrina e região</p>
          </div>
          <div className="text-sm">
            <p className="dado-placa text-limalha/50">Responsável técnico</p>
            <p className="mt-2">Adilson Ferraz</p>
            <p className="text-limalha/60">Chaveiro e serralheiro, 19 anos de ofício</p>
          </div>
        </div>

        <p className="mt-10 text-xs text-limalha/70">
          Trinco Chaveiro e Serralheria é um negócio fictício, conceito de site feito com{' '}
          <span aria-hidden="true" className="text-emergencia">♥</span>
          <span className="sr-only">amor</span> pela{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-latao/50 underline-offset-4"
          >
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
