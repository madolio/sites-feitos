import { naProfundidade } from './Pranchetas'

// Quem já desceu — pendurado a 32 m, entre o Advanced e o FAQ, com o mesmo
// tratamento de placa das pranchetas de curso.
const depoimentos = [
  {
    autor: 'Marina T.',
    curso: 'Batismo',
    texto:
      'Entrei apavorada. O instrutor não largou meu braço em nenhum momento, e nos 8 m uma tartaruga passou do nosso lado. Já saí de lá perguntando quando dava pra fazer o Open Water.',
  },
  {
    autor: 'Rafael S.',
    curso: 'Open Water Diver',
    texto:
      'Na piscina eu não conseguia equalizar de jeito nenhum, ficava com o ouvido doendo. O instrutor ajustou minha técnica numa aula só e os quatro mergulhos em mar saíram redondos.',
  },
  {
    autor: 'Bianca O.',
    curso: 'Advanced Open Water',
    texto:
      'Antes de entrar na água pro noturno eu quase desisti, já escurecendo. Mas o facho da lanterna cortando a água preta foi o melhor momento do curso inteiro, de longe.',
  },
]

export default function Depoimentos() {
  return (
    <div className="absolute inset-x-0 px-4 sm:px-[8%]" style={naProfundidade(33)}>
      <section aria-labelledby="depoimentos-titulo" className="mx-auto max-w-4xl">
        <p className="font-visor text-xs text-lanterna">quem já desceu</p>
        <h2 id="depoimentos-titulo" className="mt-2 text-2xl font-extrabold sm:text-3xl">
          O que quem já mergulhou conta
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="prancheta">
              <blockquote className="text-sm text-espuma/85">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="font-visor mt-4 text-[0.7rem] text-lanterna">
                {d.autor} · {d.curso}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}
