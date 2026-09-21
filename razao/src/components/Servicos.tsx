import Reveal from './Reveal'

const servicos = [
  {
    nome: 'Abertura e enquadramento',
    descricao:
      'Abertura de CNPJ e escolha do regime tributário certo pro seu caso, seja MEI, Simples Nacional ou outro, conforme faturamento e atividade.',
  },
  {
    nome: 'Rotina fiscal mensal',
    descricao:
      'Apuração de guias (DAS, Carnê-Leão), emissão de nota fiscal e organização de documento pra nunca perder um vencimento do calendário.',
  },
  {
    nome: 'Folha de pagamento',
    descricao: 'Cálculo de salário, férias, 13º e encargos pra empresas com funcionário registrado.',
  },
  {
    nome: 'Declarações anuais',
    descricao:
      'DASN-SIMEI, DEFIS e Imposto de Renda Pessoa Física: as obrigações de fechamento de cada regime, feitas antes do prazo.',
  },
  {
    nome: 'Consultoria de enquadramento',
    descricao:
      'Revisão anual de regime: às vezes o MEI ficou pequeno demais pro faturamento, ou o Simples deixou de ser a opção mais barata. Avaliamos com o número real do seu negócio.',
  },
]

export default function Servicos() {
  return (
    <section id="servicos" className="border-b border-linha py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-fiscal text-selo">O que fazemos</p>
          <h2 className="mt-2 max-w-xl text-3xl sm:text-4xl">
            Contabilidade de rotina, sem surpresa no fim do mês
          </h2>
        </Reveal>

        <Reveal delay={0.05} stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-2">
          {servicos.map((s) => (
            <div key={s.nome} className="rounded-lg border border-linha bg-papel-forte/50 p-5">
              <h3 className="text-lg font-semibold text-tinta">{s.nome}</h3>
              <p className="mt-2 text-sm text-tinta/75">{s.descricao}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
