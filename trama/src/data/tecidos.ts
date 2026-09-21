// Dados reais de cuidado têxtil, na linguagem da simbologia de etiqueta de
// cuidado (ABNT NBR NM ISO 3758 / ISO 3758) e de propriedade real de fibra —
// não números inventados. Cada tecido é uma peça comum de loja de bairro:
// camiseta de algodão, calça jeans, vestido de viscose, camisa de linho,
// blusa de poliéster e legging de malha com elastano.

export type Simbolo = {
  rotulo: string
  detalhe: string
}

export type Tecido = {
  id: string
  nome: string
  pecaExemplo: string
  fibra: string
  composicao: string
  // Propriedades reais de fibra, comparadas de forma relativa (não inventada):
  absorcao: 'baixa' | 'média' | 'alta'
  elasticidade: 'baixa' | 'média' | 'alta'
  respirabilidade: 'baixa' | 'média' | 'alta'
  amassa: 'pouco' | 'moderado' | 'muito'
  // Símbolos de cuidado reais, na ordem em que aparecem numa etiqueta:
  lavagem: Simbolo
  alvejante: Simbolo
  secagem: Simbolo
  passar: Simbolo
  observacao: string
}

export const tecidos: Tecido[] = [
  {
    id: 'algodao',
    nome: 'Algodão',
    pecaExemplo: 'Camiseta básica',
    fibra: 'Fibra natural vegetal',
    composicao: '100% algodão',
    absorcao: 'alta',
    elasticidade: 'baixa',
    respirabilidade: 'alta',
    amassa: 'moderado',
    lavagem: { rotulo: 'Até 40°C, ciclo normal', detalhe: 'Fibra resistente à água quente e à fricção mecânica da máquina.' },
    alvejante: { rotulo: 'Alvejante sem cloro, se precisar', detalhe: 'Suporta alvejante oxigenado; cloro em excesso amarela e enfraquece a fibra com o tempo.' },
    secagem: { rotulo: 'Varal ou secadora em temperatura baixa', detalhe: 'Encolhimento residual de 3-5% é normal na primeira lavagem; secadora quente aumenta esse encolhimento.' },
    passar: { rotulo: 'Ferro quente, até 200°C', detalhe: 'Suporta a temperatura mais alta da tabela, por isso passa fácil mesmo bem amassado.' },
    observacao: 'A fibra mais tolerante da loja: aceita água quente, ferro quente e uso pesado. Amassa visivelmente, mas nada nela é frágil.',
  },
  {
    id: 'jeans',
    nome: 'Jeans (sarjado)',
    pecaExemplo: 'Calça jeans',
    fibra: 'Algodão em tecelagem sarjada, tingimento índigo',
    composicao: '98% algodão, 2% elastano (maioria dos jeans atuais)',
    absorcao: 'alta',
    elasticidade: 'baixa',
    respirabilidade: 'média',
    amassa: 'pouco',
    lavagem: { rotulo: 'Água fria, do avesso, ciclo suave', detalhe: 'O índigo é um corante de superfície que sangra; água fria e peça do avesso reduzem a perda de cor a cada lavagem.' },
    alvejante: { rotulo: 'Não usar alvejante', detalhe: 'Cloro reage com o índigo e desbota a cor de forma irregular e permanente.' },
    secagem: { rotulo: 'Varal, à sombra', detalhe: 'Secadora quente encolhe o elastano da cintura mais rápido que o algodão, deformando o caimento.' },
    passar: { rotulo: 'Ferro médio, 150°C', detalhe: 'Temperatura mais baixa que o algodão puro por causa do elastano na trama, que amolece acima disso.' },
    observacao: 'A tecelagem sarjada (diagonal, mais densa que a lisa) é o que faz o jeans amassar pouco e durar mais que uma camiseta do mesmo algodão.',
  },
  {
    id: 'viscose',
    nome: 'Viscose',
    pecaExemplo: 'Vestido estampado',
    fibra: 'Fibra artificial de celulose (polpa de madeira regenerada)',
    composicao: '100% viscose',
    absorcao: 'alta',
    elasticidade: 'baixa',
    respirabilidade: 'alta',
    amassa: 'muito',
    lavagem: { rotulo: 'À mão ou ciclo delicado, água fria', detalhe: 'A fibra perde até 50% da resistência quando molhada, e torcer ou usar ciclo pesado rasga a trama.' },
    alvejante: { rotulo: 'Não usar alvejante', detalhe: 'A celulose regenerada é sensível a agentes oxidantes fortes, que degradam a fibra.' },
    secagem: { rotulo: 'Estendida na horizontal, à sombra, sem torcer', detalhe: 'Pendurada molhada, a peça estica pelo próprio peso e perde o caimento original.' },
    passar: { rotulo: 'Ferro baixo-médio, 150°C, com pano por cima', detalhe: 'Brilha e marca se o ferro tocar a fibra diretamente em temperatura alta.' },
    observacao: 'A fibra mais delicada da loja: o toque fresco e a queda fluida vêm da mesma estrutura que a deixa frágil molhada.',
  },
  {
    id: 'linho',
    nome: 'Linho',
    pecaExemplo: 'Camisa de verão',
    fibra: 'Fibra natural vegetal (talo do linho)',
    composicao: '100% linho',
    absorcao: 'alta',
    elasticidade: 'baixa',
    respirabilidade: 'alta',
    amassa: 'muito',
    lavagem: { rotulo: 'Até 40°C, ciclo normal', detalhe: 'Fibra robusta, fica ainda mais macia a cada lavagem (o oposto da viscose).' },
    alvejante: { rotulo: 'Alvejante sem cloro, se precisar', detalhe: 'Tolera bem, mas cloro repetido amarela peças brancas ao longo do tempo.' },
    secagem: { rotulo: 'Varal, ainda úmida para passar em seguida', detalhe: 'Passar levemente úmida facilita tirar o vinco típico da fibra.' },
    passar: { rotulo: 'Ferro quente, 200°C, a vapor', detalhe: 'Precisa da temperatura mais alta da tabela para alisar a fibra rígida sem esforço excessivo.' },
    observacao: 'Amassa muito porque a fibra é rígida e pouco elástica. É essa mesma rigidez que dá a textura seca e fresca característica do linho.',
  },
  {
    id: 'poliester',
    nome: 'Poliéster',
    pecaExemplo: 'Blusa social',
    fibra: 'Fibra sintética (derivada de petróleo)',
    composicao: '100% poliéster',
    absorcao: 'baixa',
    elasticidade: 'média',
    respirabilidade: 'baixa',
    amassa: 'pouco',
    lavagem: { rotulo: 'Até 30-40°C, ciclo normal', detalhe: 'Fibra sintética termoplástica: água muito quente pode fixar vincos e manchas de forma permanente.' },
    alvejante: { rotulo: 'Não usar alvejante com cloro', detalhe: 'Cloro amarela a fibra sintética branca de forma irreversível.' },
    secagem: { rotulo: 'Secadora baixa ou varal, seca rápido nos dois', detalhe: 'A fibra não absorve água como o algodão, por isso seca em uma fração do tempo.' },
    passar: { rotulo: 'Ferro baixo, 110°C', detalhe: 'É a temperatura mais baixa da tabela: acima disso, a fibra termoplástica derrete ou brilha.' },
    observacao: 'Baixa absorção é a característica que define tudo: seca rápido, não amassa, mas também não "respira" tanto quanto o algodão ou o linho.',
  },
  {
    id: 'malha-elastano',
    nome: 'Malha com elastano',
    pecaExemplo: 'Legging / body',
    fibra: 'Malha de algodão ou poliéster com fio de elastano',
    composicao: '92% algodão ou poliéster, 8% elastano (faixa típica de legging)',
    absorcao: 'média',
    elasticidade: 'alta',
    respirabilidade: 'média',
    amassa: 'pouco',
    lavagem: { rotulo: 'Água fria, ciclo delicado, sem torcer', detalhe: 'Água quente e fricção forte quebram as fibras de elastano, que perdem elasticidade aos poucos.' },
    alvejante: { rotulo: 'Não usar alvejante', detalhe: 'Cloro degrada o elastano diretamente, mesmo em contato breve.' },
    secagem: { rotulo: 'Varal, nunca secadora quente', detalhe: 'Calor da secadora é a causa mais comum de legging perder a elasticidade antes da cintura.' },
    passar: { rotulo: 'Não passar / ferro muito baixo se necessário', detalhe: 'O elastano derrete a temperaturas relativamente baixas; a peça geralmente não precisa de ferro.' },
    observacao: 'A elasticidade alta vem inteira do fio de elastano. Sem ele, a malha teria a mesma elasticidade baixa do algodão puro.',
  },
]
