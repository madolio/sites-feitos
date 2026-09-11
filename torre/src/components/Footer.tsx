import { Mark } from './Nav'

export default function Footer() {
  return (
    <footer id="contato" className="scroll-mt-16 border-t border-line py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <Mark className="h-7 w-7" />
              <span className="text-lg font-medium">Torre</span>
            </div>
            <p className="mt-4 max-w-sm text-ink-dim">
              Agenda que se administra sozinha, pra negócios que atendem por
              horário marcado.
            </p>
          </div>

          <a href="mailto:contato@torre.app" className="btn-amber">
            Falar com a Torre
          </a>
        </div>

        <p className="mono mt-14 text-sm text-ink-dim">
          A Torre é um produto fictício: este site é um conceito criado pela{' '}
          <a href="https://madolio.com.br" className="text-cyan underline underline-offset-4">
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
