// A ideia inteira do site foi reformulada: em vez de um catálogo estático
// com uma régua de navegação ao lado, o encaixe (não o móvel) é o ponto de
// partida. Escolher um tipo aqui filtra o catálogo (Catalogo.tsx) e
// controla a ilustração interativa (EncaixeInterativo.tsx).
export type EncaixeTipo = {
  id: string
  nome: string
  descricao: string
  match: (encaixeDaPeca: string) => boolean
}

export const encaixes: EncaixeTipo[] = [
  {
    id: 'rabo-de-andorinha',
    nome: 'Rabo-de-andorinha',
    descricao:
      'Dentes triangulares que travam por geometria, não por atrito — quanto mais força tenta separar as duas peças, mais forte elas prendem. Usado em tampos e gavetas que recebem peso puxando pra fora.',
    match: (e) => e.includes('rabo-de-andorinha'),
  },
  {
    id: 'espiga-e-furo',
    nome: 'Espiga e furo',
    descricao:
      'O encaixe mais antigo da marcenaria: uma ponta entalhada encaixa exata num furo aberto na outra peça. Funciona bem em qualquer direção de força — por isso é o padrão de perna com assento.',
    match: (e) => e.includes('espiga'),
  },
  {
    id: 'meia-madeira',
    nome: 'Meia-madeira',
    descricao:
      'As duas peças perdem metade da espessura exatamente onde se cruzam, e encaixam rente, sem sobrar saliência. Trava peças que se cruzam no mesmo plano, como pernas em X.',
    match: (e) => e.includes('meia-madeira'),
  },
  {
    id: 'cavilha',
    nome: 'Cavilha',
    descricao:
      'Um pino torneado da própria madeira atravessa as duas peças e trava por atrito e cola — sem parafuso, sem metal, sem ferrugem pra aparecer com o tempo.',
    match: (e) => e.includes('cavilha'),
  },
]
