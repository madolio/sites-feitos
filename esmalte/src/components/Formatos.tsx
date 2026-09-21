import { formatos } from '../data/formatos'
import Reveal from './Reveal'

export default function Formatos() {
  return (
    <section className="border-b border-linha bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="rotulo-mono">Formato da unha</p>
          <h2 className="mt-2 text-4xl">Do quadrado ao stiletto, por ângulo real de lixa</h2>
          <p className="mt-4 max-w-2xl text-tinta/75">
            Cada formato tem um ângulo de lixamento da lateral, o mesmo vocabulário usado em
            treinamento de nail design. Quanto menor o ângulo, mais afunilada a ponta.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {formatos.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.05} className="rounded-2xl border border-linha bg-marfim p-5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl">{f.nome}</h3>
                <span className="valor-mono text-sm">{f.anguloLateral}</span>
              </div>
              <p className="mt-2 text-sm text-tinta/75">{f.descricao}</p>
              <p className="mt-3 text-xs text-tinta/55">
                <span className="font-semibold text-coral-hover">Indicado para:</span> {f.indicacao}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
