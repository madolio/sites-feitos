import Reveal from './Reveal'

const etapas = [
  {
    titulo: '1. Leitura do local',
    texto:
      'luz direta ou filtrada, umidade, exposição ao vento: o mesmo levantamento que decide se uma espécie vinga ou não, antes de qualquer escolha estética.',
  },
  {
    titulo: '2. Escolha por espécie, não por cor',
    texto:
      'a paleta do arranjo ou do canteiro nasce das espécies que combinam com o local e a estação. A cor é consequência da espécie certa, não o ponto de partida.',
  },
  {
    titulo: '3. Cultivo e montagem',
    texto:
      'produção própria na estufa em Nova Friburgo, clima de serra favorável a espécies de meia-sombra. Corte, plantio ou instalação de paisagismo, conforme o projeto.',
  },
  {
    titulo: '4. Ficha de cuidado',
    texto:
      'toda entrega sai com a ficha da espécie (rega, luz, poda), a mesma informação técnica do catálogo, adaptada pro ambiente de quem recebe.',
  },
]

export default function Processo() {
  return (
    <section id="processo" className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="dado-ficha text-musgo">Como funciona</p>
            <h2 className="mt-2 max-w-xl text-4xl">Da leitura do local à ficha de cuidado</h2>
          </div>

          {/* polaroid de campo: a única presença de mão no site — o resto da
              página é catálogo botânico e dado, essa é a única foto que mostra
              o trabalho manual por trás da ficha técnica */}
          <figure className="w-36 shrink-0 rotate-[-3deg] border-4 border-white bg-white pb-2 shadow-lg sm:w-44">
            <img
              src="https://images.pexels.com/photos/5894100/pexels-photo-5894100.jpeg?auto=compress&cs=tinysrgb&w=480"
              alt="Mãos podando hastes de flores com tesoura de jardim"
              width={480}
              height={360}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="dado-ficha mt-2 text-center text-[10px] text-mata/50">
              no cultivo, todo dia
            </figcaption>
          </figure>
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
