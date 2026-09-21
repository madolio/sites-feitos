// Depoimentos fictícios, concretos e específicos (não "adorei!" genérico) —
// cada um referencia uma técnica ou situação real do site: o cronômetro de
// cura, a garantia de 7 dias, ou a diferença entre BIAB e gel tradicional.

export type Depoimento = {
  id: string
  nome: string
  texto: string
  tecnica: string
}

export const depoimentos: Depoimento[] = [
  {
    id: 'camila',
    nome: 'Camila R.',
    tecnica: 'Gel de construção (BIAB)',
    texto:
      'Troquei de acrigel pra BIAB depois de ler sobre o tempo de cura no site. Na cadeira, a Renata cronometrou as 3 camadas certinho e minha unha saiu muito mais fina que o alongamento antigo. Passou de 3 semanas sem levantar na base.',
  },
  {
    id: 'juliana',
    nome: 'Juliana M.',
    tecnica: 'Esmalte em gel, LED',
    texto:
      'Lascou uma unha no quinto dia mexendo em caixa de mudança. Mandei mensagem, a Renata encaixou no dia seguinte e consertou só aquela unha, sem cobrar, porque ainda estava dentro da semana de garantia. Não esperava esse cuidado.',
  },
  {
    id: 'patricia',
    nome: 'Patrícia S.',
    tecnica: 'Remoção de gel de outro salão + dip powder',
    texto:
      'Minha unha natural tinha ficado fina de tanto arrancarem o gel no salão antigo. Aqui a remoção foi só lixa e acetona, sem alavancar, e a Renata me indicou unha em pó pra dar uma pausa da lâmpada até a unha recuperar a espessura.',
  },
]
