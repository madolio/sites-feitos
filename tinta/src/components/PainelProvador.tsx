import { useState } from 'react'
import { flashes, zonas } from '../data/flashes'
import { sendToWhatsApp } from '../demo'
import Corpo from './Corpo'
import Flash from './Flash'

// Painel central do site: em vez de uma grade de flash que só abre o
// WhatsApp, mostra onde o desenho fica — escolhe a zona no corpo de
// referência, escolhe o desenho na lista, e ele é "carimbado" ali na hora
// (Flash.tsx com `animado`, o traço se desenhando sozinho). Escolher os dois
// é o que libera o botão de marcar, já com a combinação certa na mensagem.
export default function PainelProvador() {
  const [zonaId, setZonaId] = useState<string | null>(null)
  const [flashId, setFlashId] = useState<string | null>(null)
  const [carimbo, setCarimbo] = useState(0)

  const zona = zonas.find((z) => z.id === zonaId) ?? null
  const flash = flashes.find((f) => f.id === flashId) ?? null

  const escolherZona = (id: string) => {
    setZonaId(id)
    if (flashId) setCarimbo((c) => c + 1)
  }

  const escolherFlash = (id: string) => {
    setFlashId(id)
    setCarimbo((c) => c + 1)
  }

  return (
    <section className="panel h-svh w-screen shrink-0 overflow-y-auto px-6 py-20 sm:px-10 sm:py-24">
      <h2 className="font-display text-3xl tracking-widest text-paper uppercase sm:text-4xl">Prova antes de marcar</h2>
      <p className="mt-2 max-w-md text-paper/65">Escolhe onde no corpo, depois qual desenho — ele aparece carimbado ali, na hora.</p>

      <div className="mt-8 grid gap-8 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-start sm:gap-10 lg:grid-cols-[16rem_1fr]">
        {/* aspect-[220/480] = a proporcao EXATA do viewBox do Corpo. O carimbo e
            posicionado por porcentagem deste contêiner; com altura/largura
            fixas de outra proporcao o SVG encolhia pra caber e ficava centrado
            com folga lateral, e a porcentagem errava a zona em ate 13px. */}
        <div className="relative mx-auto aspect-[220/480] w-full max-w-[10rem] text-paper sm:max-w-[11.5rem]">
          <Corpo zonaAtiva={zonaId} onEscolherZona={escolherZona} />
          {zona && flash && (
            <div
              key={carimbo}
              className="pointer-events-none absolute text-ember"
              style={{
                left: `${(zona.x / 220) * 100}%`,
                top: `${(zona.y / 480) * 100}%`,
                width: `${(zona.diametro / 220) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Flash tipo={flash.tipo} animado className="h-full w-full" />
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-paper/50">{zona ? `Zona escolhida: ${zona.nome.toLowerCase()}.` : 'Toca numa zona do corpo aqui do lado.'}</p>

          <ul className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
            {flashes.map((f) => {
              const selecionado = f.id === flashId
              return (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => escolherFlash(f.id)}
                    aria-pressed={selecionado}
                    className={`group flex w-full flex-col items-center gap-2 border p-3 text-center transition-colors ${
                      selecionado ? 'border-ember' : 'border-line hover:border-paper/40'
                    }`}
                  >
                    <Flash tipo={f.tipo} className={`h-10 w-10 transition-colors ${selecionado ? 'text-ember' : 'text-paper group-hover:text-ember'}`} />
                    <span className="text-xs font-medium text-paper">{f.nome}</span>
                    <span className="text-[0.7rem] text-paper/55">{f.preco}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-6 border-t border-line pt-5">
            {zona && flash ? (
              <button
                type="button"
                onClick={() => sendToWhatsApp(`Olá, Tinta! Quero marcar a flash "${flash.nome}" (${flash.preco}) no(a) ${zona.nome.toLowerCase()}.`)}
                className="btn-primary"
              >
                Marcar esse
              </button>
            ) : (
              <p className="text-sm text-paper/45">
                {zona ? '2. Agora escolhe um desenho ali em cima.' : 'Escolhe a zona e o desenho pra liberar o agendamento.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
