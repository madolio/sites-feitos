export type Servico = {
  nome: string
  descricao: string
}

export const servicos: Servico[] = [
  {
    nome: 'Desentupimento',
    descricao:
      'Ralo, vaso sanitário, pia ou tubulação de esgoto entupida. Primeiro tentamos desentupidor e vareta manual antes de qualquer coisa mais invasiva.',
  },
  {
    nome: 'Conserto de vazamento',
    descricao:
      'Vazamento visível em registro, conexão ou tubulação aparente, e também vazamento escondido em parede ou embutido no piso, com localização antes de abrir qualquer coisa.',
  },
  {
    nome: 'Instalação de metais e louças',
    descricao:
      'Torneira, chuveiro, válvula de descarga, vaso sanitário, tanque, cuba. Troca de peça danificada ou instalação nova, com vedação testada antes de fechar o serviço.',
  },
  {
    nome: 'Revisão de caixa d’água',
    descricao:
      'Limpeza, verificação de boia e vedante, e checagem de vazamento por transbordo ou infiltração na caixa d’água da casa ou do apartamento.',
  },
]
