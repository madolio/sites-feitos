import type { Especie } from '../data/especies'
import EspecieIlustracao from './EspecieIlustracao'

const corCuidado: Record<Especie['cuidado'], string> = {
  fácil: 'text-musgo',
  moderado: 'text-terracota',
  exigente: 'text-terracota-hover',
}

export default function EspecimeCard({ especie }: { especie: Especie }) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-lg border border-linha bg-white/60 shadow-[0_1px_0_var(--color-linha)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-mata/10">
        <img
          src={`/especies/${especie.ilustracao}.jpg`}
          alt={`Foto de ${especie.comum} (${especie.cientifico}) em cultivo`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <EspecieIlustracao
          tipo={especie.ilustracao}
          className="absolute right-2 bottom-2 h-16 w-11 text-vidro drop-shadow-[0_1px_2px_rgba(16,36,28,0.55)]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="dado-ficha absolute top-4 right-4 text-vidro/80">{especie.familia}</span>

        <div className="mt-1 text-center">
          <h3 className="binomial">
            {especie.cientifico} <span className="text-sm not-italic text-mata/50">{especie.autor}</span>
          </h3>
          <p className="mt-0.5 text-sm text-mata/70">{especie.comum}</p>
        </div>

        <dl className="dado-ficha mt-5 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-linha pt-4 text-mata/80">
          <div>
            <dt className="text-mata/45">Luz</dt>
            <dd className="normal-case">{especie.luz}</dd>
          </div>
          <div>
            <dt className="text-mata/45">Cuidado</dt>
            <dd className={`normal-case font-semibold ${corCuidado[especie.cuidado]}`}>{especie.cuidado}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-mata/45">Floração</dt>
            <dd className="normal-case">{especie.floracao}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-mata/45">Água</dt>
            <dd className="normal-case">{especie.agua}</dd>
          </div>
        </dl>

        <p className="mt-4 border-t border-linha pt-4 text-sm leading-relaxed text-mata/75">{especie.nota}</p>

        <p className="mt-4 text-xs tracking-wide text-mata/50 uppercase">Uso: {especie.uso}</p>
      </div>
    </article>
  )
}
