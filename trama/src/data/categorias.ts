export type Categoria = {
  nome: string
  descricao: string
  imagem?: string
  imagemAlt?: string
}

export const categorias: Categoria[] = [
  {
    nome: 'Básicos do dia a dia',
    descricao: 'Camisetas, camisas e blusas para o trabalho, a faculdade ou o fim de semana, do P ao GG e sempre em estoque.',
    imagem: 'https://images.pexels.com/photos/34334481/pexels-photo-34334481.jpeg?auto=compress&cs=tinysrgb&w=800',
    imagemAlt: 'Camisas dobradas em tons de azul, verde e mostarda organizadas em prateleira de loja',
  },
  {
    nome: 'Jeans e calças',
    descricao: 'Do skinny ao reto, do jeans clássico à sarja, com provador de cabine aberta pra ajustar o tamanho na hora.',
    imagem: 'https://images.pexels.com/photos/4109759/pexels-photo-4109759.jpeg?auto=compress&cs=tinysrgb&w=800',
    imagemAlt: 'Pilha de calças jeans azuis dobradas, mostrando a textura do tecido e as costuras',
  },
  {
    nome: 'Vestidos e conjuntos',
    descricao: 'Peças para o dia e para sair, em viscose, malha e algodão, com trocas em até 7 dias e etiqueta intacta.',
    imagem: 'https://images.pexels.com/photos/37557292/pexels-photo-37557292.jpeg?auto=compress&cs=tinysrgb&w=800',
    imagemAlt: 'Vestidos estampados pendurados lado a lado em um varal de loja',
  },
  {
    nome: 'Moletom e inverno',
    descricao: 'Blusas de frio, moletons e jaquetas para os dias mais frios do ano, sem precisar ir até o centro.',
    imagem: 'https://images.pexels.com/photos/5710046/pexels-photo-5710046.jpeg?auto=compress&cs=tinysrgb&w=800',
    imagemAlt: 'Pilha de suéteres de tricô dobrados em tons neutros e terracota',
  },
]
