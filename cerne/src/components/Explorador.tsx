import { useState } from 'react'
import { casos } from '../data/casos'
import DetalheSala from './DetalheSala'
import Planta from './Planta'
import Seletor from './Seletor'

// Uma fotografia de referencia por caso (Pexels, uso livre), escolhida pelo tipo de
// ambiente que o proprio caso descreve em data/casos.ts. Sao imagens
// ilustrativas: a Cerne e um escritorio ficticio e nenhum caso e uma obra real.
const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1000`
const FOTOS: Record<string, { src: string; alt: string }> = {
  'vila-madalena': { src: px(6758771), alt: 'Sala e cozinha integradas, com marcenaria de madeira, mesa de jantar longa e piso claro' },
  'barra-funda': { src: px(7546605), alt: 'Terraco de cobertura com deck de madeira, poltronas de lounge e vista aberta' },
  itaim: { src: px(7060814), alt: 'Studio compacto com sala e quarto separados por estante vazada, sofa e tv' },
  ubatuba: { src: px(28843334), alt: 'Casa clara com pe-direito duplo, marcenaria em madeira, bancada de pedra e escada' },
}

// Uma coluna só, sem scroll controlando nada: a planta é grande e central,
// o detalhe do cômodo aparece embaixo dela quando você clica. Trocar de
// caso reseta o cômodo selecionado pro primeiro da nova planta.
export default function Explorador() {
  const [casoIndex, setCasoIndex] = useState(0)
  const [salaId, setSalaId] = useState(casos[0].salas[0].id)

  const caso = casos[casoIndex]
  const sala = caso.salas.find((s) => s.id === salaId) ?? caso.salas[0]

  const selecionarCaso = (i: number) => {
    setCasoIndex(i)
    setSalaId(casos[i].salas[0].id)
  }

  return (
    <main className="mx-auto max-w-3xl px-6 pt-28 pb-24 sm:px-10 lg:pt-32">
      <p className="max-w-md text-lg text-ink/75">
        Clique num cômodo da planta pra ver o material e a decisão de projeto
        por trás dele.
      </p>

      <div className="mt-8">
        <Seletor casos={casos} ativo={casoIndex} onSelect={selecionarCaso} />
      </div>

      <figure className="mt-8">
        <img
          key={caso.id}
          src={FOTOS[caso.id].src}
          alt={FOTOS[caso.id].alt}
          loading="lazy"
          className="sala-entrar aspect-[16/10] w-full rounded-2xl border border-line object-cover"
        />
        <figcaption className="mt-2 text-sm text-ink/60">
          Foto de referência do ambiente: {caso.ambiente.toLowerCase()} · {caso.area}. Imagem ilustrativa.
        </figcaption>
      </figure>

      <div className="mt-8 rounded-2xl border border-line bg-panel p-6 sm:p-10">
        <Planta salas={caso.salas} ativa={salaId} onSelect={setSalaId} />
      </div>

      <div className="mt-8">
        <DetalheSala caso={caso} sala={sala} />
      </div>
    </main>
  )
}
