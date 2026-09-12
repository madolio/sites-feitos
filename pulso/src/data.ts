// Pulso é um negócio fictício — conceito de site da Madolio pro nicho de
// personal training. Programas, resultados e números são exemplos
// plausíveis, não uma academia real.

export const programas = [
  {
    id: 'forca',
    name: 'Base de força',
    distance: '0–25M',
    text: 'Levantamento básico bem executado — agachamento, terra e supino — antes de qualquer coisa mais vistosa.',
  },
  {
    id: 'condicionamento',
    name: 'Condicionamento',
    distance: '25–60M',
    text: 'Circuitos curtos e intensos, pensados pra melhorar fôlego sem passar 1h30 na academia.',
  },
  {
    id: 'mobilidade',
    name: 'Mobilidade',
    distance: '60–85M',
    text: 'Trabalho de amplitude e postura — pra treinar pesado sem dor no dia seguinte.',
  },
  {
    id: 'performance',
    name: 'Performance',
    distance: '85–100M',
    text: 'Pra quem já tem base e quer preparar uma prova, um esporte ou só um objetivo específico.',
  },
]

export const resultados = [
  { value: '6', unit: 'kg', label: 'perda média em 12 semanas' },
  { value: '+18', unit: '%', label: 'de carga levantada em 3 meses' },
  { value: '92', unit: '%', label: 'dos alunos continuam depois do 1º trimestre' },
]

export const depoimentos = [
  { text: 'Treino em 40 minutos, sem enrolação. Perdi 8kg em 4 meses.', author: 'Marcelo Prado' },
  { text: 'Nunca tinha levantado peso na vida. Hoje faço agachamento com mais carga que muito homem.', author: 'Juliana Mattos' },
  { text: 'O plano mudou quando minha lesão no joelho mudou. Isso pra mim é o diferencial.', author: 'Rafael Cunha' },
]
