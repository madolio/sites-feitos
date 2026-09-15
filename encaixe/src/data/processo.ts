export type Etapa = {
  numero: string
  titulo: string
  descricao: string
}

export const etapas: Etapa[] = [
  {
    numero: '01',
    titulo: 'Medição e conversa',
    descricao: 'Tiro suas medidas de verdade — não só busto e cintura, mas postura, jeito de sentar, altura de punho — e conversamos sobre pra que ocasião a peça vai servir.',
  },
  {
    numero: '02',
    titulo: 'Escolha do tecido',
    descricao: 'Você vê e toca as cartelas de tecido de verdade antes de decidir — peso, caimento e textura mudam muito entre uma lã fria e um tweed.',
  },
  {
    numero: '03',
    titulo: 'Molde sob medida',
    descricao: 'O molde é traçado do zero pras suas medidas, não ajustado a partir de um tamanho padrão — é isso que separa feito à mão de simplesmente feito menor ou maior.',
  },
  {
    numero: '04',
    titulo: 'Primeira prova',
    descricao: 'A peça vem alinhavada, sem acabamento — é o momento de ajustar caimento, comprimento de manga e altura de calça antes da costura final.',
  },
  {
    numero: '05',
    titulo: 'Costura e acabamento',
    descricao: 'Lapela entalhada à mão, casas de botão fechadas por dentro — os detalhes que uma confecção em série não faz, porque não compensa em escala.',
  },
  {
    numero: '06',
    titulo: 'Prova final e entrega',
    descricao: 'Última prova pra confirmar caimento com a peça pronta, e entrego com a ficha de medidas guardada — a próxima encomenda não precisa medir tudo de novo.',
  },
]
