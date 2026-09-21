// Depoimentos fictícios com primeiro nome + inicial do sobrenome, cada um
// com um caso concreto (adaptação, alergia alimentar, comunicação diária),
// não elogio genérico.

export type Depoimento = {
  autor: string
  texto: string
}

export const depoimentos: Depoimento[] = [
  {
    autor: 'Marina T.',
    texto:
      'A Alice chorava todo dia na porta nas duas primeiras semanas. A coordenadora me ligava no fim da tarde pra contar como tinha sido, sem eu precisar perguntar. Hoje ela corre pra sala sozinha.',
  },
  {
    autor: 'Rafael S.',
    texto:
      'O Theo tem alergia a amendoim. Antes de fechar a matrícula, a equipe da cozinha me chamou pra conversar sobre o cardápio, item por item. Depois de um ano, nunca precisei me preocupar com isso.',
  },
  {
    autor: 'Camila D.',
    texto:
      'Recebo um recado curto todo dia sobre o que a Laura comeu, dormiu e fez. Parece pouco, mas é o que me deixa tranquila trabalhando fora o dia inteiro.',
  },
]
