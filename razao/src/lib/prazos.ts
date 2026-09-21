import type { Obrigacao, Regime } from '../data/regimes'

export type ProximoPrazo = {
  obrigacao: Obrigacao
  data: Date
  diasRestantes: number
}

/** Calcula a próxima ocorrência real de uma obrigação a partir de hoje.
 * Mensal: dia fixo deste mês, ou do mês seguinte se já passou.
 * Anual: mês/dia fixos, no ano corrente ou no próximo. */
function proximaOcorrencia(obrigacao: Obrigacao, hoje: Date): Date {
  const ano = hoje.getFullYear()
  const mesAtual = hoje.getMonth() + 1
  const hojeSemHora = new Date(ano, hoje.getMonth(), hoje.getDate()).getTime()

  if (obrigacao.periodicidade === 'mensal') {
    let candidato = new Date(ano, mesAtual - 1, obrigacao.diaVencimento)
    if (candidato.getTime() < hojeSemHora) {
      candidato = new Date(ano, mesAtual, obrigacao.diaVencimento)
    }
    return candidato
  }

  const mes = obrigacao.mesVencimento ?? 1
  let candidato = new Date(ano, mes - 1, obrigacao.diaVencimento)
  if (candidato.getTime() < hojeSemHora) {
    candidato = new Date(ano + 1, mes - 1, obrigacao.diaVencimento)
  }
  return candidato
}

/** Entre todas as obrigações de um regime, encontra a que vence primeiro a
 * partir de agora — o "próximo prazo" real do calendário, não decorativo. */
export function proximoPrazoDoRegime(regime: Regime, hoje: Date = new Date()): ProximoPrazo {
  const hojeSemHora = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()).getTime()
  const candidatos = regime.obrigacoes.map((obrigacao) => {
    const data = proximaOcorrencia(obrigacao, hoje)
    const diasRestantes = Math.round((data.getTime() - hojeSemHora) / 86_400_000)
    return { obrigacao, data, diasRestantes }
  })
  return candidatos.sort((a, b) => a.data.getTime() - b.data.getTime())[0]
}

export function formatarData(data: Date): string {
  return data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export const NOMES_MES = [
  'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
  'jul', 'ago', 'set', 'out', 'nov', 'dez',
]

/** Meses (1-12) em que o regime tem alguma obrigação vencendo — mensal marca
 * todos os 12, anual marca só o mês fixo dela. Usado pra acender os pontos
 * no calendário de parede. */
export function mesesComObrigacao(regime: Regime): Set<number> {
  const meses = new Set<number>()
  for (const obrigacao of regime.obrigacoes) {
    if (obrigacao.periodicidade === 'mensal') {
      for (let m = 1; m <= 12; m++) meses.add(m)
    } else {
      meses.add(obrigacao.mesVencimento ?? 1)
    }
  }
  return meses
}
