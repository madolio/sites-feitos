import Reveal from './Reveal'

const PROCEDIMENTOS = [
  {
    nome: 'Limpeza e profilaxia',
    resumo:
      'Remoção de placa e tártaro (raspagem supragengival) e polimento, com foco nos sulcos de molares e pré-molares, onde a escova sozinha tem mais dificuldade de alcançar.',
    duracao: '30–45 min',
  },
  {
    nome: 'Restauração',
    resumo:
      'Resina composta aplicada em camadas pra repor estrutura perdida por cárie ou fratura — a técnica e o tempo variam bastante entre um incisivo (fino, estético) e um molar (largo, sob carga mastigatória alta).',
    duracao: '30–75 min por dente',
  },
  {
    nome: 'Tratamento de canal (endodontia)',
    resumo:
      'Remoção da polpa infectada ou necrosada, limpeza e obturação dos canais radiculares. A complexidade sobe com o número de canais: 1 num incisivo, até 4 num molar.',
    duracao: '1–2 sessões de 60–90 min',
  },
  {
    nome: 'Clareamento dental',
    resumo:
      'Agente clareador em consultório ou moldeira caseira supervisionada, com os incisivos e caninos como referência de cor por serem a área de maior exposição ao sorrir.',
    duracao: 'sessão de ~1h + manutenção caseira',
  },
  {
    nome: 'Extração',
    resumo:
      'Da extração simples de um dente já erupcionado até a extração cirúrgica de um terceiro molar impactado, que pode exigir remoção de osso ou secção do dente.',
    duracao: '20–60 min, mais quando cirúrgica',
  },
  {
    nome: 'Implante dentário',
    resumo:
      'Pino de titânio inserido no osso no lugar da raiz perdida, seguido de um período de osseointegração antes da instalação da coroa definitiva.',
    duracao: 'cirurgia de 60–90 min + 3–6 meses de osseointegração',
  },
]

export default function Procedimentos() {
  return (
    <section id="procedimentos" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal>
        <p className="rotulo-mono">Procedimentos</p>
        <h2 className="mt-2 text-4xl sm:text-5xl">O que fazemos, em geral</h2>
        <p className="mt-4 max-w-2xl text-lg text-tinta/75">
          Uma visão rápida de cada procedimento. Pra ver qual faz sentido num dente
          específico, use o mapa da arcada acima.
        </p>
      </Reveal>
      <Reveal stagger={0.08} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROCEDIMENTOS.map((p) => (
          <div key={p.nome} className="rounded-2xl border border-linha bg-white/60 p-6">
            <h3 className="text-2xl">{p.nome}</h3>
            <p className="mt-2 text-sm text-tinta/75">{p.resumo}</p>
            <p className="valor-mono mt-4 text-xs">{p.duracao}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
