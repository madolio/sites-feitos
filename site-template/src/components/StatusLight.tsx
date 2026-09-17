// LED de status — o mesmo tipo de indicador circular de um painel GO/NO-GO
// de controle de missão. `armed` acende em verde (GO); antes de armar fica
// cinza. Substitui o `GateArrow.tsx` (seta de sinalização de embarque).
export default function StatusLight({
  armed = true,
  className = 'h-2.5 w-2.5',
}: {
  armed?: boolean
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 rounded-full transition-colors duration-500 ${
        armed ? 'bg-go' : 'bg-paper/25'
      } ${className}`}
    />
  )
}
