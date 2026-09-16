// Substitui as setinhas nativas de <input type="number"> (inconsistentes
// entre navegadores e feias no tema preto/lima) por um stepper desenhado
// no tema do site — o número continua editável por teclado.
export function CampoNumero({
  label,
  value,
  onChange,
  placeholder,
  min = 0,
  max = 999,
  step = 1,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  min?: number
  max?: number
  step?: number
}) {
  const num = Number(value) || 0

  function ajustar(delta: number) {
    const v = Math.min(max, Math.max(min, num + delta))
    onChange(String(v))
  }

  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <div className="mt-1.5 flex items-stretch border-2 border-preto/20 focus-within:border-preto">
        <button
          type="button"
          aria-label={`Diminuir ${label}`}
          onClick={() => ajustar(-step)}
          className="w-10 shrink-0 border-r-2 border-preto/20 text-lg transition hover:bg-cinza/40"
        >
          −
        </button>
        <input
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="campo-numero w-full min-w-0 flex-1 px-3 py-2.5 text-center text-lg outline-none"
        />
        <button
          type="button"
          aria-label={`Aumentar ${label}`}
          onClick={() => ajustar(step)}
          className="w-10 shrink-0 border-l-2 border-preto/20 text-lg transition hover:bg-cinza/40"
        >
          +
        </button>
      </div>
    </label>
  )
}
