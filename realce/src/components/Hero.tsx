import Lampadas, { ARCO } from './Lampadas'
import { servicos } from '../data/servicos'

const fatos = [
  { valor: '2004', rotulo: 'desde' },
  { valor: `${servicos.length}`, rotulo: 'serviços na casa' },
  { valor: 'Ter–Sáb', rotulo: '9h às 19h' },
]

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-preto px-6 pt-16 pb-20 text-branco md:pb-28">
      <div className="mx-auto max-w-3xl">
        {/* A moldura do espelho de camarim. O border-radius usa o mesmo ARCO
            das lâmpadas pra borda e luz coincidirem. */}
        <div className="relative pt-[22%] pb-12 sm:pt-[18%]">
          <div
            className="absolute inset-0 border border-dourado/35"
            style={{ borderRadius: `50% 50% 10px 10px / ${ARCO}% ${ARCO}% 10px 10px` }}
          />
          <Lampadas />

          <div className="relative px-6 text-center sm:px-14">
            <p className="rotulo text-dourado">São Roque · desde 2004</p>

            <h1 className="mt-5 text-4xl leading-[1.12] sm:text-5xl md:text-6xl">
              Salão e escola,
              <br />
              no mesmo espelho.
            </h1>

            <p className="mx-auto mt-6 max-w-md text-fumo">
              Cabelo, pele, depilação, mãos e pés e dia da noiva. Monte sua
              visita aqui embaixo e veja, antes de mandar mensagem, a que horas
              você sai.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#visita" className="btn-dourado">
                Montar minha visita
              </a>
              <a href="#servicos" className="btn-branco">
                Ver os serviços
              </a>
            </div>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-3 gap-4 text-center">
          {fatos.map((f) => (
            <div key={f.rotulo}>
              <dt className="sr-only">{f.rotulo}</dt>
              <dd className="tabular font-display text-2xl text-branco sm:text-3xl">{f.valor}</dd>
              <p className="mt-1 text-xs text-fumo">{f.rotulo}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
