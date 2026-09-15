// Processo específico de design de interiores — não o "conversa, orçamento,
// entrega" genérico que serviria pra qualquer prestador de serviço. Cada
// etapa é uma decisão real que muda o resultado (por que medir a luz antes
// de desenhar, por que material vem antes de planta), não só uma sequência
// de atendimento.
const etapas = [
  {
    titulo: 'Como você vive no espaço',
    texto:
      'Antes de desenhar qualquer coisa, a gente observa a rotina de verdade: onde você trabalha, onde recebe visita, que horário a luz entra em cada cômodo.',
  },
  {
    titulo: 'Paleta de material primeiro',
    texto:
      'A materioteca da casa é decidida antes da planta — não depois. Um projeto que escolhe piso no final geralmente parece remendado.',
  },
  {
    titulo: 'A planta nasce do material',
    texto:
      'Com a paleta fechada, desenhamos os cômodos em função dela: uma bancada de freijó vira parede porque a madeira permite, não porque "ficou bonito no render".',
  },
  {
    titulo: 'Acompanhamento na obra',
    texto:
      'Especificação não é sugestão — a gente acompanha a instalação de cada material pra garantir que o que foi desenhado é o que é executado.',
  },
]

export default function Processo() {
  return (
    <section id="processo" className="border-t border-line bg-panel px-6 py-16 sm:px-10 md:py-24">
      <div className="mx-auto max-w-3xl">
        <span className="text-sm font-medium text-pine">Como a gente projeta</span>
        <h2 className="mt-2 text-3xl text-ink sm:text-4xl">Design de interior é decisão de material, não estética</h2>

        <ol className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
          {etapas.map((etapa, i) => (
            <li key={etapa.titulo}>
              <span className="font-display text-2xl text-pine">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-xl text-ink">{etapa.titulo}</h3>
              <p className="mt-2 text-ink/70">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
