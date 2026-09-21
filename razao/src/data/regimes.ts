// Estrutura real de obrigações fiscais recorrentes por regime tributário no
// Brasil, não são datas inventadas. Regras gerais, sempre com o cuidado de
// não prometer prazo fechado como se fosse aconselhamento fiscal: dia 20
// pode virar dia útil seguinte por calendário da Receita, e a Razão Contábil
// deixa isso escrito, não só implícito.

export type Periodicidade = 'mensal' | 'anual'

export type Obrigacao = {
  nome: string
  sigla: string
  periodicidade: Periodicidade
  /** Regra de vencimento em texto: descreve a estrutura real, sem fingir
   * precisão de calendário oficial (que muda ano a ano por dia útil). */
  regraVencimento: string
  /** Mês de vencimento (1-12). Para obrigação mensal, o mês em que a
   * competência de um dado mês vence no mês seguinte (usado só pra plotar
   * no calendário: a obrigação mensal aparece em todos os 12 meses). */
  mesVencimento?: number
  diaVencimento: number
  descricao: string
}

export type Regime = {
  id: string
  nome: string
  publico: string
  cor: 'selo' | 'prazo'
  obrigacoes: Obrigacao[]
}

export const regimes: Regime[] = [
  {
    id: 'mei',
    nome: 'MEI',
    publico: 'Microempreendedor Individual, faturamento até o teto anual do MEI',
    cor: 'selo',
    obrigacoes: [
      {
        nome: 'DAS-MEI',
        sigla: 'DAS',
        periodicidade: 'mensal',
        regraVencimento: 'todo dia 20 (ou o próximo dia útil, quando cai em fim de semana ou feriado)',
        diaVencimento: 20,
        descricao:
          'Guia única que reúne INSS, ICMS e/ou ISS num valor fixo mensal. É a obrigação que sustenta o CNPJ do MEI em dia.',
      },
      {
        nome: 'Declaração Anual do MEI (DASN-SIMEI)',
        sigla: 'DASN-SIMEI',
        periodicidade: 'anual',
        regraVencimento: 'até 31 de maio, referente ao ano anterior',
        mesVencimento: 5,
        diaVencimento: 31,
        descricao:
          'Declaração simplificada de faturamento do ano anterior. Não gera imposto por si só, mas o atraso bloqueia a emissão do DAS e pode levar ao desenquadramento.',
      },
    ],
  },
  {
    id: 'simples',
    nome: 'Simples Nacional',
    publico: 'Microempresas e empresas de pequeno porte (ME/EPP), fora do MEI',
    cor: 'prazo',
    obrigacoes: [
      {
        nome: 'DAS (guia unificada)',
        sigla: 'DAS',
        periodicidade: 'mensal',
        regraVencimento: 'até o dia 20 do mês seguinte à competência (ou próximo dia útil)',
        diaVencimento: 20,
        descricao:
          'Reúne os tributos do Simples Nacional num único boleto calculado sobre o faturamento do mês anterior, pela faixa de alíquota da empresa.',
      },
      {
        nome: 'Declaração de Informações Socioeconômicas e Fiscais (DEFIS)',
        sigla: 'DEFIS',
        periodicidade: 'anual',
        regraVencimento: 'até 31 de março, referente ao ano anterior',
        mesVencimento: 3,
        diaVencimento: 31,
        descricao:
          'Presta contas do ano inteiro à Receita: faturamento mensal, sócios e movimento. É o retrato fiscal do exercício anterior.',
      },
    ],
  },
  {
    id: 'autonomo',
    nome: 'Profissional liberal',
    publico: 'Pessoa física autônoma (sem CNPJ) que presta serviço a outra pessoa física',
    cor: 'prazo',
    obrigacoes: [
      {
        nome: 'Carnê-Leão',
        sigla: 'CARNÊ-LEÃO',
        periodicidade: 'mensal',
        regraVencimento: 'até o último dia útil do mês seguinte ao recebimento',
        diaVencimento: 28,
        descricao:
          'Recolhimento mensal do IR sobre o que foi recebido de pessoa física, como consultas ou aulas particulares. Quem paga é pessoa jurídica já retém na fonte; isso aqui é só o que vem de outra pessoa física.',
      },
      {
        nome: 'Declaração de Ajuste Anual (IRPF)',
        sigla: 'IRPF',
        periodicidade: 'anual',
        regraVencimento: 'geralmente até 31 de maio, referente ao ano anterior',
        mesVencimento: 5,
        diaVencimento: 31,
        descricao:
          'Fecha a conta do ano: soma o que foi recolhido pelo Carnê-Leão, ajusta com deduções reais (dependente, saúde, previdência) e aponta se falta pagar ou se há restituição.',
      },
    ],
  },
]
