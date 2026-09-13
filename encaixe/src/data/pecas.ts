import {
  desenharAparador,
  desenharBanco,
  desenharBanqueta,
  desenharCadeira,
  desenharEstante,
  desenharMesa,
  type Desenho,
} from '../desenho'

export type Peca = {
  nome: string
  categoria: string
  madeira: string
  encaixe: string
  medidas: string
  aPartirDe: string
  descricao: string
  desenho: Desenho
}

export const pecas: Peca[] = [
  {
    nome: 'Mesa Juntada',
    categoria: 'Mesa de jantar',
    madeira: 'freijó maciço',
    encaixe: 'rabo-de-andorinha',
    medidas: '160 × 90 × 75 cm',
    aPartirDe: 'a partir de R$ 4.200',
    descricao:
      'O tampo é juntado de três tábuas escolhidas pelo desenho do veio, e a travessa entra na perna em rabo-de-andorinha — sem parafuso, sem cola visível, sem cantoneira.',
    desenho: desenharMesa('160 cm'),
  },
  {
    nome: 'Banco Trave',
    categoria: 'Banco de refeitório',
    madeira: 'ipê',
    encaixe: 'espiga-e-furo',
    medidas: '140 × 34 × 46 cm',
    aPartirDe: 'a partir de R$ 1.850',
    descricao:
      'Pensado pra ficar de pé sozinho: a perna vira espiga, o assento vira o furo, e o encaixe seca sob prensa antes de sair da bancada.',
    desenho: desenharBanco('140 cm'),
  },
  {
    nome: 'Estante Três Vãos',
    categoria: 'Estante modular',
    madeira: 'cumaru',
    encaixe: 'cavilha de madeira',
    medidas: '84 × 32 × 96 cm',
    aPartirDe: 'a partir de R$ 2.600',
    descricao:
      'Cada prateleira entra encaixada e presa por cavilha própria, torneada da mesma tábua — não tem bucha plástica em lugar nenhum dessa peça.',
    desenho: desenharEstante('84 cm'),
  },
  {
    nome: 'Cadeira Três Réguas',
    categoria: 'Cadeira de mesa',
    madeira: 'pequi',
    encaixe: 'espiga passante',
    medidas: '52 × 48 × 82 cm',
    aPartirDe: 'a partir de R$ 1.480',
    descricao:
      'O encosto entra direto no assento em espiga passante — a peça que mais quebra numa cadeira comprada pronta é a primeira que a gente reforça aqui.',
    desenho: desenharCadeira('52 cm'),
  },
  {
    nome: 'Aparador Gaveteiro',
    categoria: 'Aparador baixo',
    madeira: 'cedro-rosa',
    encaixe: 'rabo-de-andorinha',
    medidas: '164 × 42 × 68 cm',
    aPartirDe: 'a partir de R$ 3.900',
    descricao:
      'As gavetas correm em trilho de madeira, não de metal, e a lateral do corpo é fechada com o mesmo encaixe do tampo da mesa — família de peças, mesma linguagem.',
    desenho: desenharAparador('164 cm'),
  },
  {
    nome: 'Banqueta Cruzada',
    categoria: 'Banqueta baixa',
    madeira: 'angico',
    encaixe: 'meia-madeira em xis',
    medidas: '38 × 38 × 46 cm',
    aPartirDe: 'a partir de R$ 980',
    descricao:
      'As duas pernas se cruzam em meia-madeira — cada uma perde metade da espessura exatamente onde encontra a outra, e travam sem nenhum reforço metálico.',
    desenho: desenharBanqueta('38 cm'),
  },
]
