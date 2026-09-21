export type Depoimento = {
  nome: string
  servico: string
  texto: string
}

export const depoimentos: Depoimento[] = [
  {
    nome: 'Marina T.',
    servico: 'Troca de correia dentada',
    texto:
      'O orçamento bateu com o valor final e me avisaram pelo WhatsApp quando ficou pronto, antes do prazo que passaram.',
  },
  {
    nome: 'Roberto S.',
    servico: 'Barulho estranho no motor',
    texto:
      'Fazia semanas que o motor fazia um barulho esquisito. Acharam que era a vela de ignição gasta, me mostraram a peça velha e resolveram no mesmo dia.',
  },
  {
    nome: 'Camila A.',
    servico: 'Revisão antes de viagem',
    texto:
      'Levei pra revisão antes de uma viagem longa. Apontaram uma pastilha de freio no limite que eu nem sabia, e trocaram na hora com orçamento aprovado por telefone.',
  },
]
