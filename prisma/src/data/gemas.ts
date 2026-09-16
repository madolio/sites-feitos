// Índice de refração (IOR) e dispersão são valores reais de tabela
// gemológica (o mesmo número que um refratômetro mede na pedra de
// verdade) — nunca um valor "por olho". Dispersão é a diferença entre o
// IOR pra luz vermelha e violeta (Abbe), responsável pelo "fogo" visível
// em pedras como o diamante.
export type Gema = {
  id: string
  nome: string
  formula: string
  ior: number
  dispersao: number
  dureza: string
  cor: string
  descricao: string
}

export const gemas: Gema[] = [
  {
    id: 'diamante',
    nome: 'Diamante',
    formula: 'C',
    ior: 2.417,
    dispersao: 0.044,
    dureza: '10 (Mohs)',
    cor: '#eef4ff',
    descricao:
      'O maior índice de refração e a maior dispersão de qualquer gema comum — é isso que produz o "fogo" (faíscas coloridas) clássico do diamante.',
  },
  {
    id: 'rubi',
    nome: 'Rubi',
    formula: 'Al₂O₃ + Cr',
    ior: 1.762,
    dispersao: 0.018,
    dureza: '9 (Mohs)',
    cor: '#c3184f',
    descricao:
      'Coríndon vermelho — o cromo entre os átomos de alumínio e oxigênio é o que dá a cor. Mesma estrutura cristalina da safira.',
  },
  {
    id: 'safira',
    nome: 'Safira',
    formula: 'Al₂O₃ + Fe,Ti',
    ior: 1.762,
    dispersao: 0.018,
    dureza: '9 (Mohs)',
    cor: '#1f4fb8',
    descricao:
      'O mesmo coríndon do rubi, mas com ferro e titânio no lugar do cromo — daí o azul. IOR e dispersão idênticos ao do rubi.',
  },
  {
    id: 'esmeralda',
    nome: 'Esmeralda',
    formula: 'Be₃Al₂(SiO₃)₆ + Cr',
    ior: 1.577,
    dispersao: 0.014,
    dureza: '7,5–8 (Mohs)',
    cor: '#0f8a52',
    descricao:
      'Berilo verde — a variedade mais frágil desta lista, por isso quase sempre lapidada em corte "esmeralda" (cantos chanfrados) pra proteger as bordas.',
  },
  {
    id: 'topazio',
    nome: 'Topázio Imperial',
    formula: 'Al₂SiO₄(F,OH)₂',
    ior: 1.619,
    dispersao: 0.014,
    dureza: '8 (Mohs)',
    cor: '#e8873a',
    descricao:
      'Silicato de alumínio — a cor laranja-avermelhada mais valorizada da família, historicamente ligada às minas de Ouro Preto.',
  },
  {
    id: 'ametista',
    nome: 'Ametista',
    formula: 'SiO₂ + Fe',
    ior: 1.544,
    dispersao: 0.013,
    dureza: '7 (Mohs)',
    cor: '#7c4fd1',
    descricao:
      'Quartzo com traços de ferro irradiado naturalmente — o menor IOR desta lista, por isso o "fogo" é o mais discreto.',
  },
]
