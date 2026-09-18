import { PROFISSIONAL } from '../dados'
import Reveal from './Reveal'

// O carimbo da prancha: em desenho técnico é o quadro no canto da folha com
// quem assina, o que é e onde. Aqui ele leva só fatos confirmados — não há
// campo de preço, de certificação nem de "clientes atendidos" porque nenhum
// desses dados existe.
const campos = [
  { rotulo: 'Profissional', valor: PROFISSIONAL.nome },
  { rotulo: 'Ofícios', valor: PROFISSIONAL.oficios },
  { rotulo: 'Experiência', valor: PROFISSIONAL.anos },
  { rotulo: 'Atendimento', valor: PROFISSIONAL.atendimento },
  { rotulo: 'Região', valor: PROFISSIONAL.regiao },
]

export default function Sobre() {
  return (
    <section id="sobre" className="bg-superficie px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="max-w-2xl">
          <p className="rotulo text-fumo">Sobre</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">
            22 anos cuidando da água e da parte elétrica
          </h2>
          <p className="mt-5 text-lg text-fumo">
            Atendo todo tipo de cliente — de residências a clínicas que
            dependem de água tratada com o rigor que hemodiálise exige. É o
            mesmo cuidado nos dois casos: entendo o que o local precisa antes
            de propor a solução.
          </p>
        </Reveal>

        <Reveal className="mt-12 max-w-3xl">
          <dl className="overflow-hidden rounded-sm border border-linha bg-white">
            {campos.map((campo) => (
              <div
                key={campo.rotulo}
                className="grid grid-cols-[7rem_minmax(0,1fr)] border-b border-linha last:border-b-0 sm:grid-cols-[11rem_minmax(0,1fr)]"
              >
                <dt className="rotulo flex items-center border-r border-linha px-4 py-4 text-fumo sm:px-5">
                  {campo.rotulo}
                </dt>
                <dd className="flex items-center px-4 py-4 font-medium text-grafite sm:px-5">
                  {campo.valor}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
