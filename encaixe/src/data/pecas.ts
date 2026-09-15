import { desenharBlazer, desenharCalca, desenharCamisa, desenharColete, type Desenho } from '../desenho'

export type Peca = {
  nome: string
  categoria: string
  tecido: string
  detalhe: string
  medidas: string
  aPartirDe: string
  descricao: string
  desenho: Desenho
}

export const pecas: Peca[] = [
  {
    nome: 'Blazer Ravena',
    categoria: 'Blazer de duas camadas',
    tecido: 'lã fria',
    detalhe: 'lapela entalhada à mão',
    medidas: 'Corte clássico',
    aPartirDe: 'a partir de R$ 2.400',
    descricao:
      'A lapela é entalhada e costurada à mão, não termocolada — é o que faz ela cair reta e não enrugar depois de uma tarde sentado.',
    desenho: desenharBlazer('Clássico'),
  },
  {
    nome: 'Calça Alfaiataria Reta',
    categoria: 'Calça de fechamento clássico',
    tecido: 'lã fria',
    detalhe: 'prega frontal simples',
    medidas: 'Corte clássico',
    aPartirDe: 'a partir de R$ 980',
    descricao:
      'Uma prega só na frente, não duas — dá mais espaço no quadril sem parecer larga demais na cintura.',
    desenho: desenharCalca('Clássico'),
  },
  {
    nome: 'Colete Sarja',
    categoria: 'Colete de terno três peças',
    tecido: 'tweed',
    detalhe: 'bolso com aba',
    medidas: 'Corte clássico',
    aPartirDe: 'a partir de R$ 780',
    descricao:
      'Fechamento em V baixo, pensado pra não esconder o nó da gravata — o erro mais comum de colete pronto.',
    desenho: desenharColete('Clássico'),
  },
  {
    nome: 'Camisa Punho Duplo',
    categoria: 'Camisa social',
    tecido: 'algodão egípcio',
    detalhe: 'punho com botão duplo',
    medidas: 'Corte slim',
    aPartirDe: 'a partir de R$ 590',
    descricao:
      'O punho com dois botões ajusta em dois pontos, não um — segura melhor no pulso sem folgar durante o dia.',
    desenho: desenharCamisa('Slim'),
  },
]
