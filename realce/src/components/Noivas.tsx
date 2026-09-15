import { sendToWhatsApp } from '../demo'

// Contado pra trás a partir da cerimônia — é assim que noiva pensa o dia,
// e é o inverso da linha do tempo de "Monte sua visita" (que corre pra
// frente a partir da chegada).
const roteiro = [
  { quando: '5h antes', o_que: 'Chegada, café e conferência do vestido' },
  { quando: '4h antes', o_que: 'Cuidados com a pele' },
  { quando: '3h antes', o_que: 'Cabelo e penteado' },
  { quando: '1h30 antes', o_que: 'Mãos e pés' },
  { quando: '45 min antes', o_que: 'Ajustes finais e primeiras fotos' },
  { quando: 'Hora marcada', o_que: 'Você sai daqui pronta' },
]

export default function Noivas() {
  return (
    <section id="noivas" className="bg-branco py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="revelar">
            <p className="rotulo text-dourado-escuro">Noivas</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              O dia da noiva não começa no dia.
            </h2>
            <p className="mt-5 text-grafite">
              Começa no teste, semanas antes, quando a gente descobre o que o
              seu cabelo faz sob calor, sob véu e depois de seis horas de festa.
              O que acontece na manhã do casamento é só a repetição de uma coisa
              que já deu certo.
            </p>
            <p className="mt-4 text-grafite">
              Por ser um serviço longo — em torno de quatro horas de cadeira —
              ele trava a agenda do dia. Quanto antes você falar com a gente,
              mais fácil segurar o horário que você quer.
            </p>

            <button
              type="button"
              onClick={() =>
                sendToWhatsApp(
                  'Olá! Vou casar e queria falar sobre o dia da noiva no Realce & Cia — ' +
                    'gostaria de saber sobre o teste e a disponibilidade de data.',
                )
              }
              className="btn-dourado mt-8"
            >
              Falar sobre o meu casamento
            </button>
          </div>

          <div className="revelar">
            <h3 className="rotulo text-grafite">Roteiro típico da manhã</h3>
            <div className="filete mt-2 mb-2" />
            <ol>
              {roteiro.map((etapa) => (
                <li
                  key={etapa.quando}
                  className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-preto/10 py-4 last:border-b-0"
                >
                  <span className="tabular text-sm text-dourado-escuro">{etapa.quando}</span>
                  <span>{etapa.o_que}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-grafite">
              É um roteiro de referência: a ordem muda conforme o penteado, o
              tipo de véu e quantas pessoas vão se arrumar junto com você.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
