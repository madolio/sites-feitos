import { pacotes, temas } from '../data'
import Sticker from './Sticker'

const shapeByColor = { sky: 'blob', ember: 'bolt', mint: 'balloon' } as const

export default function Pacotes() {
  return (
    <section id="pacotes" className="scroll-mt-24 border-t-[1.5px] border-carbon py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl sm:text-5xl">Pacotes de festa</h2>
        <p className="mt-3 max-w-md text-lg text-carbon/80">
          Três tamanhos, todos com buffet, decoração e recreação incluídos.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {pacotes.map((p) => (
            <div key={p.nome} className="rounded-3xl border-[1.5px] border-carbon bg-cream p-6">
              <Sticker shape={shapeByColor[p.cor]} color={p.cor} className="h-12 w-12" />
              <h3 className="mt-4 text-2xl">{p.nome}</h3>
              <p className="text-sm text-carbon/70">
                {p.horas} · {p.convidados}
              </p>
              <p className="mt-3 text-carbon/85">{p.inclui}</p>
              <p className="mt-4 font-display text-2xl font-bold">{p.preco}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-3">
          <span className="font-display font-bold">Temas prontos:</span>
          {temas.map((t) => (
            <span key={t} className="rounded-full border-[1.5px] border-carbon px-3.5 py-1.5 text-sm font-semibold">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
