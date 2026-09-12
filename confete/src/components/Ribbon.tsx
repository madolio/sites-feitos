import { depoimentos } from '../data'

// A fita ondulada por trás do bloco inteiro — versão 2D e achatada do motivo
// de "fitas 3D texturizadas" do estilo de referência. A onda fica só nas
// bordas de cima/baixo (fora da área do texto); o meio é sólido, pra não
// cruzar as linhas do depoimento.
export default function Ribbon() {
  return (
    <section className="border-t-[1.5px] border-carbon py-20 md:py-28">
      <div className="relative mx-auto max-w-3xl px-6">
        <svg
          viewBox="0 0 600 240"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M0 30 Q75 0 150 30 T300 30 T450 30 T600 30 V210 Q525 240 450 210 T300 210 T150 210 T0 210 Z"
            fill="var(--color-sky)"
            stroke="var(--color-carbon)"
            strokeWidth="1.6"
          />
        </svg>

        <div className="relative grid gap-8 px-6 py-14 sm:grid-cols-2 sm:px-10">
          {depoimentos.map((d) => (
            <div key={d.autor}>
              <p className="text-lg leading-snug font-semibold text-carbon">"{d.texto}"</p>
              <p className="mt-2 text-sm text-carbon/75">{d.autor}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
