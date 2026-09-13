export type Caso = {
  id: string
  titulo: string
  ambiente: string
  area: string
  texto: string
  /** Cada caso tem seu próprio desenho técnico no painel direito — nunca foto. */
  ilustracao: 'planta' | 'secao' | 'axonometria' | 'material'
}

export const casos: Caso[] = [
  {
    id: 'vila-madalena',
    titulo: 'Apartamento na Vila Madalena',
    ambiente: 'Sala integrada e cozinha',
    area: '62 m²',
    texto:
      'A parede que separava sala e cozinha virou uma bancada de marcenaria — o mesmo espaço rende reunião, trabalho e jantar, sem perder a sensação de cômodos distintos.',
    ilustracao: 'planta',
  },
  {
    id: 'barra-funda',
    titulo: 'Cobertura na Barra Funda',
    ambiente: 'Terraço e living',
    area: '140 m²',
    texto:
      'O projeto trabalha o corte, não a planta: um pé-direito duplo entre o terraço e o living, com a luz da tarde entrando quase até o fundo do apartamento.',
    ilustracao: 'secao',
  },
  {
    id: 'itaim',
    titulo: 'Studio no Itaim',
    ambiente: 'Studio compacto',
    area: '34 m²',
    texto:
      'Cada móvel faz mais de uma função — a cama recolhe, a mesa vira bancada, o guarda-roupa esconde o home office. Nada fixo, tudo desenhado sob medida.',
    ilustracao: 'axonometria',
  },
  {
    id: 'ubatuba',
    titulo: 'Casa de praia em Ubatuba',
    ambiente: 'Casa inteira',
    area: '180 m²',
    texto:
      'Madeira de demolição, linho cru e cimento queimado — a paleta inteira decidida antes da planta, pra cada ambiente contar a mesma história de material.',
    ilustracao: 'material',
  },
]
