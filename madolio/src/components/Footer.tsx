import { EMAIL, EMAIL_HREF } from '../constants'

// O CTA principal já é o botão flutuante (Chrome.tsx), sempre visível — o
// rodapé não precisa repetir o mesmo bloco escuro "bora conversar" que
// aparece no fim de praticamente todo site por aí. Só o essencial.
export default function Footer() {
  return (
    <footer id="contato" className="scroll-mt-20 border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-ink/60">
        <span>© {new Date().getFullYear()} Madolio. Todos os direitos reservados.</span>
        <a href={EMAIL_HREF} className="font-medium text-ink/70 transition-colors hover:text-ink">
          {EMAIL}
        </a>
      </div>
    </footer>
  )
}
