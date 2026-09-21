import Reveal from './Reveal'
import { servicos } from '../data/servicos'

export default function Servicos() {
  return (
    <section id="servicos" className="border-b border-linha bg-papel-forte/40 py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-agua">o que fazemos</p>
          <h2 className="mt-2 max-w-lg text-3xl sm:text-4xl">Serviços</h2>
          <p className="mt-3 max-w-xl text-sm text-tinta/60">
            Valores ilustrativos, de referência — a faixa final depende do porte e do estado do pelo
            do seu pet.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {servicos.map((s) => (
            <div key={s.nome} className="rounded-xl border border-linha bg-papel p-6">
              <h3 className="text-xl">{s.nome}</h3>
              <p className="mt-2 text-sm text-tinta/70">{s.descricao}</p>
              <p className="dado-ficha mt-4 text-pelo">{s.faixa}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
