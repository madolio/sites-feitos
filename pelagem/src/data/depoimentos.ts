export type Depoimento = {
  autor: string
  texto: string
}

export const depoimentos: Depoimento[] = [
  {
    autor: 'Fernanda L., tutora do Bolinha',
    texto:
      'O Bolinha é um Poodle e o pelo dele enrola em nó atrás da orelha rapidinho. Foi a primeira vez que vi alguém explicar por que a tosa mensal faz diferença, não é só estética.',
  },
  {
    autor: 'Rodrigo M., tutor da Nina',
    texto:
      'Minha Husky solta uma quantidade absurda de pelo duas vezes por ano. O de-shedding reduziu isso em casa por semanas, coisa que nenhuma escova minha tinha resolvido antes.',
  },
  {
    autor: 'Camila S., tutora do Toby',
    texto:
      'O Toby é reativo com estranhos e sempre foi complicado levar pro banho. Aqui tiveram paciência, fizeram com pausa, e ele saiu sem trauma nenhum.',
  },
]
