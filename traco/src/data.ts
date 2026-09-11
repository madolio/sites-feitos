// Traço é um escritório fictício — conceito de site da Madolio pro nicho de
// arquitetura e design de interiores. Projetos, área e cidade são exemplos
// plausíveis, não uma empresa real.

export type Projeto = {
  id: string
  nome: string
  local: string
  tipo: string
  area: number
  ano: number
}

export const projetos: Projeto[] = [
  { id: 'jaguare', nome: 'Casa Jaguaré', local: 'São Paulo, SP', tipo: 'Residencial', area: 210, ano: 2025 },
  { id: 'aimores', nome: 'Apartamento Aimorés', local: 'Belo Horizonte, MG', tipo: 'Reforma', area: 92, ano: 2024 },
  { id: 'ferradura', nome: 'Casa da Ferradura', local: 'Búzios, RJ', tipo: 'Residencial', area: 340, ano: 2023 },
  { id: 'atelie-luz', nome: 'Ateliê da Luz', local: 'São Paulo, SP', tipo: 'Comercial', area: 78, ano: 2024 },
  { id: 'varanda-alta', nome: 'Cobertura Varanda Alta', local: 'Curitiba, PR', tipo: 'Reforma', area: 165, ano: 2022 },
  { id: 'patio-central', nome: 'Casa Pátio Central', local: 'Brasília, DF', tipo: 'Residencial', area: 280, ano: 2025 },
]

export const processo = [
  {
    title: 'Escuta',
    text: 'Visitamos o terreno ou o imóvel, ouvimos como a família ou a equipe realmente vive, e levantamos as restrições legais do lote.',
  },
  {
    title: 'Estudo',
    text: 'Volumetria e plantas em estudo, com pelo menos duas direções diferentes pra comparar antes de fechar um caminho.',
  },
  {
    title: 'Projeto executivo',
    text: 'Detalhamento completo — estrutura, instalações, marcenaria — pronto pra orçar e construir sem surpresa.',
  },
  {
    title: 'Acompanhamento de obra',
    text: 'Visitas periódicas até a entrega, resolvendo no campo o que só aparece depois que a parede sai do papel.',
  },
]
