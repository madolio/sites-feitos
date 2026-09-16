export function CampoNumero({
  label,
  value,
  onChange,
  min = 0,
  max = 9999999,
  step = 1,
  prefixo,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  prefixo?: string
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v))

  return (
    <label className="flex flex-col gap-2 text-sm text-fumo">
      {label}
      <div className="flex items-stretch rounded-md border border-fio bg-preto focus-within:border-acento">
        <button
          type="button"
          aria-label={`Diminuir ${label}`}
          onClick={() => onChange(clamp(value - step))}
          className="w-11 shrink-0 border-r border-fio text-lg text-marfim transition hover:bg-fio/40"
        >
          −
        </button>
        <div className="flex flex-1 items-center justify-center gap-1">
          {prefixo && <span className="text-marfim/60">{prefixo}</span>}
          <input
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(clamp(Number(e.target.value) || min))}
            className="campo-numero w-full min-w-0 bg-transparent px-1 py-3 text-center text-marfim outline-none"
          />
        </div>
        <button
          type="button"
          aria-label={`Aumentar ${label}`}
          onClick={() => onChange(clamp(value + step))}
          className="w-11 shrink-0 border-l border-fio text-lg text-marfim transition hover:bg-fio/40"
        >
          +
        </button>
      </div>
    </label>
  )
}
