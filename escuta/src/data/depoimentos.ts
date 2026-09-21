// Depoimentos fictícios, com nome só de primeiro nome — mesmo cuidado que os
// outros conceitos da Madolio usam pra deixar claro que é ilustrativo, não
// uma avaliação copiada de algum lugar.

export type Depoimento = {
  autor: string
  texto: string
}

export const depoimentos: Depoimento[] = [
  {
    autor: 'Bianca',
    texto:
      'Demorei anos pra procurar terapia porque achava que precisava estar "muito mal" pra merecer o espaço. As primeiras sessões me mostraram que não era bem assim.',
  },
  {
    autor: 'Rodrigo',
    texto:
      'Fazia terapia online achando que ia ser mais frio. Foi o contrário: consegui ser mais direto justamente por estar no meu próprio espaço.',
  },
  {
    autor: 'Camila',
    texto:
      'O que mais mudou pra mim não foi um insight único, foi ter um lugar fixo, toda semana, pra organizar o que estava acontecendo antes de virar bola de neve.',
  },
]
