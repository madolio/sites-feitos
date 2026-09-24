import Reveal from './Reveal'
import SectionNumber from './SectionNumber'

// A foto real ainda não existe: o monograma "M." ocupa o lugar dela, sem
// legenda prometendo algo. Quando houver foto, trocar o <div> do círculo por
// <img> (com alt e width/height). Nada de bio inventada aqui.
export default function Sobre() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="grid items-start gap-10 md:grid-cols-[auto_1fr] md:gap-14">
          <div className="flex justify-center sm:justify-start" aria-hidden="true">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-ink font-poster text-4xl text-paper">
              M.
            </div>
          </div>

          <div>
            <SectionNumber n="07" label="Quem faz" />
            <h2 className="font-poster text-4xl tracking-tight text-ink uppercase md:text-5xl">
              Quem faz o seu site
            </h2>

            <div className="mt-4 max-w-xl space-y-4 text-ink/70">
              <p>
                Sou Henrique Madolio, formado em Sistemas de Informação pela
                UNIP (2026). Trabalho com{' '}
                <strong className="font-semibold text-accent">UI/UX</strong> e
                já passei um bom tempo do outro lado do balcão: no
                atendimento a clientes de uma plataforma de{' '}
                <strong className="font-semibold text-accent">
                  criação de sites
                </strong>
                .
              </p>
              <p>
                Foi ali que aprendi, na prática, onde as pessoas travam de
                verdade ao montar uma página — não na teoria, no cliente
                mesmo, ligando sem saber como continuar. Essa rotina me deu
                uma{' '}
                <strong className="font-semibold text-accent">
                  visão estratégica
                </strong>{' '}
                mais ampla: entender não só como uma página é construída, mas
                como ela é percebida por quem chega nela.
              </p>
              <p>
                Hoje uso essa mistura —{' '}
                <strong className="font-semibold text-accent">UI/UX</strong>,
                desenvolvimento e{' '}
                <strong className="font-semibold text-accent">
                  experiência do usuário
                </strong>{' '}
                real — pra pensar cada site dos dois lados: o de quem
                constrói e o de quem só quer entender rápido o que fazer na
                página.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
