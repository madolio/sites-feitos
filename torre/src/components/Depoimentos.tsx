import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Fernanda L.',
    papel: 'estúdio de pilates, 2 unidades',
    texto:
      'Trocamos uma planilha compartilhada por travas constantes de horário pela Torre em uma tarde. O radar mostrando os horários do dia de forma visual ajudou até a recepção que nunca usou sistema nenhum antes.',
  },
  {
    autor: 'Thiago B.',
    papel: 'clínica odontológica',
    texto:
      'A integração com o Google Agenda foi o motivo de migrarmos. Os dentistas já viviam na agenda do celular e agora não precisam abrir mais nada separado.',
  },
  {
    autor: 'Patrícia G.',
    papel: 'salão de beleza, equipe de 6',
    texto:
      'Migramos a base de 3 anos de outro sistema em CSV e o suporte técnico ajudou a corrigir umas duplicidades que já vinham de antes. Não perdemos histórico nenhum.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="scroll-mt-16 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <Reveal>
          <p className="mono text-sm text-amber">Clientes</p>
          <h2 className="mt-2 text-4xl font-medium tracking-tight md:text-5xl">Quem já opera pela Torre</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="panel p-5">
              <blockquote className="text-sm text-ink-dim">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="mono mt-4 text-xs text-cyan">
                {d.autor} · {d.papel}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
