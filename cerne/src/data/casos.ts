export type Sala = {
  id: string
  nome: string
  descricao: string
  material: string
  /** Retângulo da sala na planta, no viewBox 0 0 480 320 (mesma escala em todos os casos). */
  rect: { x: number; y: number; w: number; h: number }
}

export type Caso = {
  id: string
  titulo: string
  ambiente: string
  area: string
  salas: Sala[]
}

export const casos: Caso[] = [
  {
    id: 'vila-madalena',
    titulo: 'Apartamento na Vila Madalena',
    ambiente: 'Sala integrada e cozinha',
    area: '62 m²',
    salas: [
      {
        id: 'cozinha',
        nome: 'Cozinha',
        descricao: 'A bancada de marcenaria vira a nova parede entre os ambientes — reúne, mas não confunde os dois cômodos.',
        material: 'Freijó maciço',
        rect: { x: 20, y: 20, w: 200, h: 140 },
      },
      {
        id: 'sala',
        nome: 'Sala',
        descricao: 'Recebe reunião, trabalho e jantar sem perder a sensação de cômodos distintos.',
        material: 'Piso em taco recuperado',
        rect: { x: 240, y: 20, w: 220, h: 280 },
      },
      {
        id: 'varanda',
        nome: 'Varanda',
        descricao: 'Vidro do piso ao teto apaga a linha entre dentro e fora.',
        material: 'Esquadria em alumínio preto',
        rect: { x: 20, y: 180, w: 200, h: 120 },
      },
    ],
  },
  {
    id: 'barra-funda',
    titulo: 'Cobertura na Barra Funda',
    ambiente: 'Terraço e living',
    area: '140 m²',
    salas: [
      {
        id: 'terraco',
        nome: 'Terraço',
        descricao: 'Pé-direito duplo deixa a luz da tarde entrar quase até o fundo do apartamento.',
        material: 'Deck em ipê',
        rect: { x: 20, y: 20, w: 440, h: 100 },
      },
      {
        id: 'living',
        nome: 'Living',
        descricao: 'Ganhou um mezanino sem perder amplitude — o pé-direito permanece visível do térreo.',
        material: 'Concreto aparente',
        rect: { x: 20, y: 140, w: 300, h: 160 },
      },
      {
        id: 'mezanino',
        nome: 'Mezanino',
        descricao: 'Um escritório suspenso, com vista pro living lá embaixo.',
        material: 'Guarda-corpo em cabo de aço',
        rect: { x: 340, y: 140, w: 120, h: 160 },
      },
    ],
  },
  {
    id: 'itaim',
    titulo: 'Studio no Itaim',
    ambiente: 'Studio compacto',
    area: '34 m²',
    salas: [
      {
        id: 'dormir',
        nome: 'Dormir',
        descricao: 'A cama recolhe na parede quando não está em uso.',
        material: 'Marcenaria multifuncional',
        rect: { x: 20, y: 20, w: 200, h: 140 },
      },
      {
        id: 'trabalhar',
        nome: 'Trabalhar',
        descricao: 'A mesa vira bancada de trabalho — dobra e some quando o expediente acaba.',
        material: 'Tampo em compensado naval',
        rect: { x: 240, y: 20, w: 220, h: 140 },
      },
      {
        id: 'guardar',
        nome: 'Guardar',
        descricao: 'Uma parede inteira de armários esconde tudo o que os 34 m² não têm espaço pra deixar à vista.',
        material: 'Portas em laca fosca',
        rect: { x: 20, y: 180, w: 440, h: 100 },
      },
    ],
  },
  {
    id: 'ubatuba',
    titulo: 'Casa de praia em Ubatuba',
    ambiente: 'Casa inteira',
    area: '180 m²',
    salas: [
      {
        id: 'sala',
        nome: 'Sala',
        descricao: 'Aberta pro jardim, recebe a casa inteira em volta da lareira.',
        material: 'Cimento queimado',
        rect: { x: 20, y: 20, w: 220, h: 140 },
      },
      {
        id: 'cozinha',
        nome: 'Cozinha',
        descricao: 'Ilha central em madeira de demolição, virada pro mar.',
        material: 'Madeira de demolição',
        rect: { x: 260, y: 20, w: 200, h: 140 },
      },
      {
        id: 'quarto',
        nome: 'Quarto',
        descricao: 'Linho cru e luz indireta — o quarto principal olha pra árvore mais antiga do terreno.',
        material: 'Linho cru',
        rect: { x: 20, y: 180, w: 220, h: 120 },
      },
      {
        id: 'varanda',
        nome: 'Varanda',
        descricao: 'Estende a sala pra fora, sem esquadria — só o parapeito.',
        material: 'Guarda-corpo em cabo de aço',
        rect: { x: 260, y: 180, w: 200, h: 120 },
      },
    ],
  },
]
