import type { Servico } from '../dados'
import OficioGlyph from './OficioGlyph'

// Ficha técnica em linhas, não grid de cartões: cada serviço é uma linha com
// o seu símbolo à esquerda e o texto à direita. Nenhuma linha tem número,
// preço ou selo — porque nenhum desses dados existe confirmado.
const caixa = {
  agua: 'border-agua/25 bg-agua-clara text-agua',
  eletrica: 'border-eletrica/25 bg-eletrica-clara text-eletrica',
}

export default function FichaServicos({
  itens,
  cor,
}: {
  itens: Servico[]
  cor: 'agua' | 'eletrica'
}) {
  return (
    <ul className="border-t border-grafite/15">
      {itens.map((item) => (
        <li
          key={item.titulo}
          className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-5 border-b border-grafite/15 py-6 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-8 sm:py-7"
        >
          <span
            className={`flex aspect-square items-center justify-center rounded-sm border ${caixa[cor]}`}
          >
            <OficioGlyph glifo={item.glifo} className="h-10 w-10 sm:h-12 sm:w-12" />
          </span>

          <span>
            <h3 className="text-lg leading-tight text-grafite sm:text-xl">{item.titulo}</h3>
            {item.detalhe && (
              <p className="mt-1.5 text-[0.9375rem] text-fumo">{item.detalhe}</p>
            )}
          </span>
        </li>
      ))}
    </ul>
  )
}
