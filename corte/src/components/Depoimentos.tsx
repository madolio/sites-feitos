// Depoimentos fictícios amarrados ao mecanismo de senha do site (Corte é um
// negócio fictício, ver Agendar.tsx). Formato "nome + inicial do sobrenome".
const depoimentos = [
  {
    autor: 'Diego M.',
    senha: 'Nº 51',
    texto:
      'Marquei pelo site numa sexta às 20h e vi que ia ser a senha 51, uns 35 minutos de espera. Cheguei e foi isso mesmo, sem enrolação. Nunca mais fiquei parado sem saber quanto tempo faltava.',
  },
  {
    autor: 'Fernanda L.',
    senha: 'Nº 44',
    texto:
      'Atrasei uns 15 minutos vindo do trabalho e já contava que ia perder minha senha. Chegando lá, pegaram meus dados na hora e me encaixaram rapidinho.',
  },
  {
    autor: 'Patrícia S.',
    senha: 'Nº 38',
    texto:
      'Levei meu filho de 6 anos pra cortar o cabelo fora de casa pela primeira vez. O Igor foi com calma, mostrou a máquina pra ele antes de ligar.',
  },
]

export default function Depoimentos() {
  return (
    <section className="border-t-2 border-ink bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl text-paper sm:text-4xl">Quem já pegou senha aqui</h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {depoimentos.map((d) => (
            <figure key={d.autor} className="relative rounded-lg border border-paper/20 bg-paper/5 p-5">
              <span aria-hidden="true" className="ticket absolute top-4 right-4 text-sm text-paper/40">
                {d.senha}
              </span>
              <blockquote className="pr-12 text-sm text-paper/85">&ldquo;{d.texto}&rdquo;</blockquote>
              <figcaption className="ticket mt-4 text-sm text-paper/55">{d.autor}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
