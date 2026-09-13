import { Link } from 'react-router-dom'
import Empresa from '../components/Empresa'
import Hero from '../components/Hero'
import OsmosisScale from '../components/OsmosisScale'
import SpecList from '../components/SpecList'
import { treatmentProducts } from '../data/products'

export default function Home() {
  return (
    <>
      <Hero />

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-extrabold text-ink md:text-[2.75rem]">
              Produtos
            </h2>
            <Link
              to="/produtos"
              className="font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Ver catálogo completo
            </Link>
          </div>

          <div className="mt-10">
            <SpecList items={treatmentProducts} />
          </div>
        </div>
      </section>

      <section className="bg-surface-alt py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <div>
            <h2 className="text-3xl font-extrabold text-ink md:text-[2.75rem]">
              Osmose reversa compacta
            </h2>
            <p className="mt-5 max-w-md text-ink/75">
              Sistemas que produzem água desmineralizada removendo sais e
              impurezas, com pré-tratamento de polipropileno e carvão ativado.
              Escolha pela vazão que o seu uso pede.
            </p>
            <Link
              to="/produtos#osmose"
              className="mt-6 inline-block font-semibold text-accent-hover underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Comparar os modelos
            </Link>
          </div>

          <OsmosisScale />
        </div>
      </section>

      <Empresa />
    </>
  )
}
