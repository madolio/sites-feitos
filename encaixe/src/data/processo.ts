export type Etapa = {
  numero: string
  titulo: string
  descricao: string
}

export const etapas: Etapa[] = [
  {
    numero: '01',
    titulo: 'Conversa e medidas',
    descricao: 'Você manda o espaço e o uso — mesa pra quantas pessoas, altura de banco, vão de estante — e eu risco o desenho na hora, junto com você.',
  },
  {
    numero: '02',
    titulo: 'Escolha da madeira',
    descricao: 'Fotografo três ou quatro tábuas do pátio pra você escolher pelo veio e pelo nó, não só pelo nome da espécie.',
  },
  {
    numero: '03',
    titulo: 'Desenho do encaixe',
    descricao: 'Cada peça recebe o encaixe certo pro esforço que vai receber — rabo-de-andorinha onde puxa, espiga-e-furo onde sustenta.',
  },
  {
    numero: '04',
    titulo: 'Corte e ajuste na bancada',
    descricao: 'O encaixe é cortado à mão e ajustado a seco antes de qualquer cola entrar — se não trava sem forçar, eu refaço.',
  },
  {
    numero: '05',
    titulo: 'Acabamento em óleo',
    descricao: 'Óleo, não verniz: entra na fibra em vez de cobrir, e dá pra lixar e reaplicar em casa daqui a alguns anos.',
  },
  {
    numero: '06',
    titulo: 'Entrega e montagem',
    descricao: 'Levo a peça montada ou monto no local, dependendo do tamanho — e deixo escrito qual óleo usar na próxima manutenção.',
  },
]
