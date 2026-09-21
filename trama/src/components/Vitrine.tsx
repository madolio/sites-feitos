import Reveal from './Reveal'
import { categorias } from '../data/categorias'

export default function Vitrine() {
  return (
    <section id="vitrine" className="border-b border-linha bg-cartao/60">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <Reveal>
          <p className="dado-etiqueta text-jeans">o que temos</p>
          <h2 className="mt-2 max-w-lg text-3xl sm:text-4xl">Quatro seções, a loja inteira num só corredor</h2>
        </Reveal>

        <Reveal as="div" stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-2">
          {categorias.map((cat) => (
            <div key={cat.nome} className="rounded-xl border border-linha bg-cru p-6">
              <h3 className="text-xl">{cat.nome}</h3>
              <p className="mt-2 text-sm text-carvao/75">{cat.descricao}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
