// Torre é um produto fictício — conceito de site da Madolio pro nicho de SaaS
// (software de agendamento). Nomes de clientes, números e depoimentos são
// exemplos plausíveis, não uma empresa real.

export type Blip = {
  id: string
  angle: number
  radius: number
  label: string
  time: string
  kind: 'novo' | 'confirmado' | 'risco'
}

// Ângulo em graus (0 = topo, sentido horário), raio de 0 a 1 (proporção do
// radar). Espalhados de propósito, não em anel perfeito — senão parece
// gráfico de pizza.
export const blips: Blip[] = [
  { id: 'b1', angle: 24, radius: 0.62, label: 'Studio Menta — corte e barba', time: '14:30', kind: 'confirmado' },
  { id: 'b2', angle: 96, radius: 0.4, label: 'Clínica Vero — avaliação', time: '15:00', kind: 'novo' },
  { id: 'b3', angle: 158, radius: 0.78, label: 'Fisio Bloom — sessão 3/10', time: '15:15', kind: 'confirmado' },
  { id: 'b4', angle: 212, radius: 0.5, label: 'Ateliê Cor — prova de vestido', time: '16:00', kind: 'risco' },
  { id: 'b5', angle: 268, radius: 0.68, label: 'Studio Menta — coloração', time: '16:30', kind: 'confirmado' },
  { id: 'b6', angle: 322, radius: 0.36, label: 'Clínica Vero — retorno', time: '17:10', kind: 'novo' },
]

export const features = [
  {
    title: 'Agenda em tempo real',
    text: 'Cada agendamento aparece na hora, de qualquer canal — site, Instagram ou WhatsApp.',
  },
  {
    title: 'Confirmação automática',
    text: 'Lembrete por WhatsApp 24h e 2h antes. Sem faltar, sem ligar pra confirmar.',
  },
  {
    title: 'Fila de espera inteligente',
    text: 'Cancelou? A Torre já oferece o horário pra quem está esperando.',
  },
  {
    title: 'Relatório de ocupação',
    text: 'Veja qual horário do dia esvazia e qual serviço mais enche a agenda.',
  },
]

export type Plan = {
  name: string
  price: number
  unit: string
  description: string
  features: string[]
  highlight?: boolean
}

export const plans: Plan[] = [
  {
    name: 'Solo',
    price: 49,
    unit: '/mês',
    description: 'Pra quem atende sozinho.',
    features: ['1 agenda', 'Confirmação por WhatsApp', 'Até 150 agendamentos/mês'],
  },
  {
    name: 'Equipe',
    price: 129,
    unit: '/mês',
    description: 'Pra times de até 8 pessoas.',
    features: ['Até 8 agendas', 'Fila de espera automática', 'Relatório de ocupação', 'Agendamentos ilimitados'],
    highlight: true,
  },
  {
    name: 'Rede',
    price: 0,
    unit: 'sob consulta',
    description: 'Múltiplas unidades, uma torre só.',
    features: ['Agendas ilimitadas', 'Painel por unidade', 'Gerente de conta dedicado'],
  },
]

export const log = [
  { id: 'nb1', text: 'Studio Menta reduziu 34% das faltas no primeiro mês.', author: 'Bianca Reis, Studio Menta' },
  { id: 'nb2', text: 'A fila de espera preencheu 22 horários que teriam ficado vazios em março.', author: 'Diego Autran, Fisio Bloom' },
  { id: 'nb3', text: 'Migramos de planilha pra Torre em uma tarde. Sem dor de cabeça.', author: 'Renata Kojima, Clínica Vero' },
]
