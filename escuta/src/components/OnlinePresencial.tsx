import Reveal from './Reveal'

const pontos = [
  {
    tema: 'Local',
    online: 'De onde você estiver, com câmera e internet estáveis',
    presencial: 'Consultório em Juiz de Fora, MG',
  },
  {
    tema: 'Horários',
    online: 'Mais flexível, sem tempo de deslocamento',
    presencial: 'Agenda do consultório, com sala reservada',
  },
  {
    tema: 'Indicado quando',
    online: 'Rotina apertada, mudanças de cidade, preferência por estar num ambiente conhecido',
    presencial: 'Preferência por presença física ou dificuldade de manter privacidade em casa',
  },
  {
    tema: 'Sigilo',
    online: 'Mesmo sigilo profissional, e requer ambiente privado do seu lado',
    presencial: 'Sala fechada, isolada acusticamente',
  },
]

export default function OnlinePresencial() {
  return (
    <section className="border-b border-linha bg-papel-forte/60 py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-quieto">as duas modalidades</p>
          <h2 className="mt-2 max-w-lg text-3xl sm:text-4xl">Online ou presencial, o processo é o mesmo</h2>
          <p className="mt-4 max-w-xl text-tinta/75">
            Nenhuma das duas é "melhor" de forma genérica, depende da sua rotina e do que te deixa
            mais à vontade pra falar. Dá pra conversar sobre isso já na primeira sessão.
          </p>
        </Reveal>

        <p className="mt-8 text-xs text-tinta/50 sm:hidden" aria-hidden="true">
          Deslize para o lado para ver a coluna presencial →
        </p>

        <Reveal delay={0.05} className="mt-2 overflow-x-auto sm:mt-10">
          <table className="w-full min-w-[520px] border-collapse overflow-hidden rounded-xl border border-linha bg-papel text-left text-sm">
            <thead>
              <tr className="border-b border-linha">
                <th scope="col" className="p-4 font-semibold text-tinta/50">
                  &nbsp;
                </th>
                <th scope="col" className="dado-ficha p-4 text-quieto">
                  Online
                </th>
                <th scope="col" className="dado-ficha p-4 text-acolhe">
                  Presencial
                </th>
              </tr>
            </thead>
            <tbody>
              {pontos.map((p) => (
                <tr key={p.tema} className="border-b border-linha last:border-0">
                  <th scope="row" className="p-4 align-top font-semibold">
                    {p.tema}
                  </th>
                  <td className="p-4 align-top text-tinta/75">{p.online}</td>
                  <td className="p-4 align-top text-tinta/75">{p.presencial}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}
