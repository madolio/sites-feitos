import { EMAIL, EMAIL_HREF } from '../constants'

// O CTA principal já é o botão flutuante (Chrome.tsx), sempre visível — o
// rodapé não precisa repetir o mesmo bloco escuro "bora conversar" que
// aparece no fim de praticamente todo site por aí. Só o essencial.
export default function Footer() {
  return (
    <footer id="contato" className="scroll-mt-20 border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-poster text-lg tracking-wide text-ink/70 uppercase">
            madolio<span className="text-accent">.</span>
          </span>
          <span className="text-sm text-ink/60">© {new Date().getFullYear()} Todos os direitos reservados.</span>
        </div>
        <a href={EMAIL_HREF} className="text-sm font-medium text-ink/70 transition-colors hover:text-ink">
          {EMAIL}
        </a>
      </div>
    </footer>
  )
}
