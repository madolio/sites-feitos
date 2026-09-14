import { sendToEmail } from '../demo'
import { Mark } from './Nav'

export default function Footer() {
  return (
    <footer id="contato" className="scroll-mt-16 border-t border-line py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl">Vamos desenhar o seu projeto?</h2>
            <p className="mt-4 max-w-md text-ink/75">
              Conta um pouco sobre o terreno ou o imóvel, e a gente retorna
              com os próximos passos.
            </p>
            <div className="mt-7 flex flex-wrap gap-6">
              <button type="button" onClick={() => sendToEmail('projetos@tracoarquitetura.com.br')} className="btn-ink">
                projetos@tracoarquitetura.com.br
              </button>
            </div>
          </div>

          <div className="md:pt-1">
            <div className="flex items-center gap-2.5">
              <Mark className="h-7 w-7" />
              <span className="font-serif text-xl">Traço</span>
            </div>
            <p className="mt-4 text-ink/75">São Paulo, SP — atendimento em todo o Brasil</p>
          </div>
        </div>

        <p className="mt-16 border-t border-line pt-6 text-sm text-ink/70">
          O Traço é um escritório fictício: este site é um conceito criado
          pela{' '}
          <a href="https://madolio.com.br" className="underline decoration-blueline underline-offset-4">
            Madolio
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
