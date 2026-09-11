// Estúdio Alma é um negócio fictício — conceito de site da Madolio pro nicho de
// pilates. Instrutora, grade e bairro são exemplos plausíveis, não um cliente.

/**
 * Pose do boneco, vista de lado. Ângulos em graus no sentido do SVG
 * (0 = direita, -90 = pra cima). `arm` e `neck` são relativos ao tronco;
 * `leg` e `torso` são absolutos, a partir do quadril (hx, hy).
 */
export type Pose = {
  hx: number
  hy: number
  leg: number
  torso: number
  neck: number
  arm: number
  sunX: number
  sunY: number
}

export type Movement = {
  id: string
  name: string
  description: string
  works: string
  pose: Pose
}

// Os ângulos foram escolhidos pra que a transição entre uma pose e a seguinte
// seja um movimento plausível (ex: Hundred → Roll Up passa o tronco pela
// vertical, que é o próprio "enrolar"). Não normalizar pra 0–360.
export const movements: Movement[] = [
  {
    id: 'postura',
    name: 'Postura',
    description: 'Em pé, peso dividido nos dois pés, coluna longa. Toda aula começa olhando pra isso.',
    works: 'Alinhamento e consciência corporal',
    pose: { hx: 200, hy: 214, leg: 90, torso: -90, neck: 0, arm: 166, sunX: 262, sunY: 150 },
  },
  {
    id: 'hundred',
    name: 'Hundred',
    description: 'Cabeça e ombros fora do chão, pernas no ar e cem batidas de braço contadas na respiração.',
    works: 'Abdômen profundo e respiração',
    pose: { hx: 235, hy: 377, leg: -45, torso: -160, neck: 15, arm: 165, sunX: 250, sunY: 175 },
  },
  {
    id: 'roll-up',
    name: 'Roll Up',
    description: 'Enrolar a coluna uma vértebra por vez, do chão até alcançar a ponta dos pés.',
    works: 'Mobilidade da coluna e abdômen',
    pose: { hx: 150, hy: 379, leg: 2, torso: -40, neck: 30, arm: 48, sunX: 300, sunY: 140 },
  },
  {
    id: 'teaser',
    name: 'Teaser',
    description: 'Equilíbrio em V sobre o quadril, braços paralelos às pernas. É onde o controle aparece.',
    works: 'Força do centro e equilíbrio',
    pose: { hx: 205, hy: 373, leg: -50, torso: -130, neck: 0, arm: 90, sunX: 215, sunY: 130 },
  },
  {
    id: 'swan',
    name: 'Swan',
    description: 'De bruços, as mãos empurram o chão e o peito sobe. O contrapeso de tanto abdômen.',
    works: 'Extensão da coluna e costas',
    pose: { hx: 195, hy: 379, leg: -182, torso: -35, neck: -15, arm: 93, sunX: 130, sunY: 150 },
  },
  {
    id: 'prancha',
    name: 'Prancha',
    description: 'O corpo inteiro numa linha só, apoiado nas mãos. Nada cede: nem ombro, nem quadril.',
    works: 'Ombros, abdômen e glúteos juntos',
    pose: { hx: 205, hy: 336, leg: -200, torso: -20, neck: 0, arm: 110, sunX: 280, sunY: 170 },
  },
]

export const aulas = [
  {
    shape: 'circle',
    color: '#2c4fa3',
    name: 'Aparelhos',
    detail: 'Reformer, Cadillac e Chair',
    text: 'Até 3 alunos por turma. A carga vem das molas, ajustada pro seu corpo em cada exercício.',
  },
  {
    shape: 'square',
    color: '#f2b300',
    name: 'Solo',
    detail: 'No colchonete, com acessórios',
    text: 'Até 6 alunos. O método como Joseph Pilates ensinava, só com o peso do corpo, bola e faixa.',
  },
  {
    shape: 'triangle',
    color: '#d63c3c',
    name: 'Particular',
    detail: 'Aula individual',
    text: 'Uma hora só sua, com plano montado a partir da avaliação. Bom pra quem está voltando de lesão.',
  },
] as const

export const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const

type Slot = 'A' | 'S' | null

/** Grade semanal: A = Aparelhos, S = Solo, null = sem turma. */
export const grade: { hora: string; slots: Slot[] }[] = [
  { hora: '7h', slots: ['A', 'A', 'A', 'A', 'A', null] },
  { hora: '8h', slots: ['S', 'A', 'S', 'A', 'S', 'A'] },
  { hora: '9h', slots: ['A', null, 'A', null, 'A', 'S'] },
  { hora: '12h', slots: ['A', 'S', 'A', 'S', 'A', null] },
  { hora: '18h', slots: ['A', 'A', 'A', 'A', 'A', null] },
  { hora: '19h', slots: ['S', 'A', 'S', 'A', 'S', null] },
  { hora: '20h', slots: ['A', 'A', 'A', 'A', null, null] },
]
