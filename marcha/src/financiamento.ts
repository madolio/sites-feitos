// Fórmula real de amortização de empréstimo (tabela price/francesa):
// PMT = P × i × (1+i)^n / ((1+i)^n - 1), P = valor financiado, i = taxa
// mensal, n = número de parcelas. A mesma conta que qualquer financeira
// usa — nunca um valor de parcela inventado.
export const TAXA_MENSAL = 0.0149 // 1,49% a.m. — taxa média de mercado pra financiamento de veículo usado

export function calcularParcela(valorFinanciado: number, meses: number): number {
  if (valorFinanciado <= 0) return 0
  const i = TAXA_MENSAL
  const fator = Math.pow(1 + i, meses)
  return (valorFinanciado * i * fator) / (fator - 1)
}
