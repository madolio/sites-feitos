import Reveal from './Reveal'

const depoimentos = [
  {
    autor: 'Renata A.',
    contexto: 'casamento em Friburgo',
    texto:
      'Pedi Strelitzia e Cattleya pra decorar a cerimônia sem saber que a Cattleya só floresce no outono. A Iara me avisou na hora e sugeriu trocar por Zantedeschia, que ficou ainda melhor com o resto da paisagem.',
  },
  {
    autor: 'Diego M.',
    contexto: 'reforma de jardim',
    texto:
      'A ficha de cuidado que veio no fim do projeto salvou minhas Tibouchinas no primeiro inverno. Segui a rega e a poda exatamente como estava escrito e floriu igual à foto do orçamento.',
  },
  {
    autor: 'Paula S.',
    contexto: 'presente de aniversário',
    texto:
      'Encomendei pelo site sem nunca ter comprado planta online. A Aechmea chegou em duas etapas de água certinhas, com instrução de luz filtrada, e já está com broto novo depois de um mês.',
  },
]

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="border-b border-linha bg-mata py-20 text-vidro">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-terracota">Quem já encomendou</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">Casos reais de jardim e arranjo</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure
              key={d.autor}
              className="relative rounded-lg border border-vidro/20 bg-vidro/5 p-5"
            >
              <span
                aria-hidden="true"
                className="dado-ficha absolute top-4 right-4 rotate-6 rounded border-2 border-terracota/50 px-2 py-0.5 text-terracota/70"
              >
                em folha
              </span>
              <blockquote className="pr-16 text-sm text-vidro/80">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="dado-ficha mt-4 text-vidro/60">
                {d.autor} · {d.contexto}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
