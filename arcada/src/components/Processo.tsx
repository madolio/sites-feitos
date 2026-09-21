import Reveal from './Reveal'

const ETAPAS = [
  {
    titulo: 'Levantamento por dente',
    texto:
      'Antes de propor qualquer procedimento, mapeamos a arcada inteira — o mesmo mapa que você acabou de explorar é, literalmente, o que registramos no seu prontuário.',
  },
  {
    titulo: 'Prioridade clínica, não a mais cara',
    texto:
      'Dor e risco de infecção vêm antes de estética. Um canal necessário é proposto antes de uma faceta, mesmo que a faceta pareça mais atraente no orçamento.',
  },
  {
    titulo: 'Plano por fases',
    texto:
      'Tratamentos longos (ortodontia, implante) são divididos em etapas com prazo real, não uma promessa vaga de "alguns meses".',
  },
  {
    titulo: 'Retorno programado',
    texto:
      'Cada tipo de dente tem seu próprio risco — sulco de molar acumula placa, siso parcialmente erupcionado inflama — por isso o intervalo de retorno é ajustado por caso, não fixo pra todo mundo.',
  },
]

export default function Processo() {
  return (
    <section id="processo" className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
      <Reveal>
        <p className="rotulo-mono">Como conduzimos</p>
        <h2 className="mt-2 text-4xl sm:text-5xl">O plano segue a anatomia, não o contrário</h2>
      </Reveal>
      <Reveal stagger={0.1} className="mt-10 grid gap-6 sm:grid-cols-2">
        {ETAPAS.map((etapa, i) => (
          <div key={etapa.titulo} className="rounded-2xl border border-linha bg-white/60 p-6">
            <p className="valor-mono text-xs">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 text-2xl">{etapa.titulo}</h3>
            <p className="mt-2 text-sm text-tinta/75">{etapa.texto}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
