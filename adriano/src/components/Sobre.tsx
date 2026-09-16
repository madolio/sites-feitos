const fatos = [
  { valor: '22 anos', rotulo: 'de experiência' },
  { valor: 'SP', rotulo: 'e região' },
  { valor: 'Todos', rotulo: 'residências e clínicas' },
]

export default function Sobre() {
  return (
    <section id="sobre" className="bg-papel py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="revelar">
          <p className="rotulo text-fumo">Sobre</p>
          <h2 className="mt-3 text-3xl text-grafite sm:text-4xl">22 anos cuidando da água e da parte elétrica</h2>
          <p className="mt-5 max-w-2xl text-lg text-fumo">
            Atendo todo tipo de cliente — de residências a clínicas que
            dependem de água tratada com o rigor que hemodiálise exige. É o
            mesmo cuidado nos dois casos: entendo o que o local precisa antes
            de propor a solução.
          </p>
        </div>

        <dl className="revelar mt-12 grid grid-cols-3 gap-6 border-t border-linha pt-8 text-center">
          {fatos.map((f) => (
            <div key={f.rotulo}>
              <dt className="sr-only">{f.rotulo}</dt>
              <dd className="font-heading text-2xl font-semibold text-grafite sm:text-3xl">{f.valor}</dd>
              <p className="mt-1 text-sm text-fumo">{f.rotulo}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
