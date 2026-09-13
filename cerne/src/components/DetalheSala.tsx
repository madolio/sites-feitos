import type { Caso, Sala } from '../data/casos'

export default function DetalheSala({ caso, sala }: { caso: Caso; sala: Sala }) {
  return (
    <div>
      <span className="text-sm font-medium text-pine">
        {caso.ambiente} · {caso.area}
      </span>
      <h2 className="mt-2 text-3xl text-ink sm:text-4xl">{sala.nome}</h2>
      <p className="mt-4 max-w-md text-ink/75">{sala.descricao}</p>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-pine" aria-hidden="true" />
        <span className="text-sm font-medium text-ink/80">{sala.material}</span>
      </div>
    </div>
  )
}
