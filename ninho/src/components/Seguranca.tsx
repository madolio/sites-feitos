import Reveal from './Reveal'

export default function Seguranca() {
  return (
    <section id="seguranca" className="border-b border-linha bg-papel py-20">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-broto">segurança e cuidado</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Como cuidamos de quem está sob nosso olhar</h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-linha bg-papel-forte p-6">
            <p className="font-semibold">Proporção de adultos por criança</p>
            <p className="mt-2 text-sm text-tinta/75">
              Mantemos uma equipe de educadores dimensionada por faixa etária: quanto menor a
              criança, maior o número de adultos por turma, seguindo as recomendações de
              proporção adulto-criança usadas como referência na Educação Infantil brasileira.
            </p>
          </div>
          <div className="rounded-2xl border border-linha bg-papel-forte p-6">
            <p className="font-semibold">Entrega controlada</p>
            <p className="mt-2 text-sm text-tinta/75">
              A saída é liberada só pra responsáveis previamente cadastrados na matrícula, com
              registro de horário de entrada e saída de cada criança.
            </p>
          </div>
          <div className="rounded-2xl border border-linha bg-papel-forte p-6">
            <p className="font-semibold">Equipe formada</p>
            <p className="mt-2 text-sm text-tinta/75">
              Educadores com formação em Pedagogia ou magistério, com reciclagem periódica em
              primeiros socorros pediátricos.
            </p>
          </div>
          <div className="rounded-2xl border border-linha bg-papel-forte p-6">
            <p className="font-semibold">Comunicação diária</p>
            <p className="mt-2 text-sm text-tinta/75">
              Cada família recebe um registro diário sobre alimentação, sono e atividades, sem
              precisar perguntar.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
