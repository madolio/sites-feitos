// Especificações reais de mercado (faixas típicas de luminárias LED
// residenciais/comerciais no Brasil) — potência, fluxo luminoso e ângulo
// de feixe usados de verdade no cálculo da Calculadora e no desenho do
// cone de luz de cada card do catálogo.
export type Luminaria = {
  id: string
  nome: string
  categoria: string
  watts: number
  lumens: number
  anguloFeixe: number
  kelvin: number
  descricao: string
}

export const luminarias: Luminaria[] = [
  {
    id: 'trilho',
    nome: 'Spot de trilho',
    categoria: 'Iluminação de destaque',
    watts: 12,
    lumens: 900,
    anguloFeixe: 24,
    kelvin: 3000,
    descricao: 'Feixe estreito, mira ajustável — pra parede de quadros ou vitrine.',
  },
  {
    id: 'pendente',
    nome: 'Pendente',
    categoria: 'Iluminação geral',
    watts: 15,
    lumens: 1350,
    anguloFeixe: 110,
    kelvin: 2700,
    descricao: 'Luz difusa e ampla — mesa de jantar, balcão, sala de estar.',
  },
  {
    id: 'embutido',
    nome: 'Embutido de teto',
    categoria: 'Iluminação geral',
    watts: 18,
    lumens: 1800,
    anguloFeixe: 100,
    kelvin: 4000,
    descricao: 'Distribuição uniforme pra área de trabalho — cozinha, escritório.',
  },
  {
    id: 'arandela',
    nome: 'Arandela',
    categoria: 'Iluminação de apoio',
    watts: 8,
    lumens: 500,
    anguloFeixe: 160,
    kelvin: 2700,
    descricao: 'Luz indireta, rasante à parede — corredor, quarto, hall.',
  },
  {
    id: 'fita',
    nome: 'Fita LED',
    categoria: 'Iluminação de acento',
    watts: 9.6,
    lumens: 720,
    anguloFeixe: 180,
    kelvin: 6000,
    descricao: 'Linha contínua de luz — rodapé, sanca, embaixo de bancada.',
  },
]
