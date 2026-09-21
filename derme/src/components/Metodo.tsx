import Reveal from './Reveal'

const passos = [
  {
    titulo: 'Avaliação da pele',
    descricao:
      'Exame clínico presencial com dermatoscópio, histórico de saúde e do que já foi tentado antes. Nenhum procedimento é indicado sem essa etapa.',
  },
  {
    titulo: 'Plano por camada',
    descricao:
      'A indicação parte do que precisa mudar em qual camada (pigmento na epiderme, colágeno na derme, volume no subcutâneo), não de um pacote fechado.',
  },
  {
    titulo: 'Procedimento documentado',
    descricao:
      'Registro fotográfico padronizado (mesma luz, mesmo ângulo, mesma distância) antes de cada sessão, para acompanhar a evolução real ao longo do protocolo.',
  },
  {
    titulo: 'Retorno na janela certa',
    descricao:
      'O retorno é agendado para o dia em que o resultado daquele procedimento específico costuma estar visível, em vez de um prazo genérico de "30 dias" pra tudo.',
  },
]

export default function Metodo() {
  return (
    <section id="metodo" className="border-t border-linha bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-clinico text-clinico">Método</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Da avaliação ao retorno, cada etapa documentada</h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08}>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2">
            {passos.map((passo, i) => (
              <li key={passo.titulo} className="rounded-xl border border-linha bg-papel p-6">
                <p className="dado-clinico text-derme">Etapa {i + 1}</p>
                <h3 className="mt-2 text-xl">{passo.titulo}</h3>
                <p className="mt-2 text-noturno/75">{passo.descricao}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-xl border border-linha bg-papel p-6 sm:p-8">
            <p className="dado-clinico text-noturno/50">Responsável técnica</p>
            <h3 className="mt-2 text-2xl">Dra. Marina Petrucci</h3>
            <p className="mt-2 text-noturno/75">
              Dermatologista formada pela UFPR, com residência em Dermatologia Clínica e Cirúrgica. Atua há 11 anos
              em consultório próprio em Curitiba, com foco em dermatologia clínica e procedimentos estéticos
              minimamente invasivos. CRM-PR 34981 · RQE 28104.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
