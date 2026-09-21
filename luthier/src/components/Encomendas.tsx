import Reveal from './Reveal'

const ETAPAS = [
  {
    titulo: '1. Entrevista e medidas',
    texto:
      'Conversa sobre repertório, altura das mãos e preferência de timbre. Definimos o comprimento de escala (348–650 mm, dependendo do instrumento) e a bitola inicial de corda.',
  },
  {
    titulo: '2. Escolha de madeiras',
    texto:
      'Tampo (abeto ou cedro) e fundo/laterais (mogno, bordo ou jacaranda-da-índia) escolhidos por densidade e comportamento acústico, não só por aparência.',
  },
  {
    titulo: '3. Construção e regulagem',
    texto:
      'Colagem do tampo, montagem do braço, escala e trastes, e regulagem final de ação (altura das cordas) e oitavação — o instrumento é testado com afinador de referência antes de sair da bancada.',
  },
  {
    titulo: '4. Entrega com ficha técnica',
    texto:
      'Cada instrumento sai com a ficha real de comprimento de escala, bitolas usadas e madeiras — a mesma lógica de dado real usada na calculadora acima, não uma etiqueta genérica.',
  },
]

export default function Encomendas() {
  return (
    <section id="encomendas" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Reveal>
        <p className="rotulo-mono">encomendas</p>
        <h2 className="mt-2 font-display text-3xl sm:text-5xl">
          Violão, viola caipira ou ukulele — sob medida, com processo real.
        </h2>
        <p className="mt-4 max-w-2xl text-osso/75">
          Cada instrumento leva de 60 a 90 dias, do primeiro corte de madeira à
          entrega regulada. Nenhuma etapa é "feito com carinho" sem dado por trás.
        </p>
      </Reveal>

      <Reveal stagger={0.08} className="mt-12 grid gap-6 sm:grid-cols-2">
        {ETAPAS.map((etapa) => (
          <div key={etapa.titulo} className="rounded-2xl border border-neblina/25 bg-painel p-6">
            <h3 className="font-display text-xl">{etapa.titulo}</h3>
            <p className="mt-2 text-sm text-osso/75">{etapa.texto}</p>
          </div>
        ))}
      </Reveal>

      <Reveal delay={0.1} className="mt-12 rounded-2xl border border-cobre/40 bg-painel p-6 sm:p-8">
        <p className="rotulo-mono">nota sobre madeira</p>
        <p className="mt-2 text-osso/80">
          Usamos jacarandá-da-índia (Dalbergia latifolia) quando o cliente pede o
          timbre clássico de rosewood. O jacarandá-da-bahia (Dalbergia nigra) —
          historicamente o mais usado em violões brasileiros de luxo — está
          protegido pela CITES desde 1992 e não faz parte do catálogo da Ressoa.
        </p>
      </Reveal>
    </section>
  )
}
