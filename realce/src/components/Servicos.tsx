import { grupos, servicos } from '../data/servicos'

function duracao(minutos: number) {
  if (minutos < 60) return `${minutos} min`
  const h = Math.floor(minutos / 60)
  const resto = minutos % 60
  return resto ? `${h}h${String(resto).padStart(2, '0')}` : `${h}h`
}

// Lista editorial, não grade de card com ícone: cada grupo é um bloco de
// índice à esquerda e os serviços correm à direita separados por filete.
export default function Servicos() {
  return (
    <section id="servicos" className="bg-noite py-20 text-luz md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="revelar max-w-2xl">
          <p className="rotulo text-latao">O que fazemos</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Serviços da casa</h2>
          <p className="mt-4 text-fumo">
            O tempo ao lado de cada um é o que reservamos na agenda. Serve pra
            você saber o que cabe na sua manhã — e é o mesmo número que a
            montagem de visita usa lá em cima.
          </p>
        </div>

        {grupos.map((grupo) => (
          <div key={grupo} className="revelar mt-14 grid gap-6 sm:grid-cols-[10rem_1fr]">
            <h3 className="rotulo pt-1 text-latao">{grupo}</h3>

            <ul>
              {servicos
                .filter((s) => s.grupo === grupo)
                .map((s) => (
                  <li key={s.id} className="border-t border-luz/12 py-5 first:border-t-0 first:pt-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <h4 className="font-display text-xl">{s.nome}</h4>
                      <span className="tabular shrink-0 text-sm text-fumo">
                        {duracao(s.minutos)}
                      </span>
                    </div>
                    <p className="mt-1.5 text-fumo">{s.nota}</p>
                  </li>
                ))}
            </ul>
          </div>
        ))}

        <p className="revelar mt-14 text-sm text-fumo">
          Valores variam conforme comprimento do cabelo, área e produto usado —
          por isso passamos o orçamento na mensagem, com o serviço já definido,
          em vez de publicar uma tabela que não fecha pra todo mundo.
        </p>
      </div>
    </section>
  )
}
