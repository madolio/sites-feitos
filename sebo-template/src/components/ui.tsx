import { acervo } from '../data/conteudo'

/** Carimbo de preço (o mesmo da ficha do hero e do acervo). */
export function Preco({ valor, className = '' }: { valor: number; className?: string }) {
  return (
    <span className={`carimbo-preco flex shrink-0 items-center justify-center text-accent ${className}`}>
      <span className="text-center leading-tight font-semibold">
        {acervo.moeda}
        <br />
        {valor}
      </span>
    </span>
  )
}
