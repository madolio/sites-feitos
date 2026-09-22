import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Beatriz M.',
    procedimento: 'Peeling médio ATA',
    texto:
      'A Dra. Marina já tinha me avisado que ia formar uma casquinha no terceiro dia do peeling médio, então quando aconteceu eu não entrei em pânico. Com 60 dias o resultado ficou melhor do que eu esperava.',
  },
  {
    autor: 'Rodrigo A.',
    procedimento: 'Microagulhamento',
    texto:
      'No primeiro dia depois do microagulhamento minha pele ficou vermelha que nem queimadura de sol, exatamente como tinham explicado na consulta. Gostei de ver o diagrama da pele e entender em que camada o procedimento realmente age.',
  },
  {
    autor: 'Juliana F.',
    procedimento: 'Toxina botulínica',
    texto:
      'Fiquei surpresa que a toxina não fez efeito nenhum no primeiro dia. A Dra. Marina já tinha explicado que ela age no músculo, não na pele, então eu sabia que precisava esperar uns dias.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="border-t border-linha bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-clinico text-derme">Quem já passou por consulta</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">O que pacientes contam depois do procedimento</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure
              key={d.autor}
              className="rounded-xl border border-linha bg-papel p-6 shadow-sm"
            >
              <blockquote className="text-sm text-noturno/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="dado-clinico mt-4 text-noturno/50">
                {d.autor} · {d.procedimento}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
