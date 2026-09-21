export type Depoimento = {
  nome: string
  tecido: string
  texto: string
}

export const depoimentos: Depoimento[] = [
  {
    nome: 'Débora S.',
    tecido: 'jeans',
    texto:
      'Comprei uma calça jeans e lavei junto com uma toalha branca sem prestar atenção na etiqueta. A Marlene me explicou por que o jeans sangra tinta mesmo depois de várias lavagens e agora eu lavo do avesso, sozinho, água fria. Não perdeu mais cor.',
  },
  {
    nome: 'Rogério A.',
    tecido: 'viscose',
    texto:
      'Torci um vestido de viscose pra secar mais rápido e ele saiu do formato. Voltei na loja, mostraram o símbolo de secagem na horizontal e trocaram a peça dentro do prazo. Hoje eu sei que viscose molhada não aguenta torção.',
  },
  {
    nome: 'Patrícia M.',
    tecido: 'malha com elastano',
    texto:
      'Coloquei uma legging na secadora quente umas três vezes até ela ficar frouxa no joelho. Na Trama me mostraram que é o elastano que estraga com calor, não o tecido em si. Troquei o hábito e as peças novas estão durando muito mais.',
  },
]
