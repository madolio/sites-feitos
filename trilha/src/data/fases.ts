// Estrutura real de fases da reabilitação fisioterapêutica. É o modelo
// clássico usado em protocolos de reabilitação musculoesquelética (descrito,
// por exemplo, em protocolos pós-cirúrgicos de LCA e em diretrizes de
// fisioterapia ortopédica): controle da dor/inflamação → recuperação de
// amplitude de movimento → fortalecimento progressivo → retorno funcional.
// As durações são faixas gerais de referência, não prescrição — cada
// paciente e cada lesão têm um tempo próprio, e isso está dito no site.

export type Fase = {
  id: string
  numero: number
  nome: string
  km: number // posição ao longo da trilha, em "km" fictícios (0–12)
  semanas: string
  altitude: string
  objetivo: string
  marcos: string[]
}

export const fases: Fase[] = [
  {
    id: 'aguda',
    numero: 1,
    nome: 'Controle da dor e inflamação',
    km: 1.5,
    semanas: 'semana 1–2',
    altitude: '420 m',
    objetivo:
      'Reduzir dor e inchaço, proteger o tecido lesionado e manter alguma mobilidade sem sobrecarregar a área. Uso de crioterapia, eletroterapia analgésica e movimento assistido dentro do limite de dor.',
    marcos: ['Avaliação inicial e diagnóstico funcional', 'Controle de edema', 'Mobilização passiva leve'],
  },
  {
    id: 'amplitude',
    numero: 2,
    nome: 'Recuperação de amplitude de movimento',
    km: 4.5,
    semanas: 'semana 2–6',
    altitude: '760 m',
    objetivo:
      'Devolver o arco de movimento da articulação comprometida, com mobilização articular, alongamento e exercícios ativo-assistidos. Meta prática: alcançar amplitude comparável ao lado saudável.',
    marcos: ['Mobilização articular progressiva', 'Alongamento ativo-assistido', 'Amplitude funcional para atividades básicas'],
  },
  {
    id: 'fortalecimento',
    numero: 3,
    nome: 'Fortalecimento progressivo',
    km: 8,
    semanas: 'semana 6–12',
    altitude: '1.180 m',
    objetivo:
      'Reconstruir força e resistência muscular com carga progressiva, treino proprioceptivo e estabilização, preparando o tecido para exigências maiores.',
    marcos: ['Exercício resistido progressivo', 'Treino de propriocepção e equilíbrio', 'Testes de força comparativa'],
  },
  {
    id: 'funcional',
    numero: 4,
    nome: 'Retorno funcional',
    km: 12,
    semanas: 'semana 12+',
    altitude: '1.540 m',
    objetivo:
      'Retomar gestos do dia a dia, do trabalho ou do esporte com segurança, com exercícios específicos da atividade-alvo e testes de prontidão antes da alta.',
    marcos: ['Exercícios específicos da atividade', 'Testes funcionais de prontidão', 'Alta com plano de manutenção'],
  },
]

export const DISTANCIA_TOTAL_KM = 12
