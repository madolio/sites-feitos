// Dados de recuperação por procedimento. Números aproximados a partir de
// literatura dermatológica geral (consensos de sociedades de dermatologia e
// cirurgia dermatológica sobre peelings, microagulhamento, skinboosters e
// toxina botulínica), faixas típicas, não promessa individual. Cada
// paciente cicatriza num ritmo próprio; por isso o texto do site usa
// "costuma", "em geral", nunca prazo fechado como garantia.

export type Camada = 'epiderme' | 'derme-papilar' | 'derme' | 'musculo'

export type Marco = {
  dia: number
  titulo: string
  descricao: string
  fase: 'procedimento' | 'reacao' | 'recuperacao' | 'resultado'
}

export type Procedimento = {
  id: string
  nome: string
  categoria: string
  camada: Camada
  camadaLabel: string
  mecanismo: string
  marcos: Marco[]
  duracaoResultado: string
  protocolo: string
}

export const procedimentos: Procedimento[] = [
  {
    id: 'limpeza',
    nome: 'Limpeza de pele profunda',
    categoria: 'Rotina',
    camada: 'epiderme',
    camadaLabel: 'Epiderme (camada córnea)',
    mecanismo:
      'Extração manual de comedões e vapor de ozônio agem só na camada córnea, a parte mais externa e morta da epiderme. Não há ferimento nem estímulo em derme.',
    marcos: [
      { dia: 0, titulo: 'Extração e vapor', descricao: 'Poros abertos com vapor, extração manual dos comedões. Pele pode ficar com pontos avermelhados nas próximas horas.', fase: 'procedimento' },
      { dia: 1, titulo: 'Vermelhidão resolvida', descricao: 'Os pontos de extração já não aparecem. Pele com sensação de "limpa", sem oleosidade acumulada.', fase: 'recuperacao' },
      { dia: 7, titulo: 'Pico do resultado', descricao: 'Poros visivelmente menos obstruídos: efeito máximo de uma sessão isolada.', fase: 'resultado' },
      { dia: 28, titulo: 'Retorno ao ponto de partida', descricao: 'A camada córnea já se renovou por completo e os poros voltam a acumular oleosidade, por isso a indicação é mensal.', fase: 'resultado' },
    ],
    duracaoResultado: 'Efeito dura cerca de 4 semanas; indicada mensalmente para manutenção.',
    protocolo: 'Sessão única, repetida mensalmente.',
  },
  {
    id: 'peeling-superficial',
    nome: 'Peeling químico superficial',
    categoria: 'Renovação',
    camada: 'epiderme',
    camadaLabel: 'Epiderme',
    mecanismo:
      'Ácidos como glicólico (30-50%) ou mandélico esfoliam a epiderme inteira, acelerando a renovação da camada córnea sem atingir a derme. Por isso o tempo de vermelhidão é curto.',
    marcos: [
      { dia: 0, titulo: 'Aplicação do ácido', descricao: 'Ácido aplicado sobre a epiderme por tempo controlado; ardor leve por alguns minutos, neutralizado em seguida.', fase: 'procedimento' },
      { dia: 2, titulo: 'Início da descamação', descricao: 'Vermelhidão leve e as primeiras áreas de descamação fina aparecem.', fase: 'reacao' },
      { dia: 5, titulo: 'Descamação no auge', descricao: 'Descamação mais visível: é a camada córnea antiga se soltando. Não deve ser puxada manualmente.', fase: 'recuperacao' },
      { dia: 14, titulo: 'Pele renovada', descricao: 'Descamação completa. Textura mais uniforme e viveza da pele perceptível.', fase: 'resultado' },
      { dia: 42, titulo: 'Resultado do protocolo', descricao: 'Após 3 a 4 sessões espaçadas a cada 2-4 semanas, o efeito acumulado fica evidente em textura e uniformidade.', fase: 'resultado' },
    ],
    duracaoResultado: 'Cada sessão isolada dura cerca de 4 a 6 semanas; protocolo típico de 4 a 6 sessões.',
    protocolo: 'Séries de 4 a 6 sessões, a cada 2-4 semanas.',
  },
  {
    id: 'peeling-medio',
    nome: 'Peeling médio (ATA)',
    categoria: 'Renovação',
    camada: 'derme-papilar',
    camadaLabel: 'Epiderme + derme papilar',
    mecanismo:
      'O ácido tricloroacético (TCA) em concentração média atravessa a epiderme e atinge a derme papilar, a camada logo abaixo. Por isso forma crosta (algo que um peeling superficial não faz) e o tempo de recuperação é mais longo.',
    marcos: [
      { dia: 0, titulo: 'Frosting', descricao: 'O ácido chega à derme papilar; a pele fica esbranquiçada na hora ("frosting"), sinal de que a profundidade certa foi atingida.', fase: 'procedimento' },
      { dia: 3, titulo: 'Formação de crostas', descricao: 'Crostas escuras se formam sobre toda a área tratada. Não devem ser removidas manualmente: cair antes do tempo pode manchar a pele.', fase: 'reacao' },
      { dia: 7, titulo: 'Queda das crostas', descricao: 'As crostas caem por completo, revelando pele nova e rosada por baixo.', fase: 'recuperacao' },
      { dia: 21, titulo: 'Vermelhidão residual passa', descricao: 'O tom rosado remanescente se resolve; o colágeno segue em remodelação na derme.', fase: 'recuperacao' },
      { dia: 60, titulo: 'Resultado final', descricao: 'Textura e manchas visivelmente reduzidas; o remodelamento dérmico leva semanas para se completar.', fase: 'resultado' },
    ],
    duracaoResultado: 'Resultado dura de 6 a 12 meses; geralmente 1 sessão a cada 6-12 meses.',
    protocolo: 'Sessão única, espaçada de 6 a 12 meses.',
  },
  {
    id: 'microagulhamento',
    nome: 'Microagulhamento',
    categoria: 'Estímulo de colágeno',
    camada: 'derme',
    camadaLabel: 'Derme papilar e reticular',
    mecanismo:
      'Agulhas de 0,5 a 2,5 mm criam microcanais controlados até a derme, provocando uma resposta de cicatrização que estimula produção de colágeno e elastina, sem remover camada nenhuma, ao contrário dos peelings.',
    marcos: [
      { dia: 0, titulo: 'Microcanais na derme', descricao: 'O rolo ou caneta de microagulhas perfura a epiderme e atinge a derme em profundidade calibrada conforme a indicação.', fase: 'procedimento' },
      { dia: 1, titulo: 'Vermelhidão tipo insolação', descricao: 'Pele avermelhada e sensível ao toque, como uma queimadura de sol leve.', fase: 'reacao' },
      { dia: 3, titulo: 'Vermelhidão cede', descricao: 'A cor volta ao normal; pequenos pontos de crosta microscópica podem aparecer e somem sozinhos.', fase: 'recuperacao' },
      { dia: 14, titulo: 'Textura mais uniforme', descricao: 'O colágeno novo já em formação começa a firmar a textura da pele.', fase: 'recuperacao' },
      { dia: 42, titulo: 'Resultado visível', descricao: 'Firmeza e poros menores perceptíveis: efeito de uma sessão isolada.', fase: 'resultado' },
    ],
    duracaoResultado: 'Resultado final em 2 a 3 meses após a série completa; protocolo de 3 a 6 sessões mensais.',
    protocolo: 'Séries de 3 a 6 sessões, uma por mês.',
  },
  {
    id: 'skinbooster',
    nome: 'Skinbooster',
    categoria: 'Hidratação injetável',
    camada: 'derme',
    camadaLabel: 'Derme',
    mecanismo:
      'Microinjeções de ácido hialurônico de baixa reticulação são depositadas na derme, onde atraem e retêm água. Diferente de um preenchedor, não muda volume ou contorno, só hidratação e elasticidade do tecido.',
    marcos: [
      { dia: 0, titulo: 'Microinjeções', descricao: 'Série de pequenas injeções distribui o ácido hialurônico de forma homogênea na derme.', fase: 'procedimento' },
      { dia: 2, titulo: 'Inchaço leve', descricao: 'Pequenos hematomas ou inchaço nos pontos de aplicação são comuns e esperados.', fase: 'reacao' },
      { dia: 7, titulo: 'Inchaço resolvido', descricao: 'Os pontos de aplicação não são mais visíveis; a pele já mostra brilho hidratado.', fase: 'recuperacao' },
      { dia: 30, titulo: 'Pico de hidratação', descricao: 'Efeito no auge: viço e elasticidade mais evidentes, com o ácido hialurônico distribuído pela derme.', fase: 'resultado' },
    ],
    duracaoResultado: 'Efeito dura de 4 a 6 meses; protocolo inicial de 2 a 3 sessões mensais.',
    protocolo: 'Início com 2 a 3 sessões mensais, depois manutenção semestral.',
  },
  {
    id: 'toxina',
    nome: 'Toxina botulínica',
    categoria: 'Relaxamento muscular',
    camada: 'musculo',
    camadaLabel: 'Junção neuromuscular (abaixo da pele)',
    mecanismo:
      'A toxina age na junção entre nervo e músculo, não na pele. Bloqueia temporariamente o sinal que contrai o músculo responsável pela ruga dinâmica (glabela, testa, "pés de galinha"). A pele em si não é tratada.',
    marcos: [
      { dia: 0, titulo: 'Aplicação', descricao: 'Pequenas injeções na junção neuromuscular dos músculos-alvo. Sem efeito visível ainda.', fase: 'procedimento' },
      { dia: 3, titulo: 'Primeiros sinais', descricao: 'Começam os primeiros sinais de relaxamento muscular na região tratada.', fase: 'reacao' },
      { dia: 14, titulo: 'Efeito máximo', descricao: 'Ação completa: as rugas dinâmicas (que aparecem ao movimentar o músculo) ficam suavizadas.', fase: 'resultado' },
      { dia: 90, titulo: 'Efeito começa a reduzir', descricao: 'O músculo recupera parte do movimento gradualmente.', fase: 'resultado' },
      { dia: 120, titulo: 'Reaplicação indicada', descricao: 'Na maioria dos casos, o efeito já se dissipou o bastante para justificar nova sessão.', fase: 'resultado' },
    ],
    duracaoResultado: 'Dura de 3 a 4 meses em média, variando com metabolismo e dose.',
    protocolo: 'Sessão única, repetida a cada 3-4 meses.',
  },
]
