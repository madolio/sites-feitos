export type Etapa = {
  numero: string
  titulo: string
  descricao: string
}

export const etapas: Etapa[] = [
  {
    numero: '01',
    titulo: 'Conversa e escolha do calibre',
    descricao: 'Automático ou de corda manual, mostrador simples ou com complicação — a conversa inicial decide o mecanismo, não só a aparência.',
  },
  {
    numero: '02',
    titulo: 'Desenho do mostrador',
    descricao: 'Cada índice e cada ponteiro é desenhado pro seu relógio — nada sai de um catálogo de mostradores prontos.',
  },
  {
    numero: '03',
    titulo: 'Acabamento das peças',
    descricao: 'A placa recebe o Côtes de Genève à mão, listra por listra, antes de qualquer peça ser encaixada nela.',
  },
  {
    numero: '04',
    titulo: 'Montagem e regulagem',
    descricao: 'O escape é montado sob lupa e regulado em seis posições.',
  },
  {
    numero: '05',
    titulo: 'Caixa e cristal',
    descricao: 'O mecanismo regulado entra na caixa, e o cristal de safira fecha por cima.',
  },
  {
    numero: '06',
    titulo: 'Entrega com boletim de marcha',
    descricao: 'Você recebe o relógio com o registro de precisão medido nos dias de teste.',
  },
]
