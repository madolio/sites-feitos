export default function Footer() {
  return (
    <footer className="border-t border-linha bg-chumbo text-oficina/80">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg tracking-wide text-oficina uppercase">
              Torque Auto Mecânica
            </p>
            <p className="mt-2 text-sm">Mecânica geral, freios, suspensão e revisão</p>
            <p className="mt-1 text-sm">Sorocaba, SP</p>
          </div>
          <div className="text-sm">
            <p className="dado-oficina text-oficina/50">Contato</p>
            <p className="mt-2">contato@torqueoficina.com.br</p>
            <p>(15) 3221-4488</p>
            <p>Rua dos Mecânicos, 640 — Éden</p>
          </div>
          <div className="text-sm">
            <p className="dado-oficina text-oficina/50">Responsável técnico</p>
            <p className="mt-2">Cláudio Teixeira</p>
            <p className="text-oficina/60">Mecânico, formado pelo SENAI-SP, 22 anos de oficina</p>
          </div>
        </div>
        <p className="mt-10 text-xs text-oficina/70">
          Torque Auto Mecânica é um negócio fictício: conceito de site feito com{' '}
          <span aria-hidden="true" className="text-sinal">♥</span>
          <span className="sr-only">amor</span> pela{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-sinal/50 underline-offset-4"
          >
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
