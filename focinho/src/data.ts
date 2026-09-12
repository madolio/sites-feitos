// Focinho é um negócio fictício — conceito de site da Madolio pro nicho de
// pet shop/veterinária. Serviços, preços e a "ficha" da hero são exemplos
// plausíveis, não um estabelecimento real.

export const servicos = [
  { id: 'consulta', name: 'Consulta', price: 'R$ 120', text: 'Avaliação clínica completa, com veterinário de plantão.' },
  { id: 'vacina', name: 'Vacina', price: 'R$ 85', text: 'V10, antirrábica e gripe canina — carteirinha atualizada na hora.' },
  { id: 'banho', name: 'Banho e tosa', price: 'R$ 70', text: 'Produtos hipoalergênicos, do porte pequeno ao grande.' },
  { id: 'exame', name: 'Exames', price: 'sob consulta', text: 'Sangue, imagem e parasitológico, com resultado em até 48h.' },
]

export const cuidados = [
  { title: 'Antes da consulta', text: 'Traga a carteirinha de vacinação e anote qualquer mudança de comportamento da última semana.' },
  { title: 'Depois da vacina', text: 'Evite banho por 48h e observe se há inchaço ou apatia — é raro, mas ligamos se precisar.' },
  { title: 'Emergência', text: 'Fora do horário comercial, o plantão 24h fica na Clínica Central, a 800m daqui.' },
]

export type Pet = {
  nome: string
  especie: string
  raca: string
  idade: string
  peso: string
  proximaVacina: string
}

export const petExemplo: Pet = {
  nome: 'Nino',
  especie: 'Canino',
  raca: 'SRD',
  idade: '3 anos',
  peso: '14,2 kg',
  proximaVacina: 'Antirrábica — 12/out',
}
