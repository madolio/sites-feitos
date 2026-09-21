// Tempos de cura reais por técnica de esmaltação, documentados pela indústria
// de nail design (fabricantes de esmalte em gel, tabelas de treinamento de
// manicures e fichas técnicas de lâmpada LED/UV). Nada aqui é inventado:
// são as faixas que qualquer manicure profissional usa no dia a dia.

export type TipoLampada = 'led' | 'uv'

export type Tecnica = {
  id: string
  nome: string
  resumo: string
  /** Se a técnica não usa lâmpada, os campos de cura ficam undefined. */
  usaLampada: boolean
  /** Segundos de cura por camada, por tipo de lâmpada (quando usaLampada). */
  segundosPorCamada?: Record<TipoLampada, number>
  /** Nº de camadas típico: base + cor(es) + top coat, ou equivalente. */
  camadas: number
  camadasDetalhe: string
  /** Tempo de secagem ao ar (técnicas sem lâmpada), em minutos, [mín, máx]. */
  secagemArMin?: [number, number]
  curaTotalDetalhe: string
  durabilidadeSemanas: [number, number]
  removeDetalhe: string
}

export const tecnicas: Tecnica[] = [
  {
    id: 'tradicional',
    nome: 'Esmalte tradicional',
    resumo: 'O esmalte de sempre, no vidrinho, secagem ao ar livre.',
    usaLampada: false,
    camadas: 3,
    camadasDetalhe: 'base + 2 demãos de cor + top coat',
    secagemArMin: [45, 60],
    curaTotalDetalhe: 'toque seco em ~1h; cura completa (dureza final do filme) em até 24h',
    durabilidadeSemanas: [1, 1],
    removeDetalhe: 'sai com acetona comum, sem esforço',
  },
  {
    id: 'gel',
    nome: 'Esmalte em gel',
    resumo: 'Cor de esmalte comum, mas polimeriza sob luz em vez de secar ao ar.',
    usaLampada: true,
    segundosPorCamada: { led: 30, uv: 120 },
    camadas: 4,
    camadasDetalhe: 'base + 2 demãos de cor + top coat, uma passada na lâmpada por camada',
    curaTotalDetalhe: 'sai da lâmpada já endurecido, sem espera de secagem',
    durabilidadeSemanas: [2, 3],
    removeDetalhe: 'precisa de remoção com lixa + algodão embebido em acetona, ~15min',
  },
  {
    id: 'po',
    nome: 'Unha em pó (dip powder)',
    resumo: 'Pó mergulhado sobre um ativador, sem lâmpada nenhuma.',
    usaLampada: false,
    camadas: 3,
    camadasDetalhe: 'base ativadora + mergulho no pó + selador',
    secagemArMin: [8, 12],
    curaTotalDetalhe: 'brilho final já em ~10min ao ar, sem cabine de luz',
    durabilidadeSemanas: [3, 4],
    removeDetalhe: 'remoção com lixa + acetona, igual ao gel',
  },
  {
    id: 'biab',
    nome: 'Gel de construção (BIAB)',
    resumo: 'Gel espesso que reforça a unha natural, aplicado em camadas.',
    usaLampada: true,
    segundosPorCamada: { led: 60, uv: 120 },
    camadas: 3,
    camadasDetalhe: 'camada de base + camada de construção + top coat',
    curaTotalDetalhe: 'cada camada cura na lâmpada antes da próxima entrar',
    durabilidadeSemanas: [3, 4],
    removeDetalhe: 'remoção com lixa + acetona, mais demorada por ser mais espesso',
  },
]

export const lampadas: Record<TipoLampada, { nome: string; nm: string; detalhe: string }> = {
  led: {
    nome: 'Lâmpada LED',
    nm: '405nm',
    detalhe: 'cura mais rápida, luz roxo-azulada característica dos estúdios atuais',
  },
  uv: {
    nome: 'Lâmpada UV (fluorescente)',
    nm: '340–380nm',
    detalhe: 'a cabine mais antiga, cura mais lenta que a LED pra mesma camada',
  },
}
