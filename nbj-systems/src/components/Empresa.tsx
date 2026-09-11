import { sectors } from '../data/sectors'

export default function Empresa() {
  return (
    <section id="setores" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="text-lg font-semibold text-ink/75">Setores atendidos</h2>
          <ul className="mt-5 space-y-1">
            {sectors.map((sector) => (
              <li
                key={sector.name}
                className="font-heading text-[1.5rem] font-bold leading-tight text-ink sm:text-[1.75rem] md:text-[2.25rem]"
                style={{ fontStretch: '116%' }}
              >
                {sector.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:pt-12">
          <h2 className="text-2xl font-bold text-ink md:text-3xl">
            Fabricando desde 1990
          </h2>
          <div className="mt-5 max-w-prose space-y-4 text-ink/75">
            <p>
              A NBJ Systems atua no tratamento de água há mais de 30 anos e é
              reconhecida pela produção de equipamentos duráveis e de alta
              performance. Inovação, pesquisa e desenvolvimento fazem parte da
              nossa trajetória desde o início.
            </p>
            <p>
              Nossa equipe técnica acompanha cada cliente do início ao fim, em
              toda a Grande São Paulo e no interior, para que a água chegue com
              a qualidade que cada aplicação exige.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
