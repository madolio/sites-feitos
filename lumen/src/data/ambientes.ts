// Iluminância de referência (lux) por tipo de ambiente — valores usuais de
// projeto luminotécnico (norma NBR 5413 e prática de mercado), não
// inventados. A Calculadora usa isso como ponto de partida real.
export type Ambiente = {
  id: string
  nome: string
  lux: number
}

export const ambientes: Ambiente[] = [
  { id: 'estar', nome: 'Sala de estar', lux: 150 },
  { id: 'cozinha', nome: 'Cozinha', lux: 300 },
  { id: 'escritorio', nome: 'Escritório / leitura', lux: 500 },
  { id: 'precisao', nome: 'Trabalho de precisão', lux: 750 },
]

/** Fator de utilização e de manutenção — perdas reais de projeto luminotécnico. */
export const FATOR_UTILIZACAO = 0.7
export const FATOR_MANUTENCAO = 0.8
