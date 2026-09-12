// Corte é um negócio fictício — conceito de site da Madolio pro nicho de
// salão de beleza/barbearia. Serviços, preços e profissionais são exemplos
// plausíveis, não um estabelecimento real.

export const servicos = [
  { name: 'Corte masculino', price: 45, minutos: 30 },
  { name: 'Corte + barba', price: 70, minutos: 50 },
  { name: 'Barba', price: 35, minutos: 25 },
  { name: 'Corte feminino', price: 80, minutos: 50 },
  { name: 'Escova', price: 55, minutos: 40 },
  { name: 'Coloração', price: 150, minutos: 90 },
  { name: 'Sobrancelha', price: 25, minutos: 15 },
  { name: 'Hidratação', price: 60, minutos: 35 },
]

export const profissionais = [
  { name: 'Duda Ferraz', especialidade: 'Cortes e coloração' },
  { name: 'Igor Salgado', especialidade: 'Barba e navalha' },
  { name: 'Bia Torres', especialidade: 'Escova e tratamento' },
]

export const START_TICKET = 38
