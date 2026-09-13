export type Product = {
  name: string
  description: string
  /** Esquema técnico no lugar de foto (ver ProductGlyph.tsx) — nunca fotografia real. */
  glyph: 'filtrante' | 'tanque' | 'bancada' | 'cristal'
  spec?: { value: string; label: string }
}

export type OsmosisModel = Product & {
  /** Vazão nominal em litros por hora (o número do modelo). */
  flow: number
}

export const treatmentProducts: Product[] = [
  {
    name: 'Elementos Filtrantes',
    description:
      'Cartuchos e elementos filtrantes em diferentes graus de retenção, usados como pré-tratamento antes de qualquer sistema de osmose reversa.',
    glyph: 'filtrante',
  },
  {
    name: 'Tanques em PRFV',
    description:
      'Tanques em polímero reforçado com fibra de vidro, pra retrolavagem e filtração de grandes volumes, em diferentes portes de projeto.',
    glyph: 'tanque',
    spec: { value: '500 a 15.000 L/h', label: 'de vazão' },
  },
  {
    name: 'Bancada Reprocessadora de Capilar',
    description:
      'Equipamento pra limpeza e reuso seguro de capilares em clínicas de hemodiálise, com ciclo de desinfecção química controlado.',
    glyph: 'bancada',
  },
  {
    name: 'Insumos e Cargas Filtrantes',
    description:
      'Zeólitas e resinas de troca iônica, fornecidas em diferentes granulometrias conforme a aplicação.',
    glyph: 'cristal',
    spec: { value: '3 granulometrias', label: 'disponíveis' },
  },
]

export const osmosisModels: OsmosisModel[] = [
  {
    name: 'NSC-RO-15L',
    flow: 15,
    description:
      'Sistema compacto de osmose reversa pra água desmineralizada — ideal pra laboratórios e centrais de esterilização, com flush automático.',
    glyph: 'cristal',
  },
  {
    name: 'NSC-RO-70L',
    flow: 70,
    description:
      'Indicado pra laboratórios, indústrias e cervejarias, com pré-tratamento de polipropileno e carvão ativado.',
    glyph: 'cristal',
  },
  {
    name: 'NSC-RO-150L',
    flow: 150,
    description:
      'Pra hospitais e indústrias de maior porte, com pré-tratamento completo e alta constância de vazão.',
    glyph: 'cristal',
  },
  {
    name: 'NSC-RO-250L',
    flow: 250,
    description:
      'A maior vazão da linha — atende indústrias cosméticas, alimentícias e hospitalares com alta pureza.',
    glyph: 'cristal',
  },
]
