import { docinhos } from '../data'
import Docinho from './Docinho'

export default function Docinhos() {
  return (
    <section id="docinhos" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 className="display text-5xl md:text-7xl">Docinhos de festa</h2>
          <p className="max-w-md text-lg text-ink/75 md:justify-self-end">
            Vendidos por cento, com no mínimo 25 unidades por sabor. Combinam
            com qualquer bolo da cartela.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-10">
          {docinhos.map((d) => (
            <li key={d.kind} className="group">
              <Docinho
                kind={d.kind}
                className="mx-auto h-auto w-full max-w-[11rem] transition-transform duration-500 ease-out group-hover:rotate-[18deg] motion-reduce:transition-none"
              />
              <h3 className="mt-5 text-center text-xl font-semibold">{d.name}</h3>
              <p className="mx-auto mt-1 max-w-[16rem] text-center text-ink/70">{d.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
