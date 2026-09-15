// Lista tirada do que o salão realmente oferece (site atual + ficha do
// Google). Nenhum preço aparece em lugar nenhum: este é um conceito de
// redesenho e o salão é um negócio de verdade -- inventar valor seria
// publicar informação falsa sobre eles. Duração é estimativa de agenda,
// usada só pra montar a linha do tempo da visita.

export type Grupo = 'Cabelo' | 'Pele e corpo' | 'Depilação' | 'Mãos e pés' | 'Noivas'

export type Servico = {
  id: string
  nome: string
  grupo: Grupo
  minutos: number
  nota: string
}

export const grupos: Grupo[] = ['Cabelo', 'Pele e corpo', 'Depilação', 'Mãos e pés', 'Noivas']

export const servicos: Servico[] = [
  {
    id: 'corte',
    nome: 'Corte de cabelo',
    grupo: 'Cabelo',
    minutos: 45,
    nota: 'Feminino e masculino, com leitura de rosto e de rotina antes da tesoura.',
  },
  {
    id: 'penteado',
    nome: 'Penteado',
    grupo: 'Cabelo',
    minutos: 60,
    nota: 'Preso, semipreso ou solto trabalhado — pra festa, formatura ou casamento.',
  },
  {
    id: 'apliques',
    nome: 'Apliques de cabelo',
    grupo: 'Cabelo',
    minutos: 180,
    nota: 'Alongamento e volume com aplicação medida fio a fio. É o serviço mais longo da casa.',
  },
  {
    id: 'capilar',
    nome: 'Cuidado capilar',
    grupo: 'Cabelo',
    minutos: 60,
    nota: 'Hidratação, nutrição e reconstrução — montadas como cronograma, não como pacote fixo.',
  },
  {
    id: 'pele',
    nome: 'Cuidados com a pele',
    grupo: 'Pele e corpo',
    minutos: 60,
    nota: 'Limpeza e cuidado facial, com o passo a passo explicado enquanto acontece.',
  },
  {
    id: 'massagem',
    nome: 'Massagem',
    grupo: 'Pele e corpo',
    minutos: 50,
    nota: 'Relaxante, em sala separada do movimento do salão.',
  },
  {
    id: 'massoterapia',
    nome: 'Massoterapia',
    grupo: 'Pele e corpo',
    minutos: 60,
    nota: 'Trabalho terapêutico em pontos de tensão — costas, cervical e ombros.',
  },
  {
    id: 'laser',
    nome: 'Depilação a laser',
    grupo: 'Depilação',
    minutos: 30,
    nota: 'Sessões curtas e espaçadas. A primeira inclui avaliação da área.',
  },
  {
    id: 'permanente',
    nome: 'Depilação permanente',
    grupo: 'Depilação',
    minutos: 30,
    nota: 'Protocolo de longo prazo, acompanhado sessão a sessão.',
  },
  {
    id: 'cera',
    nome: 'Depilação com cera',
    grupo: 'Depilação',
    minutos: 30,
    nota: 'Quente ou fria, conforme a área e a sensibilidade da pele.',
  },
  {
    id: 'brasileira',
    nome: 'Depilação brasileira',
    grupo: 'Depilação',
    minutos: 30,
    nota: 'Íntima completa, com atendimento reservado.',
  },
  {
    id: 'manicure',
    nome: 'Manicure',
    grupo: 'Mãos e pés',
    minutos: 40,
    nota: 'Alicate esterilizado e material próprio — dá pra trazer o seu, se preferir.',
  },
  {
    id: 'pedicure',
    nome: 'Pedicure',
    grupo: 'Mãos e pés',
    minutos: 50,
    nota: 'Cuidado com unha encravada e calosidade, não só esmalte.',
  },
  {
    id: 'noiva',
    nome: 'Dia da noiva',
    grupo: 'Noivas',
    minutos: 240,
    nota: 'Pacote longo, com teste antes da data. Reserve com antecedência.',
  },
]
