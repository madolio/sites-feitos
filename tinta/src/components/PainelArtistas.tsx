import { artistas } from '../data/flashes'

export default function PainelArtistas() {
  return (
    <section className="panel flex h-svh w-screen shrink-0 flex-col justify-center overflow-y-auto px-6 py-20 sm:px-10">
      <h2 className="font-display text-3xl tracking-widest text-paper uppercase sm:text-4xl">
        Quem tatua
      </h2>

      <ul className="mt-10 grid max-w-2xl gap-6 sm:grid-cols-3">
        {artistas.map((a) => (
          <li key={a.nome} className="border border-line p-6">
            <span className="font-display text-4xl text-ember">
              {a.nome
                .split(' ')
                .map((p) => p[0])
                .join('')}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-paper">{a.nome}</h3>
            <p className="mt-1 text-sm text-paper/60">{a.estilo}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
