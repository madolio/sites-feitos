// Faixas de vazão típica por ponto de uso residencial, em litros por
// minuto (L/min), com a bacia sanitária em litros por descarga (unidade
// diferente, deixada explícita no componente que consome este dado).
// São faixas de referência amplamente citadas em manuais de instalação
// hidráulica residencial no Brasil (variam com a pressão da rede, o
// registro regulador e o modelo da peça, por isso são faixas, não um
// número fechado) — nenhum valor foi inventado, mas nenhum é tratado
// como medição exata de um cano específico, só como referência de
// comparação, o mesmo cuidado de hedge que o `razao` usa pros prazos
// fiscais ("geralmente até") em vez de data fechada.
export type Vazao = {
  id: string
  nome: string
  unidade: 'L/min' | 'L/descarga'
  faixaBaixa: number
  faixaAlta: number
  contexto: string
}

export const vazoes: Vazao[] = [
  {
    id: 'chuveiro',
    nome: 'Chuveiro elétrico',
    unidade: 'L/min',
    faixaBaixa: 6,
    faixaAlta: 12,
    contexto: 'A maioria dos chuveiros elétricos residenciais opera nessa faixa com pressão normal de rede.',
  },
  {
    id: 'torneira-banheiro',
    nome: 'Torneira de banheiro',
    unidade: 'L/min',
    faixaBaixa: 4,
    faixaAlta: 8,
    contexto: 'Torneira de lavatório comum, sem arejador de baixo fluxo.',
  },
  {
    id: 'torneira-cozinha',
    nome: 'Torneira de cozinha',
    unidade: 'L/min',
    faixaBaixa: 6,
    faixaAlta: 10,
    contexto: 'Torneira de pia, geralmente com bica mais alta e diâmetro maior que a de banheiro.',
  },
  {
    id: 'vaso-sanitario',
    nome: 'Vaso sanitário (caixa acoplada)',
    unidade: 'L/descarga',
    faixaBaixa: 6,
    faixaAlta: 10,
    contexto: 'Volume por descarga, não vazão contínua: é quanto a caixa solta de uma vez ao acionar.',
  },
  {
    id: 'maquina-lavar',
    nome: 'Máquina de lavar roupa',
    unidade: 'L/min',
    faixaBaixa: 10,
    faixaAlta: 20,
    contexto: 'Vazão de abastecimento da mangueira de entrada da máquina, não o consumo total do ciclo.',
  },
  {
    id: 'mangueira-jardim',
    nome: 'Mangueira de jardim/quintal',
    unidade: 'L/min',
    faixaBaixa: 15,
    faixaAlta: 20,
    contexto: 'Torneira externa de uso geral, costuma ter o maior diâmetro de saída da casa.',
  },
]
