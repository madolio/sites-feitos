// Cada área de atuação é uma linha do checklist de sistemas (GO/NO-GO) do
// `Docket.tsx` — `code` é o identificador técnico do sistema (não decorativo:
// funciona como rótulo real do item), `casos` é o número que "gira" no
// `Readout.tsx` antes de travar, como um contador de telemetria ao vivo.
export type Area = {
  code: string
  name: string
  description: string
  casos: string
}

export const areas: Area[] = [
  {
    code: 'SYS-01',
    name: 'Direito contratual',
    description:
      'Elaboração e revisão de contratos comerciais, prestação de serviços e parcerias — pra fechar negócio sem deixar brecha.',
    casos: '08',
  },
  {
    code: 'SYS-02',
    name: 'Direito societário',
    description:
      'Constituição de sociedades, acordos entre sócios, alterações contratuais e reorganizações societárias.',
    casos: '05',
  },
  {
    code: 'SYS-03',
    name: 'Consultivo empresarial',
    description:
      'Orientação jurídica contínua pro dia a dia da empresa, antes que uma decisão vire um problema.',
    casos: '14',
  },
  {
    code: 'SYS-04',
    name: 'Contencioso civil',
    description:
      'Defesa e representação em disputas civis e empresariais, do acordo à sentença.',
    casos: '03',
  },
]
