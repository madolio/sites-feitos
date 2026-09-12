import { Mark } from './Sidebar'

// Antes: bloco escuro "fale com a gente" com CTA grande — mas o CTA já é
// permanente (fixo na Sidebar), então repetir um bloco de call-to-action
// aqui seria redundante. Vira um painel de "sessão" mais discreto, no
// mesmo espírito de instrumento do resto da página.
export default function Footer() {
  return (
    <footer id="contato" className="scroll-mt-16 border-t border-line py-10">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-5 sm:px-6">
        <div className="mono flex items-center gap-2.5 text-sm text-ink-dim">
          <Mark className="h-5 w-5" />
          <span>
            Torre — <a href="mailto:contato@torre.app" className="text-cyan underline underline-offset-4">contato@torre.app</a>
          </span>
        </div>
        <p className="mono text-xs text-ink-dim">
          Produto fictício — conceito criado pela{' '}
          <a href="https://madolio.com.br" className="text-cyan underline underline-offset-4">
            Madolio
          </a>
        </p>
      </div>
    </footer>
  )
}
