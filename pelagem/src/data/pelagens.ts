// Guia real de tipo de pelagem: cada tipo tem cuidado, frequência de escovação,
// frequência de banho e técnica de tosa genuinamente diferentes — não é um
// filtro decorativo, é informação real de tosa profissional.

export type Pelagem = {
  id: string
  nome: string
  exemplo: string
  escovacao: string
  banho: string
  tosa: string
  cuidadoEspecial: string
}

export const etapasGuia = [
  { rotulo: 'Escovação', texto: 'Frequência recomendada pra evitar nós e queda excessiva em casa.' },
  { rotulo: 'Banho', texto: 'De quanto em quanto tempo o banho é indicado pra esse tipo de pelo.' },
  { rotulo: 'Tosa', texto: 'A técnica correta — nem toda pelagem pode ser raspada ou tosada igual.' },
  { rotulo: 'Atenção', texto: 'O cuidado específico que esse tipo de pelo exige e que costuma passar batido.' },
] as const

export const pelagens: Pelagem[] = [
  {
    id: 'curta',
    nome: 'Curta e lisa',
    exemplo: 'Labrador, Pit Bull, Boxer',
    escovacao: '1x por semana, com escova de cerdas macias ou luva de borracha.',
    banho: 'A cada 4 a 6 semanas — banho em excesso resseca a pele nesse tipo de pelo.',
    tosa: 'Não precisa de tosa, só aparo leve ao redor de patas e orelhas quando pedido.',
    cuidadoEspecial: 'Pelo curto solta bastante durante a muda sazonal, mesmo sendo baixa manutenção no resto do ano.',
  },
  {
    id: 'dupla',
    nome: 'Dupla (subpelo)',
    exemplo: 'Golden Retriever, Husky Siberiano, Pastor Alemão',
    escovacao: '2 a 3x por semana, e diária nas épocas de muda, com escova de subpelo (undercoat rake).',
    banho: 'A cada 4 a 6 semanas, com secagem completa — subpelo úmido gera fungo e mau cheiro.',
    tosa: 'Nunca raspar. O subpelo protege do calor e do frio: tosar remove essa proteção e o pelo pode voltar irregular.',
    cuidadoEspecial: 'O de-shedding (escovação de retirada de subpelo morto) é o serviço mais importante pra esse tipo, mais até que o corte.',
  },
  {
    id: 'crespa',
    nome: 'Crespa (não cai)',
    exemplo: 'Poodle, Bichon Frisé, Lhasa Apso',
    escovacao: 'Diária, com pente fino — esse pelo continua crescendo e enrola sobre si mesmo se não for penteado.',
    banho: 'A cada 3 a 4 semanas, sempre seguido de escovação completa antes da secagem.',
    tosa: 'Tosa obrigatória a cada 4 a 6 semanas: o pelo não para de crescer sozinho como nas outras pelagens.',
    cuidadoEspecial: 'Nó (matted coat) se forma rápido atrás da orelha e nas axilas: se enrijecer perto da pele, o corte curto vira a única opção segura.',
  },
  {
    id: 'arame',
    nome: 'Áspera (arame)',
    exemplo: 'Schnauzer, Fox Terrier, Jack Russell de pelo duro',
    escovacao: '1 a 2x por semana, com escova de cerdas firmes pra manter a textura.',
    banho: 'A cada 4 a 6 semanas, com produto que não amoleça a fibra do pelo.',
    tosa: 'Ideal é o hand-stripping (arrancar pelo morto à mão), que mantém a textura. A tesoura é a alternativa mais comum e também funciona.',
    cuidadoEspecial: 'Tosa na máquina repetida amolece esse pelo com o tempo e some com a textura característica da raça.',
  },
]
