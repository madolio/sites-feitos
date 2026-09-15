import { sendToWhatsApp } from '../demo'
import EncaixeInterativo from './EncaixeInterativo'

type Props = {
  selecionado: string
  onSelecionar: (id: string) => void
}

// Reformulação completa (não só a ilustração): o site inteiro passou a
// se organizar pelo tipo de encaixe, não pelo móvel. Escolher um tipo aqui
// também filtra o catálogo abaixo — ver App.tsx.
export default function Hero({ selecionado, onSelecionar }: Props) {
  return (
    <section className="border-b border-line px-6 pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto grid max-w-5xl items-start gap-12 md:grid-cols-[1fr_1fr] md:gap-10">
        <div>
          <h1 className="font-heading text-[2.75rem] leading-[1.05] font-medium text-ink sm:text-6xl">
            Móvel que se sustenta pelo encaixe, não pelo parafuso
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink/75">
            Marcenaria sob medida em Itu (SP). Escolha um tipo de encaixe ao
            lado e arraste pra montar — o catálogo abaixo mostra as peças
            que usam ele.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => sendToWhatsApp('Olá! Quero conversar sobre uma peça sob medida com a Encaixe.')}
              className="btn-primary"
            >
              Pedir um orçamento
            </button>
            <a href="#catalogo" className="btn-outline">
              Ver o catálogo
            </a>
          </div>
        </div>

        <EncaixeInterativo selecionado={selecionado} onSelecionar={onSelecionar} />
      </div>
    </section>
  )
}
