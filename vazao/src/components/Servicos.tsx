import Reveal from './Reveal'
import { servicos } from '../data/servicos'

export default function Servicos() {
  return (
    <section id="servicos" className="border-b border-linha bg-papel">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
        <Reveal>
          <p className="dado-vazao text-fluxo">o que fazemos</p>
          <h2 className="mt-2 max-w-lg text-3xl sm:text-4xl">Quatro frentes, o essencial de um encanador avulso</h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-8 overflow-hidden rounded-xl border border-linha">
          <img
            src="https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Mãos de encanador ajustando conexões de cano sob uma pia durante um conserto"
            className="h-56 w-full object-cover sm:h-72"
            loading="lazy"
            width={1200}
            height={800}
          />
        </Reveal>

        <Reveal as="div" stagger={0.08} className="mt-8 grid gap-5 sm:grid-cols-2">
          {servicos.map((s) => (
            <div key={s.nome} className="rounded-xl border border-linha bg-papel-forte/60 p-6">
              <h3 className="text-xl">{s.nome}</h3>
              <p className="mt-2 text-sm text-tinta/75">{s.descricao}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
