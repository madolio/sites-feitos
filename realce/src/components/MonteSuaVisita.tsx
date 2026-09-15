import { useState } from 'react'
import { grupos, servicos } from '../data/servicos'
import { sendToWhatsApp } from '../demo'

const ABERTURA = 9 * 60
const FECHAMENTO = 19 * 60

const horarios = Array.from({ length: 9 }, (_, i) => ABERTURA + i * 60)

function hhmm(minutos: number) {
  return `${String(Math.floor(minutos / 60)).padStart(2, '0')}:${String(minutos % 60).padStart(2, '0')}`
}

function duracao(minutos: number) {
  if (minutos < 60) return `${minutos} min`
  const h = Math.floor(minutos / 60)
  const resto = minutos % 60
  return resto ? `${h}h${String(resto).padStart(2, '0')}` : `${h}h`
}

// O serviço vira um bloco com altura proporcional ao tempo: é o que faz a
// agenda "fechar na frente" de quem monta, em vez de virar só uma lista.
// O piso de 78px é a altura do conteúdo do bloco (horário + nome + "tirar"):
// abaixo disso o texto vazaria por cima do bloco seguinte.
function altura(minutos: number) {
  return Math.max(78, minutos * 0.8)
}

export default function MonteSuaVisita() {
  const [escolhidos, setEscolhidos] = useState<string[]>([])
  const [chegada, setChegada] = useState(ABERTURA)

  function alternar(id: string) {
    setEscolhidos((atual) =>
      atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id],
    )
  }

  const itens = escolhidos.flatMap((id) => {
    const s = servicos.find((x) => x.id === id)
    return s ? [s] : []
  })

  let relogio = chegada
  const blocos = itens.map((s) => {
    const inicio = relogio
    relogio += s.minutos
    return { servico: s, inicio, fim: relogio }
  })

  const total = itens.reduce((soma, s) => soma + s.minutos, 0)
  const saida = chegada + total
  const passaDoFechamento = saida > FECHAMENTO

  function pedir() {
    const linhas = blocos
      .map((b) => `• ${hhmm(b.inicio)}–${hhmm(b.fim)} · ${b.servico.nome} (${duracao(b.servico.minutos)})`)
      .join('\n')

    sendToWhatsApp(
      'Olá! Queria agendar estes serviços no Realce & Cia:\n\n' +
        linhas +
        `\n\nTotal: ${duracao(total)}, chegando às ${hhmm(chegada)} e saindo por volta das ${hhmm(saida)}.` +
        '\nEm qual dia vocês conseguem me encaixar?',
    )
  }

  return (
    <section id="visita" className="bg-cinza py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="revelar max-w-2xl">
          <p className="rotulo text-dourado-escuro">Reservas</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Monte sua visita</h2>
          <p className="mt-4 text-grafite">
            Escolha os serviços na ordem em que quer fazer. A agenda ao lado
            monta sozinha, com hora de início, hora de saída e o tempo total —
            aí é só mandar pronto, sem ficar trocando mensagem pra descobrir se
            cabe no seu dia.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_24rem] lg:items-start">
          <div>
            {grupos.map((grupo) => (
              <div key={grupo} className="revelar mb-8">
                <h3 className="rotulo text-grafite">{grupo}</h3>
                <div className="filete mt-2 mb-4" />
                <ul className="grid gap-2 sm:grid-cols-2">
                  {servicos
                    .filter((s) => s.grupo === grupo)
                    .map((s) => {
                      const ativo = escolhidos.includes(s.id)
                      return (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => alternar(s.id)}
                            aria-pressed={ativo}
                            className={`flex w-full items-baseline justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                              ativo
                                ? 'border-dourado bg-dourado text-preto'
                                : 'border-preto/15 bg-branco hover:border-dourado hover:bg-dourado/15'
                            }`}
                          >
                            <span className="font-medium">{s.nome}</span>
                            <span
                              className={`tabular shrink-0 text-sm ${ativo ? 'text-preto/70' : 'text-grafite'}`}
                            >
                              {duracao(s.minutos)}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                </ul>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-preto p-6 text-branco lg:sticky lg:top-24">
            <p className="rotulo text-dourado">Sua agenda</p>

            <div className="mt-5">
              <label htmlFor="chegada" className="text-sm text-fumo">
                Chego às
              </label>
              <select
                id="chegada"
                value={chegada}
                onChange={(e) => setChegada(Number(e.target.value))}
                className="tabular mt-2 w-full rounded-lg border border-branco/25 bg-preto px-3 py-2.5 text-branco"
              >
                {horarios.map((h) => (
                  <option key={h} value={h}>
                    {hhmm(h)}
                  </option>
                ))}
              </select>
            </div>

            {blocos.length === 0 ? (
              <p className="mt-6 border-t border-branco/15 pt-6 text-sm text-fumo">
                Nenhum serviço escolhido ainda. Toque em um ao lado e ele entra
                aqui na hora.
              </p>
            ) : (
              <ol className="mt-6 border-t border-branco/15 pt-6">
                {blocos.map((b) => (
                  <li
                    key={b.servico.id}
                    className="relative border-l border-dourado/40 pb-3 pl-4"
                    style={{ minHeight: `${altura(b.servico.minutos)}px` }}
                  >
                    <span className="absolute top-1 -left-[4.5px] h-2 w-2 rounded-full bg-dourado" />
                    <div className="min-w-0">
                      <p className="tabular text-xs text-dourado">
                        {hhmm(b.inicio)}–{hhmm(b.fim)}
                      </p>
                      <p className="truncate font-medium">{b.servico.nome}</p>
                      <button
                        type="button"
                        onClick={() => alternar(b.servico.id)}
                        className="mt-1 text-xs text-fumo underline underline-offset-2 hover:text-branco"
                      >
                        tirar
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            )}

            {blocos.length > 0 && (
              <div className="mt-2 border-t border-branco/15 pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-fumo">Total</span>
                  <span className="tabular font-display text-2xl">{duracao(total)}</span>
                </div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-sm text-fumo">Saída prevista</span>
                  <span className="tabular text-dourado">{hhmm(saida)}</span>
                </div>

                {passaDoFechamento && (
                  <p className="mt-4 rounded-lg border border-dourado/50 bg-dourado/10 p-3 text-sm text-branco">
                    Assim a visita passa das 19h, que é quando fechamos. Escolha
                    um horário de chegada mais cedo ou divida em dois dias — dá
                    pra combinar isso na mensagem.
                  </p>
                )}

                <button type="button" onClick={pedir} className="btn-dourado mt-5 w-full">
                  Pedir esse horário
                </button>
                <p className="mt-3 text-center text-xs text-fumo">
                  Confirmação de horário é feita por WhatsApp.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
