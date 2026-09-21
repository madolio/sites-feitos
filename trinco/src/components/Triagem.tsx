import { useState } from 'react'
import Reveal from './Reveal'
import { situacoes } from '../data/triagem'
import { categoriaInfo } from '../data/servicos'

const corCategoria: Record<string, string> = {
  emergencia: 'bg-emergencia text-limalha',
  agendado: 'bg-seguro text-limalha',
  'sob-medida': 'bg-latao text-limalha',
}

export default function Triagem() {
  const [ativa, setAtiva] = useState(situacoes[0].id)
  const situacao = situacoes.find((s) => s.id === ativa) ?? situacoes[0]

  return (
    <section id="triagem" className="border-b border-linha bg-limalha-forte py-20">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <p className="dado-placa text-latao">qual serviço eu preciso</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">A mesma triagem que fazemos por telefone</h2>
          <p className="mt-4 text-grafite/75">
            Antes de despachar alguém, todo chaveiro de verdade separa o pedido em três
            categorias: emergência, agendado ou sob medida. Escolha a situação mais parecida com
            a sua e veja como a gente classifica.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div role="tablist" aria-label="Situações" className="mt-8 flex flex-wrap gap-2">
            {situacoes.map((s) => {
              const selecionada = s.id === ativa
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={selecionada}
                  onClick={() => setAtiva(s.id)}
                  className={`rounded-full border px-4 py-2 text-left text-sm transition-colors ${
                    selecionada
                      ? 'border-latao bg-latao text-limalha'
                      : 'border-linha bg-limalha text-grafite hover:border-latao'
                  }`}
                >
                  {s.pergunta}
                </button>
              )
            })}
          </div>

          <div className="mt-6 rounded-xl border border-linha bg-limalha p-6">
            <span className={`dado-placa inline-block rounded-full px-3 py-1 ${corCategoria[situacao.categoria]}`}>
              {categoriaInfo[situacao.categoria].rotulo}
            </span>
            <p className="mt-3 text-sm font-semibold text-grafite/70">
              {categoriaInfo[situacao.categoria].tempo}
            </p>
            <p className="mt-3 text-grafite/85">{situacao.explicacao}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
