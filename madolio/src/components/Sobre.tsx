import Reveal from './Reveal'
import SectionNumber from './SectionNumber'

// Foto real e bio pessoal ainda vão entrar aqui — por enquanto, um
// placeholder discreto (iniciais) em vez de deixar o espaço quebrado ou
// inventar uma biografia que ninguém confirmou.
export default function Sobre() {
  return (
    <section id="sobre" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="grid items-start gap-10 md:grid-cols-[auto_1fr] md:gap-14">
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-surface-alt font-poster text-3xl text-ink/40">
              M.
            </div>
            <span className="text-xs text-ink/40">foto em breve</span>
          </div>

          <div>
            <SectionNumber n="07" label="Quem faz" />
            <h2 className="font-poster text-4xl tracking-tight text-ink uppercase md:text-5xl">
              Quem faz o seu site
            </h2>
            <p className="mt-4 max-w-xl text-ink/70">
              Cada site passa pelas minhas mãos, do primeiro esboço à
              publicação. Não é atendimento por triagem nem repasse pra
              freelancer terceirizado — quem conversa com você no orçamento é
              quem entrega o site.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
