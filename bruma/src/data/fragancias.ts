// Concentração de óleo essencial é dado real de perfumaria (faixa
// padrão da indústria, não um número decorado) — é ela que determina
// quanto tempo a fragrância dura na pele. A pirâmide olfativa (topo,
// coração, fundo) também é conceito real: cada camada evapora numa
// velocidade diferente, do mais volátil ao mais persistente.
export type Fragancia = {
  id: string
  nome: string
  tipo: string
  concentracao: string
  duracao: string
  topo: string[]
  coracao: string[]
  fundo: string[]
  descricao: string
}

export const fragancias: Fragancia[] = [
  {
    id: 'bruma-noturna',
    nome: 'Bruma Noturna',
    tipo: 'Eau de Parfum',
    concentracao: '18% de óleo essencial',
    duracao: '6–8 horas na pele',
    topo: ['Bergamota', 'Pimenta rosa'],
    coracao: ['Jasmim', 'Íris'],
    fundo: ['Âmbar', 'Musgo de carvalho'],
    descricao: 'A concentração EDP (15–20%) é o meio-termo clássico: dura o dia sem pesar.',
  },
  {
    id: 'raiz-seca',
    nome: 'Raiz Seca',
    tipo: 'Extrait de Parfum',
    concentracao: '25% de óleo essencial',
    duracao: '10–12 horas na pele',
    topo: ['Cardamomo'],
    coracao: ['Vetiver', 'Couro'],
    fundo: ['Sândalo', 'Âmbar cinza'],
    descricao: 'Extrait (20–30%) é a concentração mais alta do mercado — quase sem álcool, só óleo.',
  },
  {
    id: 'flor-de-sal',
    nome: 'Flor de Sal',
    tipo: 'Eau de Toilette',
    concentracao: '10% de óleo essencial',
    duracao: '3–5 horas na pele',
    topo: ['Limão siciliano', 'Sal marinho'],
    coracao: ['Flor de laranjeira'],
    fundo: ['Musk branco'],
    descricao: 'EDT (5–15%) evapora mais rápido de propósito — pensada pra reaplicar ao longo do dia.',
  },
  {
    id: 'fumaca-doce',
    nome: 'Fumaça Doce',
    tipo: 'Eau de Parfum',
    concentracao: '20% de óleo essencial',
    duracao: '8–10 horas na pele',
    topo: ['Cacau'],
    coracao: ['Incenso', 'Rosa negra'],
    fundo: ['Fava tonka', 'Baunilha'],
    descricao: 'No teto da faixa EDP (15–20%) — a mais encorpada das quatro sem virar Extrait.',
  },
]
