import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Rafael M.',
    contexto: 'trocou o carro antigo por um cupê esportivo usado',
    texto:
      'Levei meu carro pra avaliação numa quarta e na sexta já tinha assinado o financiamento do cupê. O laudo bateu exatamente com o que o mecânico da família tinha falado, e isso me deu confiança pra fechar rápido.',
  },
  {
    autor: 'Bianca S.',
    contexto: 'financiou um muscle car preparado',
    texto:
      'Rodei a calculadora do site umas cinco vezes mudando a entrada até achar uma parcela que cabia no orçamento. Mandei os documentos numa segunda e na quarta já tinha aprovação do banco.',
  },
  {
    autor: 'Thiago A.',
    contexto: 'comprou um cupê certificado',
    texto:
      'Pedi pra ver o laudo da vistoria antes de decidir e mandaram na hora, sem enrolação. Os 90 dias de garantia de motor e câmbio foram o que me fez topar um carro com mais quilometragem.',
  },
]

export function Depoimentos() {
  return (
    <section id="depoimentos" className="border-b border-fio bg-preto px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-sm tracking-widest text-acento uppercase">Quem já comprou</p>
          <h2 className="mt-3 max-w-xl text-3xl text-marfim sm:text-4xl">Clientes que fecharam com a gente</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="rounded-md border border-fio bg-carvao p-5">
              <blockquote className="text-sm text-fumo">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="mt-4 font-mono text-xs text-marfim">
                {d.autor} <span className="text-fumo">· {d.contexto}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
