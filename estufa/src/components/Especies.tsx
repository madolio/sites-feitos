import { especies } from '../data/especies'
import EspecimeCard from './EspecimeCard'
import Reveal from './Reveal'
import VideiraCrescente from './VideiraCrescente'

export default function Especies() {
  return (
    <section id="especies" className="relative bg-vidro py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-musgo">Catálogo botânico</p>
          <h2 className="mt-2 max-w-xl text-4xl">Cada espécie, uma ficha — não uma foto de vitrine</h2>
          <p className="mt-4 max-w-2xl text-mata/70">
            Nome científico, floração, exigência de luz e nível de cuidado são
            dados reais de cada planta — como uma prancheta de herbário, não
            um produto genérico com preço e "adicionar ao carrinho".
          </p>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-12 max-w-5xl px-6 sm:px-8">
        <VideiraCrescente className="pointer-events-none absolute top-0 -left-2 hidden h-full w-10 lg:block" />

        <Reveal as="div" stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {especies.map((especie) => (
            <EspecimeCard key={especie.id} especie={especie} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
