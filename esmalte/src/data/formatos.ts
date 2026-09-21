// Taxonomia real de formato de unha usada em treinamento de nail design —
// cada formato é definido pelo ângulo de lixamento da lateral em relação à
// lateral do dedo, do mais reto (quadrado, 90°) ao mais afunilado (stiletto).
// Ângulos são as faixas de referência ensinadas em cursos de manicure, não
// medição de precisão cirúrgica — por isso aparecem como faixa, não valor
// único.

export type Formato = {
  id: string
  nome: string
  anguloLateral: string
  descricao: string
  indicacao: string
}

export const formatos: Formato[] = [
  {
    id: 'quadrado',
    nome: 'Quadrado',
    anguloLateral: '90°',
    descricao: 'Lateral reta até a ponta, canto vivo em 90 graus.',
    indicacao: 'unha curta a média, quem digita ou trabalha manualmente o dia todo',
  },
  {
    id: 'squoval',
    nome: 'Squoval',
    anguloLateral: '~80°',
    descricao: 'Quadrado com o canto levemente arredondado, sem virar oval.',
    indicacao: 'meio-termo mais pedido em salão, resistente e fácil de manter',
  },
  {
    id: 'oval',
    nome: 'Oval',
    anguloLateral: '~55°',
    descricao: 'Lateral curva desde a base, ponta arredondada e alongada.',
    indicacao: 'afina visualmente o dedo, unha média a longa',
  },
  {
    id: 'amendoado',
    nome: 'Amendoado',
    anguloLateral: '~40°',
    descricao: 'Lateral estreita gradualmente até uma ponta arredondada, não pontiaguda.',
    indicacao: 'precisa de unha natural comprida ou alongamento',
  },
  {
    id: 'coffin',
    nome: 'Coffin / Ballerina',
    anguloLateral: '~25°',
    descricao: 'Lateral reta e estreita até uma ponta quadrada achatada.',
    indicacao: 'quase sempre feito sobre alongamento, visual alongado e moderno',
  },
  {
    id: 'stiletto',
    nome: 'Stiletto',
    anguloLateral: '~15°',
    descricao: 'Lateral afunilada até uma ponta pontiaguda, o formato mais extremo.',
    indicacao: 'alongamento reforçado (gel de construção), exige manutenção mais frequente',
  },
]
