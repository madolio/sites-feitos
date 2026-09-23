import { ADDRESS, EMAIL, EMAIL_HREF, FIRM_NAME, FOUNDING_YEAR, LAWYER_NAME, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_URL } from '../config/site'
import Reveal from './Reveal'

// Substitui `Console.tsx` — o wildcard de contato agora é uma ficha de
// requisição, como as que se preenchem à mão pra retirar um volume do
// acervo: papel, régua pontilhada, linhas de preenchimento — não mais um
// console com relógio contando ao vivo (a página não precisa fingir estar
// "ao vivo" o tempo inteiro; o motion vive no catálogo, que reage ao clique).

// O e-mail tem 30 caracteres sem espaço e é a maior "palavra" da ficha. Célula
// de grid não encolhe abaixo do próprio min-content, então essa palavra sozinha
// segurava a ficha em 328px e estourava a viewport de 320px.
//
// A solução é dar ao navegador um ponto de quebra logo depois do @ — o lugar
// onde um endereço se lê partido. Quebrar em qualquer caractere resolveria a
// conta do mesmo jeito e devolveria coisas como "...advocaci / a.com.br"; nos
// pontos do domínio, "...com. / br". Com um <wbr> só, o pior caso vira
// "contato@ / bastosadvocacia.com.br", e o p-8 do design fica intacto.
const DEPOIS_DO_ARROBA = EMAIL.indexOf('@') + 1
const EMAIL_LOCAL = EMAIL.slice(0, DEPOIS_DO_ARROBA)
const EMAIL_DOMINIO = EMAIL.slice(DEPOIS_DO_ARROBA)

export default function Ledger() {
  return (
    <footer id="contato" className="scroll-mt-20 bg-panel text-paper">
      <div className="mx-auto max-w-3xl px-6 pt-20 pb-10 md:pt-24">
        <Reveal className="grid gap-0 border border-paper/20 md:grid-cols-[1.4fr_1fr]">
          <div className="p-8 md:p-10">
            <p className="text-[0.6875rem] tracking-[0.14em] text-accent-light uppercase">
              Ficha de requisição
            </p>

            <h2 className="mt-4 text-3xl text-paper md:text-4xl">Solicitar uma consulta</h2>
            <p className="mt-4 max-w-md text-paper/70">
              Conte o que está acontecendo — a gente responde em até 24h com
              um caminho claro pro seu caso.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-paper px-6 py-3 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-paper/85"
              >
                Falar no WhatsApp
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center border border-paper/25 px-6 py-3 text-[0.9375rem] font-semibold text-paper transition-colors hover:border-paper/60"
              >
                {PHONE_DISPLAY}
              </a>
            </div>

            <div className="mt-10 border-t border-paper/15 pt-6">
              <p className="text-[0.6875rem] tracking-[0.14em] text-paper/50 uppercase">Ex libris</p>
              <p className="mt-2 font-heading text-lg leading-relaxed text-paper/90">
                "Boa parte dos processos que eu vejo começou com um contrato
                mal escrito. Meu trabalho é resolver isso antes — não depois."
              </p>
              <p className="mt-3 text-sm text-paper/60">
                {LAWYER_NAME}, à frente do escritório desde {FOUNDING_YEAR}
              </p>
            </div>
          </div>

          <div className="border-t border-paper/15 p-8 md:border-t-0 md:border-l md:p-10">
            <dl className="space-y-6">
              <div>
                <dt className="text-[0.6875rem] tracking-[0.14em] text-paper/50 uppercase">
                  Endereço
                </dt>
                <dd className="mt-1 text-paper">{ADDRESS}</dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] tracking-[0.14em] text-paper/50 uppercase">
                  E-mail
                </dt>
                <dd className="mt-1">
                  <a href={EMAIL_HREF} className="text-paper transition-colors hover:text-paper/80">
                    {EMAIL_LOCAL}
                    <wbr />
                    {EMAIL_DOMINIO}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.6875rem] tracking-[0.14em] text-paper/50 uppercase">
                  Horário de leitura
                </dt>
                <dd className="mt-1 text-paper">Seg. a sex., 9h às 18h</dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-paper/60">
          <span className="font-heading text-paper/70">{FIRM_NAME}</span>
          <span>
            © {new Date().getFullYear()} {FIRM_NAME}. Todos os direitos reservados.
          </span>
        </div>

        <p className="mt-3 text-sm text-paper/60">
          feito com <span aria-hidden="true" className="text-accent-light">♥</span>
          <span className="sr-only">amor</span> por{' '}
          <a
            href="https://madolio.com.br"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-paper/50 underline-offset-4"
          >
            madolio
          </a>
        </p>
      </div>
    </footer>
  )
}
