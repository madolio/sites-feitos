export type Especialidade = {
  nome: string
  descricao: string
  /** Parâmetros da miniatura de curva de nível (ver CurvaEspecialidade.tsx) —
   * o "relevo" de cada especialidade, não um ícone solto. */
  curva: {
    aneis: number[]
    a1: number
    a2: number
    freq1: number
    freq2: number
    cor: string
  }
}

export const especialidades: Especialidade[] = [
  {
    nome: 'Ortopédica',
    descricao:
      'Lesões musculoesqueléticas — entorses, tendinites, lombalgia, hérnia de disco, artrose — com avaliação postural e plano de exercício terapêutico individualizado.',
    // Relevo mais acidentado: correção ativa de um terreno irregular.
    curva: { aneis: [10, 18, 26, 34, 42], a1: 8, a2: 5, freq1: 6, freq2: 11, cor: 'var(--color-contorno)' },
  },
  {
    nome: 'Pós-operatória',
    descricao:
      'Reabilitação após cirurgia ortopédica (ligamento, menisco, prótese de quadril e joelho, cirurgia de coluna), seguindo o protocolo do cirurgião responsável fase a fase.',
    // Relevo estruturado, em etapas — protocolo fase a fase.
    curva: { aneis: [12, 22, 32, 42], a1: 5, a2: 2.5, freq1: 4, freq2: 7, cor: 'var(--color-altitude)' },
  },
  {
    nome: 'Esportiva',
    descricao:
      'Retorno ao esporte após lesão, prevenção de lesão recorrente e treino de performance para atletas amadores e competitivos.',
    // Relevo dinâmico, picos acentuados — carga e explosão de movimento.
    curva: { aneis: [9, 17, 25, 33, 41], a1: 9, a2: 6, freq1: 5, freq2: 9, cor: 'var(--color-trilha)' },
  },
  {
    nome: 'Neurológica',
    descricao:
      'Reabilitação motora após AVC, lesão medular, Parkinson e outras condições neurológicas, com foco em função, marcha e independência.',
    // Relevo assimétrico e imprevisível — reaprendizado de um padrão motor.
    curva: { aneis: [11, 20, 29, 38], a1: 6, a2: 7, freq1: 2, freq2: 7, cor: 'var(--color-tinta)' },
  },
  {
    nome: 'RPG',
    descricao:
      'Reeducação Postural Global — cadeias musculares alongadas em posturas ativas para tratar desequilíbrios posturais e dor crônica na origem, não só no sintoma.',
    // Relevo suave e concêntrico — controle fino, não força bruta.
    curva: { aneis: [14, 22, 30, 38, 46], a1: 2, a2: 1, freq1: 2, freq2: 3, cor: 'var(--color-contorno)' },
  },
]
