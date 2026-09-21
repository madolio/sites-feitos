export default function Footer() {
  return (
    <footer className="border-t border-linha bg-tinta text-papel/80">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg italic text-papel">Escuta Psicologia</p>
            <p className="mt-2 text-sm">Psicoterapia individual para adultos</p>
            <p className="mt-1 text-sm">Juiz de Fora, MG · atendimento online e presencial</p>
          </div>
          <div className="text-sm">
            <p className="dado-ficha text-papel/50">Contato</p>
            <p className="mt-2">contato@escutapsicologia.com.br</p>
            <p>(32) 3221-4488</p>
            <p>Rua Halfeld, 640, sala 302</p>
          </div>
          <div className="text-sm">
            <p className="dado-ficha text-papel/50">Responsável técnica</p>
            <p className="mt-2">Dra. Renata Casagrande</p>
            <p className="text-papel/60">Psicóloga clínica, CRP 04/118527</p>
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-papel/20 bg-papel/5 p-4 text-sm text-papel/75">
          <strong className="text-papel">Se você está em crise ou pensando em se machucar:</strong>{' '}
          ligue para o CVV pelo número <strong className="text-papel">188</strong>, gratuito e
          disponível 24h todos os dias. Este site não substitui atendimento de urgência.
        </div>

        <p className="mt-8 text-xs text-papel/70">
          Escuta Psicologia é um negócio fictício, conceito de site feito com{' '}
          <span aria-hidden="true" className="text-acolhe">♥</span>
          <span className="sr-only">amor</span> pela{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-acolhe/50 underline-offset-4"
          >
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
