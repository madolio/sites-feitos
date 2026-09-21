// Os quatro serviços reais de um chaveiro/serralheiro combinado no Brasil.
// Cada um tem categoria de urgência real (emergência 24h, agendado, sob
// medida com orçamento), não é decoração.

export type Servico = {
  id: string
  nome: string
  descricao: string
  categoria: 'emergencia' | 'agendado' | 'sob-medida'
}

export const servicos: Servico[] = [
  {
    id: 'abertura',
    nome: 'Abertura de porta trancada',
    descricao:
      'Chave quebrada, perdida ou esquecida do lado de dentro. Abertura sem arrombamento sempre que a fechadura permite, com técnica de gazua ou pistola de impressão conforme o modelo do cilindro.',
    categoria: 'emergencia',
  },
  {
    id: 'segredo',
    nome: 'Troca de segredo e fechadura',
    descricao:
      'Troca do segredo (o miolo/cilindro) sem trocar a fechadura inteira, ou substituição completa quando o corpo está gasto. Recomendada depois de mudança, fim de contrato de aluguel ou perda de chave.',
    categoria: 'agendado',
  },
  {
    id: 'copia',
    nome: 'Cópia de chave, inclusive codificada',
    descricao:
      'Cópia de chave comum por duplicação mecânica e cópia de chave codificada/eletrônica (transponder) com leitura e gravação do chip, quando o veículo ou fechadura exige.',
    categoria: 'agendado',
  },
  {
    id: 'grades',
    nome: 'Grades e portões sob medida',
    descricao:
      'Projeto e fabricação de grade de proteção, portão de garagem e guarda-corpo em ferro, sob medida pro vão da sua casa ou comércio, com orçamento prévio antes de qualquer corte.',
    categoria: 'sob-medida',
  },
]

export const categoriaInfo: Record<
  Servico['categoria'],
  { rotulo: string; tempo: string }
> = {
  emergencia: { rotulo: 'Emergência 24h', tempo: 'Atendimento no mesmo dia, a qualquer hora' },
  agendado: { rotulo: 'Agendado', tempo: 'Marcado com antecedência, sem pressa' },
  'sob-medida': { rotulo: 'Sob medida', tempo: 'Orçamento antes de fabricar' },
}
