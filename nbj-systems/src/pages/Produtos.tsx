import OsmosisScale from '../components/OsmosisScale'
import SpecList from '../components/SpecList'
import { treatmentProducts } from '../data/products'

export default function Produtos() {
  return (
    <>
      <section className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="max-w-3xl text-[2.5rem] font-extrabold leading-[1.02] text-ink md:text-[3.75rem]">
            Equipamentos para filtração e tratamento de água
          </h1>
          <p className="mt-6 max-w-xl text-ink/75">
            Soluções projetadas para atender às necessidades de clínicas,
            hospitais e indústrias.
          </p>

          <div className="mt-14">
            <SpecList items={treatmentProducts} />
          </div>
        </div>
      </section>

      <section id="osmose" className="scroll-mt-20 bg-surface-alt py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <h2 className="text-3xl font-extrabold text-ink md:text-[2.75rem]">
              Osmose reversa compacta
            </h2>
            <p className="mt-5 max-w-md text-ink/75">
              Sistemas compactos que produzem água desmineralizada com alta
              eficiência, removendo sais e impurezas. Ideais para usos
              industriais, laboratoriais e hospitalares.
            </p>
          </div>

          <OsmosisScale detailed />
        </div>
      </section>
    </>
  )
}
