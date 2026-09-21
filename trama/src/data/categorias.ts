export type Categoria = {
  nome: string
  descricao: string
}

export const categorias: Categoria[] = [
  {
    nome: 'Básicos do dia a dia',
    descricao: 'Camisetas, camisas e blusas para o trabalho, a faculdade ou o fim de semana, do P ao GG e sempre em estoque.',
  },
  {
    nome: 'Jeans e calças',
    descricao: 'Do skinny ao reto, do jeans clássico à sarja, com provador de cabine aberta pra ajustar o tamanho na hora.',
  },
  {
    nome: 'Vestidos e conjuntos',
    descricao: 'Peças para o dia e para sair, em viscose, malha e algodão, com trocas em até 7 dias e etiqueta intacta.',
  },
  {
    nome: 'Moletom e inverno',
    descricao: 'Blusas de frio, moletons e jaquetas para os dias mais frios do ano, sem precisar ir até o centro.',
  },
]
