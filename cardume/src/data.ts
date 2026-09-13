export type Curso = {
  id: string
  nome: string
  /** Profundidade máxima que o curso libera — é onde a placa aparece. */
  profundidade: number
  descricao: string
  detalhe: string
  preco: string
}

export const cursos: Curso[] = [
  {
    id: 'batismo',
    nome: 'Batismo',
    profundidade: 12,
    descricao: 'A primeira respiração debaixo d’água, com instrutor do seu lado o tempo todo. Sem certificado, sem compromisso.',
    detalhe: '1 mergulho em mar',
    preco: 'R$ 390',
  },
  {
    id: 'open-water',
    nome: 'Open Water Diver',
    profundidade: 18,
    descricao: 'A certificação que te deixa mergulhar em qualquer lugar do mundo, com dupla.',
    detalhe: '4 mergulhos em mar + aulas em piscina',
    preco: 'R$ 2.190',
  },
  {
    id: 'advanced',
    nome: 'Advanced Open Water',
    profundidade: 30,
    descricao: 'Navegação, mergulho noturno e profundo — é aqui que a luz do sol começa a ir embora.',
    detalhe: '5 mergulhos de especialidade',
    preco: 'R$ 1.890',
  },
  {
    id: 'deep',
    nome: 'Deep Diver',
    profundidade: 40,
    descricao: 'Gestão de gás, narcose e o fundo de verdade, onde fica o naufrágio.',
    detalhe: '4 mergulhos profundos',
    preco: 'R$ 1.590',
  },
]

export const curiosidades: { profundidade: number; texto: string }[] = [
  {
    profundidade: 5,
    texto: 'A 10 m a pressão já é o dobro da superfície — por isso suas bolhas crescem enquanto sobem.',
  },
  {
    profundidade: 15,
    texto: 'O vermelho é a primeira cor a sumir. Daqui pra baixo, tudo fica azul e verde.',
  },
  {
    profundidade: 24,
    texto: 'A luz do sol quase não chega mais. Sua lanterna acendeu — ela segue o seu cursor.',
  },
]
