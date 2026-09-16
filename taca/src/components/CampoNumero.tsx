// Substitui as setinhas nativas de <input type="number"> por um stepper no
// tema do site — o número continua editável por teclado.
export function CampoNumero({
  label,
  value,
  onChange,
  min = 1,
  max = 30,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  min?: number
  max?: number
}) {
  const num = Number(value) || 0

  function ajustar(delta: number) {
    const v = Math.min(max, Math.max(min, num + delta))
    onChange(String(v))
  }

  return (
    <label className="block max-w-xs">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <div className="mt-2 flex items-stretch rounded-lg border border-line bg-white/50 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-garnet">
        <button
          type="button"
          aria-label={`Diminuir ${label}`}
          onClick={() => ajustar(-1)}
          className="w-10 shrink-0 rounded-l-lg border-r border-line text-lg text-ink transition hover:bg-ink/5"
        >
          −
        </button>
        <input
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="campo-numero w-full min-w-0 flex-1 bg-transparent px-3 py-3 text-center text-ink outline-none"
        />
        <button
          type="button"
          aria-label={`Aumentar ${label}`}
          onClick={() => ajustar(1)}
          className="w-10 shrink-0 rounded-r-lg border-l border-line text-lg text-ink transition hover:bg-ink/5"
        >
          +
        </button>
      </div>
    </label>
  )
}
