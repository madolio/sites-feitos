import { profissionais } from '../data'
import { Navalha, Pente, Tesoura } from './Icones'

// Cada ícone corresponde à especialidade real da pessoa (já escrita em
// data.ts) — tesoura pra corte/coloração, navalha pra barba, pente pra
// escova/tratamento — no lugar da silhueta genérica de "profissional".
const icones = [Tesoura, Navalha, Pente]

export default function Profissionais() {
  return (
    <section className="border-t-2 border-ink py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl sm:text-4xl">Quem vai te atender</h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {profissionais.map((p, i) => {
            const Icone = icones[i % icones.length]
            return (
              <div key={p.name}>
                <Icone className="h-10 w-10 text-vermelho" />
                <h3 className="mt-4 text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-ink/65">{p.especialidade}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
