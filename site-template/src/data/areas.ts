// `casos` é o número que "roda" no painel (SplitFlap) — casos ativos naquela
// área, como o número de um voo/trem no quadro de partidas de verdade.
export type Area = {
  number: string
  name: string
  description: string
  casos: string
}

export const areas: Area[] = [
  {
    number: '01',
    name: 'Direito contratual',
    description:
      'Elaboração e revisão de contratos comerciais, prestação de serviços e parcerias — pra fechar negócio sem deixar brecha.',
    casos: '08',
  },
  {
    number: '02',
    name: 'Direito societário',
    description:
      'Constituição de sociedades, acordos entre sócios, alterações contratuais e reorganizações societárias.',
    casos: '05',
  },
  {
    number: '03',
    name: 'Consultivo empresarial',
    description:
      'Orientação jurídica contínua pro dia a dia da empresa, antes que uma decisão vire um problema.',
    casos: '14',
  },
  {
    number: '04',
    name: 'Contencioso civil',
    description:
      'Defesa e representação em disputas civis e empresariais, do acordo à sentença.',
    casos: '03',
  },
]
