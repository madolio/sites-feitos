import Reveal from './Reveal'

const etapas = [
  {
    titulo: '1. Leitura do local',
    texto:
      'luz direta ou filtrada, umidade, exposição ao vento — o mesmo levantamento que decide se uma espécie vinga ou não, antes de qualquer escolha estética.',
  },
  {
    titulo: '2. Escolha por espécie, não por cor',
    texto:
      'a paleta do arranjo ou do canteiro nasce das espécies que combinam com o local e a estação — a cor é consequência da espécie certa, não o ponto de partida.',
  },
  {
    titulo: '3. Cultivo e montagem',
    texto:
      'produção própria na estufa em Nova Friburgo, clima de serra favorável a espécies de meia-sombra — corte, plantio ou instalação de paisagismo conforme o projeto.',
  },
  {
    titulo: '4. Ficha de cuidado',
    texto:
      'toda entrega sai com a ficha da espécie (rega, luz, poda) — a mesma informação técnica do catálogo, adaptada pro ambiente de quem recebe.',
  },
]

export default function Processo() {
  return (
    <section id="processo" className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-ficha text-musgo">Como funciona</p>
          <h2 className="mt-2 max-w-xl text-4xl">Da leitura do local à ficha de cuidado</h2>
        </Reveal>

        <Reveal as="ol" stagger={0.1} className="mt-10 grid gap-8 sm:grid-cols-2">
          {etapas.map((etapa) => (
            <li key={etapa.titulo} className="border-l-2 border-musgo/40 pl-5">
              <h3 className="text-xl">{etapa.titulo}</h3>
              <p className="mt-2 text-mata/70">{etapa.texto}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
